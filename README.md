# Simple E-commerce API

## Features

- User registration/login (JWT auth)
- Roles: `customer` and `admin`
- Product listing (pagination and search)
- Cart management (add, update, remove)
- Create orders from cart
- Admin: manage products (add, update, delete)
- Extra: Pagination & search for products

## Getting Started

### Prerequisites

- Node.js
- MongoDB (local or cloud)

### Setup

```sh
npm install
```

Add a `.env` file with:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1/ecommerce-api
JWT_SECRET=supersecretkey
```

### Run

```sh
npm run dev
```

## API Endpoints

- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login

### Products
- `GET /api/products` — List products
- `GET /api/products/:id` — Single product
- `POST /api/products` — Add product (admin)
- `PUT /api/products/:id` — Update product (admin)
- `DELETE /api/products/:id` — Delete product (admin)

### Cart (customer only)
- `GET /api/cart` — View cart
- `POST /api/cart` — Add to cart
- `PUT /api/cart/:itemId` — Update cart item
- `DELETE /api/cart/:itemId` — Remove from cart

### Orders
- `POST /api/orders` — Create order from cart
- `GET /api/orders` — See orders (customer: own, admin: all)

## Pagination & Search

- `GET /api/products?page=1&limit=10&search=shoes&category=clothing`

## Example Usage

1. Register as a user (role: customer or admin)
2. Login to get JWT token
3. Use token in `Authorization: Bearer <token>` header

---

## Optional: Basic Frontend

For demo, use Postman or similar tool to interact with the API.
