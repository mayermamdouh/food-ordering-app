# 🍔 Food Ordering App

## 🌍 Multilingual: English & Arabic

A full-stack **food ordering platform** built with **Next.js 14**, **Prisma**, **NextAuth**, **Redux Toolkit**, and **ShadCN UI**.

The app provides:

- **User features** for browsing the menu, customizing items, placing orders, and authentication.
- **Admin dashboard** for managing **categories, products, sizes, extras, and customer orders**.
- **Bilingual support**: English 🇬🇧 & Arabic 🇸🇦.

---

## 🚀 Features

### 👤 User

- Browse menu items by category _(Burgers, Shawarma, Falafel, Tuna, etc.)_
- View detailed product pages with **sizes** and **extra options**
- Add items to cart and place secure orders
- Login with **credentials-based authentication**
- Fully responsive UI using **ShadCN UI** and **TailwindCSS**
- Switch between **English & Arabic interfaces**

### 🛠️ Admin

- Manage **categories** _(create, edit, delete)_
- Manage **menu items** _(create, edit, delete)_
- Add and configure **sizes** and **extra options**
- View and manage **customer orders**
- Dashboard for products, categories, and orders

---

## 🏗️ Tech Stack

- **Frontend:** Next.js 14, React, TailwindCSS, ShadCN UI
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** PostgreSQL / MySQL (via Prisma)
- **Authentication:** NextAuth (credentials)
- **State Management:** Redux Toolkit
- **UI Icons:** Lucide React
- **Notifications:** React Toastify
- **Internationalization (i18n):** English & Arabic

---

## 📂 Project Structure

src/
├── app/                 # Next.js App Router (routes, API, localization)
├── components/          # Reusable UI components
├── constants/           # App-wide constants and configuration
├── dictionaries/        # Internationalization (i18n) language dictionaries
├── hooks/               # Custom React hooks
├── lib/                 # Third-party libraries and utilities
├── provider/            # React Context providers
├── store/               # State management (Redux Toolkit)
├── types/               # TypeScript type definitions
└── validations/         # Data validation schemas

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/food-ordering-app.git
cd food-ordering-app
```

2. Install dependencies:
npm install
# or
yarn install

3. 🔑 Environment Variables

Create a `.env.local` file in the root of your project and add the following variables:

```env
# Database connection
DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/DATABASE_NAME?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-generated-secret"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"



4. Run database migrations:
   npx prisma migrate dev

5. Start the development server:
   npm run dev
# or
    yarn dev
