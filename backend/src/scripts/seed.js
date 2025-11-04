const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') })
const mongoose = require('mongoose')
const Product = require('../models/Product')

async function run() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error('MONGODB_URI not set in .env')
    process.exit(1)
  }
  await mongoose.connect(uri)
  const products = [
    // 15 Men's
    { title: 'Men\'s Classic T‑Shirt', description: '100% cotton, regular fit', price: 599, imageUrl: 'https://images.pexels.com/photos/27919184/pexels-photo-27919184.jpeg', category: 'men', gender: 'men', stock: 120, isActive: true },
    { title: 'Checked Casual Shirt', description: 'Soft flannel, button-down collar', price: 999, imageUrl: 'https://images.pexels.com/photos/27869636/pexels-photo-27869636.jpeg', category: 'men', gender: 'men', stock: 110, isActive: true },
    { title: 'Slim Fit Jeans', description: 'Stretch denim, tapered leg', price: 1599, imageUrl: 'https://images.pexels.com/photos/1143503/pexels-photo-1143503.jpeg', category: 'men', gender: 'men', stock: 95, isActive: true },
    { title: 'Denim Jacket', description: 'Classic blue wash, rugged style', price: 2299, imageUrl: 'https://images.pexels.com/photos/1785779/pexels-photo-1785779.jpeg', category: 'men', gender: 'men', stock: 60, isActive: true },
    { title: 'Oversized Hoodie', description: 'Fleece lined, cozy and warm', price: 1399, imageUrl: 'https://images.pexels.com/photos/4065842/pexels-photo-4065842.jpeg', category: 'men', gender: 'men', stock: 90, isActive: true },
    { title: 'Polo T‑Shirt', description: 'Breathable pique knit polo', price: 899, imageUrl: 'https://images.pexels.com/photos/34149706/pexels-photo-34149706.jpeg', category: 'men', gender: 'men', stock: 140, isActive: true },
    { title: 'Formal Shirt', description: 'Slim fit, wrinkle resistant', price: 1299, imageUrl: 'https://images.pexels.com/photos/4963353/pexels-photo-4963353.jpeg', category: 'men', gender: 'men', stock: 85, isActive: true },
    { title: 'Chino Pants', description: 'Stretch cotton chinos', price: 1499, imageUrl: 'https://images.pexels.com/photos/29891441/pexels-photo-29891441.jpeg', category: 'men', gender: 'men', stock: 100, isActive: true },
    { title: 'Athletic Joggers', description: 'Moisture wicking fabric', price: 1199, imageUrl: 'https://images.pexels.com/photos/7870234/pexels-photo-7870234.jpeg', category: 'men', gender: 'men', stock: 130, isActive: true },
    { title: 'Tailored Blazer', description: 'Single-breasted, premium blend', price: 2999, imageUrl: 'https://images.pexels.com/photos/9197316/pexels-photo-9197316.jpeg', category: 'men', gender: 'men', stock: 40, isActive: true },
    { title: 'Linen Shirt', description: 'Breathable, summer essential', price: 1199, imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', category: 'men', gender: 'men', stock: 75, isActive: true },
    { title: 'Casual Shorts', description: 'Twill fabric, above-knee', price: 799, imageUrl: 'https://images.pexels.com/photos/18394309/pexels-photo-18394309.jpeg', category: 'men', gender: 'men', stock: 90, isActive: true },
    { title: 'Track Jacket', description: 'Lightweight, zip-through', price: 1699, imageUrl: 'https://images.pexels.com/photos/24431267/pexels-photo-24431267.jpeg', category: 'men', gender: 'men', stock: 65, isActive: true },
    { title: 'Sweatshirt', description: 'Brushed fleece interior', price: 999, imageUrl: 'https://images.pexels.com/photos/4549744/pexels-photo-4549744.jpeg', category: 'men', gender: 'men', stock: 110, isActive: true },
    { title: 'Kurta Set', description: 'Cotton kurta with pajama', price: 1899, imageUrl: 'https://images.pexels.com/photos/18059052/pexels-photo-18059052.jpeg', category: 'men', gender: 'men', stock: 55, isActive: true },

    // 15 Women’s
    { title: 'Women\'s Summer Dress', description: 'Floral print, knee length', price: 1799, imageUrl: 'https://images.pexels.com/photos/34570451/pexels-photo-34570451.jpeg', category: 'women', gender: 'women', stock: 70, isActive: true },
    { title: 'Saree with Blouse', description: 'Georgette saree, elegant drape', price: 2499, imageUrl: 'https://images.pexels.com/photos/27954170/pexels-photo-27954170.jpeg', category: 'women', gender: 'women', stock: 55, isActive: true },
    { title: 'Women\'s Denim Jacket', description: 'Cropped fit, classic blue', price: 2199, imageUrl: 'https://images.pexels.com/photos/20448087/pexels-photo-20448087.jpeg', category: 'women', gender: 'women', stock: 60, isActive: true },
    { title: 'Anarkali Kurti', description: 'Flowy fit, printed design', price: 1499, imageUrl: 'https://images.pexels.com/photos/28512776/pexels-photo-28512776.jpeg', category: 'women', gender: 'women', stock: 80, isActive: true },
    { title: 'Women\'s Top', description: 'V-neck, lightweight fabric', price: 799, imageUrl: 'https://images.pexels.com/photos/8532607/pexels-photo-8532607.jpeg', category: 'women', gender: 'women', stock: 120, isActive: true },
    { title: 'Women\'s Jeans', description: 'High-rise skinny fit', price: 1599, imageUrl: 'https://images.pexels.com/photos/14768508/pexels-photo-14768508.jpeg', category: 'women', gender: 'women', stock: 95, isActive: true },
    { title: 'Women\'s Hoodie', description: 'Cozy fleece, relaxed fit', price: 1299, imageUrl: 'https://images.pexels.com/photos/5386243/pexels-photo-5386243.jpeg', category: 'women', gender: 'women', stock: 100, isActive: true },
    { title: 'Women\'s Jacket', description: 'Utility style, olive', price: 1999, imageUrl: 'https://images.pexels.com/photos/34531901/pexels-photo-34531901.jpeg', category: 'women', gender: 'women', stock: 60, isActive: true },
    { title: 'A-Line Skirt', description: 'Midi length, soft drape', price: 999, imageUrl: 'https://images.pexels.com/photos/12312395/pexels-photo-12312395.jpeg', category: 'women', gender: 'women', stock: 110, isActive: true },
    { title: 'Women\'s Kurti Set', description: 'Kurti with leggings', price: 1399, imageUrl: 'https://www.pexels.com/photo/heritage-in-print-tavsi-s-stunning-ajrakh-kurtas-28213774/', category: 'women', gender: 'women', stock: 85, isActive: true },
    { title: 'Maxi Dress', description: 'Boho print, ankle length', price: 1899, imageUrl: 'https://images.pexels.com/photos/5390350/pexels-photo-5390350.jpeg', category: 'women', gender: 'women', stock: 75, isActive: true },
    { title: 'Women\'s Formal Blazer', description: 'Tailored fit, office wear', price: 2799, imageUrl: 'https://images.pexels.com/photos/25987927/pexels-photo-25987927.jpeg', category: 'women', gender: 'women', stock: 45, isActive: true },
    { title: 'Women\'s Shirt', description: 'Crisp cotton, regular fit', price: 1099, imageUrl: 'https://images.pexels.com/photos/10041233/pexels-photo-10041233.jpeg', category: 'women', gender: 'women', stock: 100, isActive: true },
    { title: 'Women\'s Shorts', description: 'High-waist, summer essential', price: 899, imageUrl: 'https://images.pexels.com/photos/9052975/pexels-photo-9052975.jpeg', category: 'women', gender: 'women', stock: 90, isActive: true },
    { title: 'Women\'s Sweater', description: 'Rib knit, warm feel', price: 1299, imageUrl: 'https://images.pexels.com/photos/6968507/pexels-photo-6968507.jpeg', category: 'women', gender: 'women', stock: 70, isActive: true }
  ]
  await Product.deleteMany({})
  const created = await Product.insertMany(products)
  console.log(`Inserted ${created.length} products`)
  await mongoose.disconnect()
}

run().catch(async (err) => {
  console.error(err)
  try { await mongoose.disconnect() } catch {}
  process.exit(1)
})


