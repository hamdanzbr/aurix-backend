# Aurix Backend

Backend API for the Aurix Fitness Ring Ecommerce Platform.

## Overview

Aurix is a premium fitness ring ecommerce platform that allows users to browse products, manage wishlists, add products to cart, place orders, and track purchases.

This backend is built using a scalable layered architecture with TypeScript, Express, MongoDB, and JWT Authentication.

---

## Tech Stack

* Node.js
* Express.js
* TypeScript
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Zod Validation
* bcryptjs

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### Products

* Create Product
* Get Products
* Product Filtering
* Product Sorting
* Product Details by Slug

### Wishlist

* Add to Wishlist
* Remove from Wishlist
* Get Wishlist

### Cart

* Add to Cart
* Update Quantity
* Remove Item
* Get Cart
* Cart Totals Calculation

### Orders

* Place Order
* Get My Orders
* Get Order Details
* Cancel Order
* Order Statistics
* Order Filtering
* Order Sorting

---

## Project Structure

```txt
src/
├── config/
├── controllers/
├── services/
├── repositories/
├── models/
├── routes/
├── middleware/
├── validations/
├── utils/
├── constants/
├── types/
├── interfaces/
├── helpers/
├── app.ts
└── server.ts
```

---

## Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_jwt_secret

JWT_ACCESS_EXPIRES_IN=7d
```

---

## Installation

```bash
git clone <repository-url>

cd aurix-backend

npm install
```

---

## Run Development Server

```bash
npm run dev
```

Server runs on:

```txt
http://localhost:5000
```

---

## API Base URL

```txt
http://localhost:5000/api/v1
```

---

## Future Enhancements

* Admin Dashboard
* Product Reviews
* Razorpay Integration
* Stripe Integration
* Refresh Token Authentication
* PostgreSQL Version

---

## Author

Hamdan Zbr
