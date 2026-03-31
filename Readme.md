# TechNest — Full-Stack E-Commerce Platform

A modern, production-grade e-commerce application built from scratch as a portfolio project. TechNest features a full shopping experience for customers and a separate admin dashboard for store management.

---

## Description

TechNest is a full-stack e-commerce platform for tech accessories. It includes a customer-facing storefront built with Next.js and a dedicated React admin dashboard. The backend is powered by Node.js and Express with MongoDB as the database.

The project demonstrates real-world patterns including HttpOnly cookie authentication, Stripe payment integration with webhooks, optimistic UI updates with React Query, role-based access control, and a fully featured admin analytics dashboard.

---

## Tech Stack

### Frontend (Store)

- **Next.js 15** — App Router, SSR/CSR hybrid
- **React Query** — Data fetching, caching, and mutations
- **Tailwind CSS** — Utility-first styling
- **Lucide React** — Icon library
- **Stripe.js** — Hosted checkout integration
- **React Hot Toast** — Toast notifications

### Frontend (Admin Dashboard)

- **React 19 + Vite** — SPA admin dashboard
- **React Router v7** — Client-side routing
- **React Query** — Data fetching and cache management
- **Recharts** — Analytics charts
- **Tailwind CSS v3** — Styling

### Backend

- **Node.js + Express** — REST API
- **MongoDB + Mongoose** — Database and ODM
- **JWT** — Access token authentication
- **HttpOnly Cookies** — Secure session management
- **Stripe** — Payment processing and webhooks
- **bcryptjs** — Password hashing
- **Helmet, CORS, Rate Limiting** — Security middleware

---

## Features

### Customer Store

- Browse products by category with search and filtering
- Product detail pages with specs, description, and reviews
- Shopping cart with real-time updates and optimistic UI
- Bundle deals with grouped pricing
- Stripe hosted checkout with webhook order creation
- Order history and order detail tracking
- User account management (name, password)
- Flash deals page with countdown timers
- Fully responsive design

### Admin Dashboard

- Overview page with revenue, orders, and sales charts
- Orders management with status updates
- Products management — create, edit, delete
- Users management with role control
- Analytics page with daily sales, top products, order status breakdown, and revenue growth
- Collapsible sidebar with icon-only mode
- Time range filtering (7 days, 30 days, all time)

### Authentication

- JWT access tokens stored in HttpOnly cookies
- Role-based access control (user / admin)
- Admin login redirects to dashboard automatically
- Secure logout with cookie clearing

---

## Demo Accounts

You can use the following credentials to explore the application:

### Admin Account

```
Email:    admin@test.com
Password: admin1234
```

> Logs into the store, then automatically redirects to the admin dashboard at `localhost:5173`

### User Account

```
Email:    eyas@test.com
Password: test1234
```

> Standard customer account with access to shopping, cart, and orders

---

## Project Structure

```
technest/
├── apps/
│   ├── store/                  # Next.js customer storefront
│   │   ├── app/                # App Router pages
│   │   ├── components/         # UI components
│   │   ├── context/            # AuthContext
│   │   └── lib/                # API clients, hooks, utilities
│   │
│   └── admin/                  # React + Vite admin dashboard
│       └── src/
│           ├── api/            # Axios instance
│           ├── components/     # Layout and UI components
│           ├── context/        # Auth and Sidebar context
│           ├── hooks/          # React Query hooks
│           └── pages/          # Dashboard pages
│
└── Backend/
    └── src/
        ├── controllers/        # Route handlers
        ├── models/             # Mongoose schemas
        ├── routes/             # Express routers
        ├── services/           # Business logic
        ├── middlewares/        # Auth, error handling
        └── utils/              # Helpers and utilities
```

---

## Installation

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account (for payments)

### 1. Clone the repository

```bash
git clone https://github.com/Eyasdm/e-commerce.git
cd e-commerce
```

### 2. Install Backend dependencies

```bash
cd Backend
npm install
```

### 3. Install Store (Next.js) dependencies

```bash
cd apps/store
npm install
```

### 4. Install Admin Dashboard dependencies

```bash
cd apps/admin
npm install
```

---

## Environment Variables

### Backend — `Backend/.env`

```env
PORT=8000
NODE_ENV=development

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

BASE_URL=http://localhost:8000
CLIENT_URL=http://localhost:3000
```

### Store — `apps/store/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## Usage

### Start the Backend

```bash
cd Backend
npm run dev
```

> Runs on `http://localhost:8000`

### Start the Store

```bash
cd apps/store
npm run dev
```

> Runs on `http://localhost:3000`

### Start the Admin Dashboard

```bash
cd apps/admin
npm run dev
```

> Runs on `http://localhost:5173`

### Stripe Webhook (local testing)

```bash
stripe listen --forward-to localhost:8000/api/v1/orders/webhook
```

> Copy the webhook secret output and add it to `STRIPE_WEBHOOK_SECRET` in your `.env`

### Seed the Database

```bash
cd Backend
node src/utils/seed.js
```

---

## Scripts

| Location | Command         | Description                |
| -------- | --------------- | -------------------------- |
| Backend  | `npm run dev`   | Start backend with nodemon |
| Store    | `npm run dev`   | Start Next.js dev server   |
| Store    | `npm run build` | Build for production       |
| Admin    | `npm run dev`   | Start Vite dev server      |
| Admin    | `npm run build` | Build for production       |

---

## Future Improvements

- [ ] Email notifications for order confirmation and shipping updates
- [ ] Product image upload via Cloudinary or S3
- [ ] Wishlist functionality
- [ ] Product reviews with verified purchase enforcement
- [ ] Discount codes and promo system
- [ ] Mobile admin dashboard responsive layout
- [ ] Multi-currency support
- [ ] Deployment configuration (Vercel + Railway + Nginx)
- [ ] Unit and integration tests (Jest + Supertest)
- [ ] Real-time order status updates via WebSockets

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Eyas Mohammed**

- GitHub: [@Eyasdm](https://github.com/Eyasdm)
- LinkedIn: [eyas-adam](https://www.linkedin.com/in/eyas-adam/)
- Email: Eyasadam01@outlook.com

---

> TechNest is a portfolio project built to demonstrate full-stack development skills. No real transactions occur.
