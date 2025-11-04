# ShopX E-Commerce (React + Tailwind + Node.js + MongoDB + Razorpay)

A clean, responsive e-commerce starter with a React + Tailwind frontend and a Node.js + Express backend using MongoDB. Payments are powered by Razorpay.

## Structure

- `backend/`: Express API, MongoDB models, Razorpay server integration
- `frontend/`: React app (Vite) with Tailwind CSS, cart, checkout, Razorpay client

## Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- Razorpay account (API Key ID and Secret)

## Setup

### 1) Backend

1. Copy env and fill values:
   ```bash
   cp backend/env.example backend/.env
   ```
2. Install and run:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. API runs on `http://localhost:5000` by default.

### 2) Frontend

1. Copy env and fill values:
   ```bash
   cp frontend/env.example frontend/.env
   ```
2. Install and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. App runs on `http://localhost:5173` by default.

## Environment Variables

Backend (`backend/.env`):
- `PORT=5000`
- `MONGODB_URI=mongodb://localhost:27017/ecommerce`
- `RAZORPAY_KEY_ID=...`
- `RAZORPAY_KEY_SECRET=...`
- `CLIENT_URL=http://localhost:5173`
- `WEBHOOK_SECRET=some_random_string` (optional if you add webhooks)

Frontend (`frontend/.env`):
- `VITE_API_BASE_URL=http://localhost:5000`
- `VITE_RAZORPAY_KEY_ID=...`

## Seeding Products

For a quick start, insert some products in MongoDB `products` collection with fields:
- `title` (string)
- `description` (string)
- `price` (number)
- `imageUrl` (string)
- `category` (string, optional)
- `stock` (number, optional)
- `isActive` (boolean, default true)

## Flows

- Browse `Home`: loads products from `/api/products`.
- View `Product`: product details route `/api/products/:id`.
- Cart: add/update/remove client-side.
- Checkout:
  - Frontend calls `/api/orders/create` with cart items.
  - Opens Razorpay Checkout using returned order id and `VITE_RAZORPAY_KEY_ID`.
  - On success, frontend calls `/api/orders/verify` to confirm signature and mark as paid.

## Notes

- CORS is enabled for `CLIENT_URL`.
- Ensure your Razorpay test keys are used in development.
- This is a minimal starter; add auth, admin panel, inventory management, and webhooks as needed.

## Scripts

- Backend: `npm run dev` (nodemon), `npm start`
- Frontend: `npm run dev`, `npm run build`, `npm run preview`


