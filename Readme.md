# TechNest

> A full-stack e-commerce platform for tech accessories — built from scratch, deployed, and live.

**[Live Demo](https://e-commerce-eyasdms-projects.vercel.app)** · **[GitHub](https://github.com/Eyasdm/e-commerce)**

---

## Overview

TechNest is a production-grade e-commerce system built independently as a first full-stack project. It includes a customer storefront, a complete admin dashboard, Stripe payments with webhooks, an AI chatbot, and an automated email system — all connected through a custom REST API.

---

## Features

**Store**

- Product listing with search, filters, and category browsing
- Product detail pages with specs and verified purchase reviews
- Shopping cart with real-time updates
- Bundle deals with countdown timers
- Stripe hosted checkout with webhook-driven order creation
- Order history and order tracking

**Admin Dashboard**

- Analytics — revenue, daily sales, top products, order status
- Full CRUD for products, users, and orders
- Role-based access control (user / admin)
- Order status management

**System**

- JWT authentication via httpOnly cookies
- AI chatbot (Gemini) integrated into the storefront
- Automated emails — welcome, newsletter, contact
- Google OAuth login
- Rate limiting, input sanitization, helmet headers

---

## Tech Stack

| Layer      | Technologies                                         |
| ---------- | ---------------------------------------------------- |
| Frontend   | Next.js 15, Tailwind CSS, React Query, Zustand       |
| Backend    | Node.js, Express.js, MongoDB, Mongoose               |
| Auth       | JWT, httpOnly cookies, Google OAuth (Passport.js)    |
| Payments   | Stripe (Checkout + Webhooks)                         |
| AI         | Google Gemini API                                    |
| Email      | Brevo (Nodemailer + Pug templates)                   |
| Deployment | Vercel (frontend) · Render (backend) · MongoDB Atlas |

---

## Demo

🔗 **Live:** [e-commerce-eyasdms-projects.vercel.app](https://e-commerce-eyasdms-projects.vercel.app)

**Test accounts — ready to use:**

| Role  | Email            | Password |
| ----- | ---------------- | -------- |
| Admin | admin10@test.com | test1234 |
| User  | eyas2@test.com   | test1234 |

> Admin login redirects automatically to the dashboard.

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Stripe account

### 1. Clone

```bash
git clone https://github.com/Eyasdm/e-commerce.git
cd e-commerce
```

### 2. Install dependencies

```bash
# Backend
cd Backend && npm install

# Frontend
cd ../apps && npm install
```

### 3. Set environment variables

Create `Backend/.env`:

```env
PORT=8000
NODE_ENV=development
DATABASE=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
BASE_URL=http://localhost:8000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
GEMINI_API_KEY=your_gemini_key
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=your_brevo_user
BREVO_SMTP_PASS=your_brevo_pass
EMAIL_FROM=noreply@yourdomain.com
CONTACT_RECEIVER_EMAIL=your@email.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Create `apps/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 4. Run

```bash
# Backend (from /Backend)
npm run dev        # http://localhost:8000

# Frontend (from /apps)
npm run dev        # http://localhost:3000
```

**Stripe webhook (local testing):**

```bash
stripe listen --forward-to localhost:8000/api/v1/orders/webhook
```

---

## Project Structure

```
e-commerce/
├── apps/                       # Next.js frontend
│   ├── app/                    # App Router pages
│   ├── components/             # UI components (auth, cart, admin, etc.)
│   ├── context/                # AuthContext, AdminAuthContext
│   ├── hooks/                  # React Query hooks
│   ├── services/               # API call functions
│   └── store/                  # Zustand stores
│
└── Backend/
    └── src/
        ├── controllers/        # Route handlers
        ├── models/             # Mongoose schemas
        ├── routes/             # Express routers
        ├── services/           # Business logic
        ├── middlewares/        # Auth, error handling
        └── utils/              # Email, Stripe, helpers
```

---

## Security

- JWT tokens stored in `httpOnly`, `secure`, `sameSite=none` cookies
- Passwords hashed with bcrypt (12 rounds)
- MongoDB injection protection via `express-mongo-sanitize`
- XSS protection on all request bodies
- Rate limiting on all API routes and chat endpoint
- Stripe webhook signature verification
- Role-based route protection on all admin endpoints

---

## Author

**Eyas Mohammed**
[GitHub](https://github.com/Eyasdm) · [LinkedIn](https://www.linkedin.com/in/eyas-adam/)

---

> Built independently as a first full-stack project. No real transactions occur.
