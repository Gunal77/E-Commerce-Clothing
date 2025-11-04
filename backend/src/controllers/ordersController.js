const { getRazorpayInstance, verifySignature } = require('../utils/razorpay');
const Order = require('../models/Order');

async function createOrder(req, res) {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'No items provided' });
  }

  const amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const rp = getRazorpayInstance();
  const receipt = `rcpt_${Date.now()}`;

  const order = await rp.orders.create({
    amount: Math.round(amount * 100),
    currency: 'INR',
    receipt
  });

  const saved = await Order.create({
    items,
    amount,
    currency: 'INR',
    status: 'created',
    razorpayOrderId: order.id,
    receipt
  });

  res.json({ orderId: order.id, amount: order.amount, currency: order.currency, receipt, id: saved._id });
}

async function verifyPayment(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
    return res.status(400).json({ message: 'Invalid payload' });
  }
  const isValid = verifySignature({ orderId: razorpay_order_id, paymentId: razorpay_payment_id, signature: razorpay_signature });
  const order = await Order.findById(orderId);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (isValid) {
    order.status = 'paid';
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    await order.save();
    return res.json({ success: true });
  } else {
    order.status = 'failed';
    await order.save();
    return res.status(400).json({ success: false, message: 'Signature mismatch' });
  }
}

module.exports = { createOrder, verifyPayment };


