# 🛍️ Indra Web Apparel

> A modern, full-stack e-commerce web application for an apparel brand built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and NextAuth.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)
![NextAuth](https://img.shields.io/badge/NextAuth.js-Auth-purple?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the App](#running-the-app)
- [Authentication](#-authentication)
- [Admin Dashboard](#-admin-dashboard)
- [Database Schema](#-database-schema)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌐 Overview

**Indra Web Apparel** is a production ready e-commerce platform for an apparel brand. It supports the full shopping lifecycle from browsing products to completing purchases with a secure authentication system, a real time shopping cart, a wishlist, and a powerful admin dashboard for managing inventory and orders.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Secure sign-up, login, and session management via NextAuth.js |
| 🛒 **Shopping Cart** | Add, update, and remove items with persistent cart state |
| 🏪 **Product Listing** | Browse and filter the full apparel catalogue |
| 💳 **Checkout & Payments** | Streamlined checkout flow with payment integration |
| 🛡️ **Admin Dashboard** | Manage products, categories, orders, and users |
| ❤️ **Wishlist** | Save favourite products for later |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Auth** | [NextAuth.js](https://next-auth.js.org/) |
| **Database** | PostgreSQL / MySQL / SQLite *(configured via `DATABASE_URL`)* |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 📁 Project Structure

```
indra-web-apperal/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth routes (login, register)
│   ├── (shop)/                 # Public shop routes
│   │   ├── page.tsx            # Homepage / product listing
│   │   ├── products/           # Product detail pages
│   │   ├── cart/               # Shopping cart
│   │   ├── wishlist/           # Wishlist
│   │   └── checkout/           # Checkout flow
│   ├── admin/                  # Protected admin dashboard
│   │   ├── products/           # Product management
│   │   ├── orders/             # Order management
│   │   └── users/              # User management
│   ├── api/                    # API Route Handlers
│   │   ├── auth/               # NextAuth API routes
│   │   ├── products/           # Product CRUD
│   │   ├── cart/               # Cart operations
│   │   ├── wishlist/           # Wishlist operations
│   │   └── orders/             # Order processing
│   └── layout.tsx              # Root layout
├── components/                 # Reusable UI components
│   ├── ui/                     # Base UI elements
│   ├── product/                # Product cards, grids, filters
│   ├── cart/                   # Cart drawer, item rows
│   └── admin/                  # Admin-specific components
├── lib/                        # Utility functions & config
│   ├── prisma.ts               # Prisma client singleton
│   ├── auth.ts                 # NextAuth configuration
│   └── utils.ts                # Shared helpers
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seed script
├── public/                     # Static assets
├── types/                      # Global TypeScript types
├── .env.example                # Environment variable template
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 18.x`
- **npm**, **yarn**, **pnpm**, or **bun**
- A running **database** instance (PostgreSQL recommended for production)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Kavindu-2004/indra-web-apperal.git
cd indra-web-apperal

# 2. Install dependencies
npm install
```

### Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Then open `.env` and configure the following:

```env
# ── Database ──────────────────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/indra_apparel"

# ── NextAuth ───────────────────────────────────────────────
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key"   # Generate: openssl rand -base64 32

# ── OAuth Providers (optional) ─────────────────────────────
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# ── Payments ───────────────────────────────────────────────
# Add your payment provider keys here
# e.g. STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

### Database Setup

```bash
# 1. Push the schema to your database
npx prisma db push

# 2. (Optional) Seed with sample data
npx prisma db seed

# 3. Open Prisma Studio to inspect your data
npx prisma studio
```

### Running the App

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Authentication

Authentication is handled by **NextAuth.js** with support for:

- **Credentials** — email & password (hashed with bcrypt)
- **OAuth** — Google (and any other providers you configure)

Session strategy uses **JWT** by default. Protected routes are guarded via Next.js middleware (`middleware.ts`), which redirects unauthenticated users to the login page.

**Role-based access:**

| Role | Access |
|---|---|
| `USER` | Shop, cart, wishlist, checkout, order history |
| `ADMIN` | All of the above + admin dashboard |

To promote a user to admin, update their role directly via Prisma Studio or a seed script:

```ts
await prisma.user.update({
  where: { email: "admin@example.com" },
  data: { role: "ADMIN" },
});
```

---

## 🛡️ Admin Dashboard

The admin dashboard is available at `/admin` and is restricted to users with the `ADMIN` role.

**Capabilities:**
- ➕ Create, edit, and delete products (name, price, stock, images, category)
- 📦 View and update order statuses (`PENDING` → `SHIPPED` → `DELIVERED`)
- 👥 View and manage registered users
- 📊 Overview stats (total orders, revenue, active users)

---

## 🗄️ Database Schema

Key models in `prisma/schema.prisma`:

```prisma
model User {
  id        String    @id @default(cuid())
  name      String?
  email     String    @unique
  password  String?
  role      Role      @default(USER)
  cart      Cart?
  wishlist  Wishlist?
  orders    Order[]
  createdAt DateTime  @default(now())
}

model Product {
  id          String      @id @default(cuid())
  name        String
  description String
  price       Float
  stock       Int
  images      String[]
  category    Category    @relation(fields: [categoryId], references: [id])
  categoryId  String
  cartItems   CartItem[]
  orderItems  OrderItem[]
  wishlists   Wishlist[]
}

model Order {
  id        String      @id @default(cuid())
  user      User        @relation(fields: [userId], references: [id])
  userId    String
  items     OrderItem[]
  total     Float
  status    OrderStatus @default(PENDING)
  createdAt DateTime    @default(now())
}

enum Role        { USER ADMIN }
enum OrderStatus { PENDING PROCESSING SHIPPED DELIVERED CANCELLED }
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimised production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npx prisma studio` | Open Prisma Studio GUI |
| `npx prisma db push` | Push schema changes to database |
| `npx prisma db seed` | Seed the database with sample data |
| `npx prisma generate` | Regenerate the Prisma client |

---

## 🌍 Deployment

The recommended way to deploy is via **Vercel**:

1. Push your repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from your `.env` file in the Vercel dashboard under **Settings → Environment Variables**.
4. Deploy — Vercel will automatically run `npm run build` and serve the app.

> For the database, use a hosted provider such as [Supabase](https://supabase.com/), [PlanetScale](https://planetscale.com/), or [Neon](https://neon.tech/) and update your `DATABASE_URL` accordingly.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository and clone your fork
git clone https://github.com/YOUR_USERNAME/indra-web-apperal.git

# 2. Create a feature branch
git checkout -b feature/your-feature-name

# 3. Commit your changes with a clear message
git commit -m "feat: add your feature"

# 4. Push and open a Pull Request
git push origin feature/your-feature-name
```

Please make sure your code passes linting (`npm run lint`) before submitting a PR.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.


