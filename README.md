# Next.js Better Auth Boilerplate

A modern, full-stack authentication boilerplate built with **Next.js 15**, **Better Auth**, **Prisma**, and **shadcn/ui**. This project provides a complete authentication system with email/password signup, login, and session management.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Authentication**: [Better Auth](https://better-auth.com/)
- **Database**: [Prisma](https://prisma.io/) + PostgreSQL
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **TypeScript**: Full type safety

---

## ✨ Features

### 🔐 Authentication System

- Email/password registration and login
- Session management with Better Auth
- Protected routes using middleware
- Automatic session validation

### 🎨 Modern UI/UX

- Responsive design via shadcn/ui
- Dark/light mode (via `next-themes`)
- Real-time form validation
- Toast notifications

### 🛡️ Security & Validation

- Zod schema validation
- Type-safe DB operations via Prisma
- Secure session handling
- Password visibility toggle

### 👨‍💼 Developer Experience

- Full TypeScript support
- ESLint setup
- Hot reload with Turbopack
- Clean, modular project structure

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (authenticated)/         # Protected routes
│   │   ├── layout.tsx           # Auth middleware
│   │   └── user-profile/        # User profile page
│   ├── api/auth/[...all]/       # Better Auth API routes
│   ├── auth/                    # Auth pages (login/register)
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── auth/                    # Auth components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── sign-out-button.tsx
│   └── ui/                      # shadcn/ui components
├── form-schemas/               # Zod schemas
├── lib/
│   ├── auth.ts                 # Better Auth (server)
│   ├── auth-client.ts          # Better Auth (client)
│   ├── prisma.ts               # Prisma client
│   └── utils.ts                # Utility functions
prisma/
└── schema.prisma               # DB schema
```

---

## 🛠️ Prerequisites

- Node.js 18+
- PostgreSQL database
- npm / yarn / pnpm / bun

---

## ⚡ Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/your-username/nextjs-better-auth-boilerplate
cd nextjs-better-auth-boilerplate

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Set up the database
npx prisma migrate dev --name init

# 5. Run the dev server
npm run dev

# 6. Open in browser
http://localhost:3000
```

---

## 🗄️ Database Schema

Includes:

- **User**: Email, name, profile info
- **Session**: Session tokens
- **Account**: OAuth/credentials
- **Verification**: Email verification tokens
- **Post**: Sample content (optional)

---

## 🔐 Authentication Flow

1. **Register** – Email/password signup
2. **Login** – Secure login
3. **Session Management** – Auto session handling
4. **Protected Routes** – `(authenticated)/` requires login
5. **Logout** – Secure session end

---

## 🎨 UI Components

Built with shadcn/ui (`new-york` theme):

- **Forms** – Validated, error-aware forms
- **Cards** – Clean layout containers
- **Buttons** – Various states and styles
- **Inputs** – Enhanced fields w/ validation
- **Toast** – Beautiful notifications

---

## 📝 Available Scripts

```bash
# Run dev server
npm run dev

# Format code
npm run format

# Lint code
npm run lint

# Build app
npm run build
```

---

## 🔧 Customization

### ➕ Add New UI Components

Add to `components/ui` or generate using `shadcn/ui` CLI.

### ↺ Modify Authentication

Edit `lib/auth.ts` to:

- Add OAuth providers
- Change password rules
- Add custom fields

### 🧱 Update Database

```bash
# 1. Edit schema.prisma
# 2. Run migration
npx prisma migrate dev --name your-migration
# 3. Adjust generated types
```

### 🎨 Styling

- Global styles → `globals.css`
- Per-component styling → Tailwind utility classes
- Theme → `components.json` (shadcn config)

---

## 🚀 Deployment

### ✅ Vercel (Recommended)

1. Push repo to GitHub
2. Import project to [Vercel](https://vercel.com/)
3. Add environment variables
4. Deploy!

### 🌐 Other Platforms

- Set up PostgreSQL
- Configure `.env`
- Run DB migrations
- Build app for production

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Write tests if applicable
5. Submit a pull request

---

## 📄 License

MIT License

---

## 🦘 Support

- Check [Better Auth docs](https://better-auth.com/)
- Read [Next.js docs](https://nextjs.org/docs)
- Review [Prisma docs](https://www.prisma.io/docs)
- Or [open an issue](https://github.com/your-repo/issues)

Happy coding! 🎉
