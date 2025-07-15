# Next.js Better Auth Boilerplate

A comprehensive, production-ready authentication boilerplate built with **Next.js 15**, **Better Auth**, **Prisma**, and **shadcn/ui**. This project provides a complete authentication ecosystem with multiple login methods, user management, admin features, and beautiful email templates.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) with Turbopack
- **Authentication**: [Better Auth](https://better-auth.com/) with advanced plugins
- **Database**: [Prisma](https://prisma.io/) + PostgreSQL
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (New York theme)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management**: [TanStack Query](https://tanstack.com/query) v5
- **Email**: [React Email](https://react.email/) + [Resend](https://resend.com/)
- **Password Hashing**: [Argon2](https://github.com/napi-rs/node-rs)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **TypeScript**: Full type safety throughout

---

## ✨ Features

### 🔐 Complete Authentication System

- **Multiple Login Methods**:
  - Email/password authentication
  - Google OAuth integration
  - Magic link login (passwordless)
  - Password reset via email
- **Advanced Security**:
  - Argon2 password hashing
  - Session management with configurable expiration (30 days)
  - Cookie-based session caching (5 min cache)
  - Email verification required
  - Protected routes with middleware
  - Account linking disabled for security

### 📧 Email System

- **Beautiful Email Templates**:
  - Magic link emails
  - Password reset emails
  - Email verification
  - Resend email verification
- **Email Actions**: Server-side email sending with error handling
- **Responsive Design**: Professional email layouts

### 👨‍💼 User Management

- **User Profiles**:
  - Editable user profiles with image upload
  - Change password functionality
  - Email verification status
  - User role management (USER/ADMIN)
  - Active/inactive user status

### 🛡️ Admin Features

- **Admin Dashboard**: Dedicated admin interface
- **User Management Table**:
  - View all users with sorting/filtering
  - Toggle user active/inactive status
  - Delete users
  - Role-based access control
- **Auto Admin Assignment**: Automatic admin role based on email list

### 🎨 Modern UI/UX

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: Theme switching with next-themes
- **Interactive Components**:
  - Real-time form validation
  - Loading states and transitions
  - Toast notifications
  - Password visibility toggles
  - Sortable data tables
- **Accessibility**: ARIA-compliant components

### 🔧 Developer Experience

- **Type Safety**: End-to-end TypeScript
- **Code Quality**: ESLint configuration
- **Hot Reload**: Turbopack for fast development
- **Database Management**: Prisma migrations and introspection
- **API Routes**: RESTful endpoints for user operations
- **Server Actions**: Modern Next.js server-side operations

---

## 📁 Project Structure

```
src/
├── actions/
│   ├── auth/                   # Authentication server actions
│   ├── email/                  # Email sending actions
│   └── user/                   # User management actions
├── app/
│   ├── (authenticated)/        # Protected routes group
│   │   ├── (admin)/           # Admin-only routes
│   │   │   └── admin-dashboard/
│   │   ├── layout.tsx         # Auth middleware
│   │   └── user-profile/      # User profile page
│   ├── api/
│   │   ├── auth/[...all]/     # Better Auth API routes
│   │   └── users/             # User management API
│   ├── auth/                  # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── verify/
│   ├── layout.tsx             # Root layout with providers
│   └── page.tsx               # Landing page
├── components/
│   ├── auth/                  # Authentication components
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   ├── magic-link-login-form.tsx
│   │   ├── google-oauth-button.tsx
│   │   ├── forgot-password-form.tsx
│   │   ├── reset-password-form.tsx
│   │   └── sign-out-button.tsx
│   ├── table/                 # Data table components
│   ├── ui/                    # shadcn/ui components
│   ├── change-password-form.tsx
│   ├── user-profile-form.tsx
│   └── user-list-table.tsx
├── emails/                    # React Email templates
│   ├── email-magic-link.tsx
│   ├── email-reset-password.tsx
│   └── email-verification.tsx
├── form-schemas/              # Zod validation schemas
├── hooks/                     # Custom React hooks
├── lib/
│   ├── auth.ts               # Better Auth server config
│   ├── auth-client.ts        # Better Auth client config
│   ├── argon2.ts             # Password hashing utilities
│   ├── db.ts                 # Database utilities
│   ├── mail.ts               # Email configuration
│   └── utils.ts              # Utility functions
├── providers/                 # React context providers
├── types/                     # TypeScript type definitions
└── middleware.ts              # Route protection middleware

prisma/
└── schema.prisma             # Database schema with User, Session, Account, Verification, Post models
```

---

## 🛠️ Prerequisites

- Node.js 18+
- PostgreSQL database
- Google OAuth credentials (optional)
- Resend API key for emails
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

# Configure your .env.local:
# DATABASE_URL="postgresql://..."
# BETTER_AUTH_SECRET="your-secret-key"
# GOOGLE_CLIENT_ID="your-google-client-id"
# GOOGLE_CLIENT_SECRET="your-google-client-secret"
# RESEND_API_KEY="your-resend-api-key"
# RESEND_EMAIL_FROM="noreply@yourdomain.com"
# ADMIN_EMAILS="admin@example.com,admin2@example.com"
# NEXT_PUBLIC_APP_URL="http://localhost:3000"

# 4. Set up the database
npx prisma migrate dev --name init

# 5. Run the development server
npm run dev

# 6. Open in browser
# http://localhost:3000
```

---

## 🗄️ Database Schema

Includes comprehensive models:

- **User**: Email, name, role (USER/ADMIN), active status, profile info
- **Session**: Secure session tokens with expiration
- **Account**: OAuth and credential account linking
- **Verification**: Email verification and password reset tokens
- **Post**: Sample content model (optional)

---

## 🔐 Authentication Flow

### Standard Flow

1. **Register** – Email/password signup with verification
2. **Email Verification** – Required before login
3. **Login** – Multiple options (email/password, Google, magic link)
4. **Session Management** – Automatic session handling with refresh
5. **Protected Routes** – Middleware-based route protection
6. **Logout** – Secure session termination

### Magic Link Flow

1. **Request Magic Link** – Enter email address
2. **Receive Email** – Beautiful email template with secure link
3. **Click Link** – Automatic login and redirect

### Password Reset Flow

1. **Forgot Password** – Enter email address
2. **Reset Email** – Secure reset link via email
3. **New Password** – Set new password with confirmation
4. **Auto Redirect** – Return to login page

---

## 👨‍💼 Admin Features

### Admin Dashboard

- User management table with sorting and filtering
- Toggle user active/inactive status
- Delete users with confirmation
- View user roles and verification status

### Auto Admin Assignment

Users with emails listed in `ADMIN_EMAILS` environment variable automatically receive admin role.

---

## 📧 Email Templates

Built with React Email for beautiful, responsive emails:

- **Magic Link**: Clean, branded login emails
- **Password Reset**: Secure reset instructions
- **Email Verification**: Welcome and verification emails
- **Resend Verification**: Re-send verification option

---

## 🎨 UI Components

Built with shadcn/ui (New York theme):

- **Forms**: Validated, accessible forms with error states
- **Data Tables**: Sortable, filterable user management
- **Cards**: Clean layout containers
- **Buttons**: Various states and loading indicators
- **Inputs**: Enhanced fields with validation feedback
- **Badges**: Status indicators for roles and verification
- **Dropdowns**: Action menus for user management
- **Toast**: Beautiful success/error notifications

---

## 📝 Available Scripts

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database operations
npx prisma studio          # Database GUI
npx prisma migrate dev     # Run migrations
npx prisma generate        # Generate client
```

---

## 🔧 Customization

### ➕ Add OAuth Providers

Edit `src/lib/auth.ts`:

```typescript
socialProviders: {
  google: { /* existing config */ },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  },
},
```

### 🛡️ Add Protected Routes

Edit `src/middleware.ts`:

```typescript
const protectedRoutes = ["/user-profile", "/dashboard", "/settings"];
```

### 📧 Customize Email Templates

Modify templates in `src/emails/` using React Email components.

### 🎨 Update Theme

- **Global styles** → `src/app/globals.css`
- **Component styling** → Tailwind utility classes
- **shadcn/ui theme** → `components.json`

---

## 🚀 Deployment

### ✅ Vercel (Recommended)

1. Push repository to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy automatically

### 🌐 Other Platforms

1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations: `npx prisma migrate deploy`
4. Build application: `npm run build`
5. Start production server: `npm start`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🦘 Support & Resources

- **Better Auth**: [Documentation](https://better-auth.com/) | [GitHub](https://github.com/better-auth/better-auth)
- **Next.js**: [Documentation](https://nextjs.org/docs) | [Learn](https://nextjs.org/learn)
- **Prisma**: [Documentation](https://prisma.io/docs) | [Schema Reference](https://prisma.io/docs/reference/api-reference/prisma-schema-reference)
- **shadcn/ui**: [Documentation](https://ui.shadcn.com/) | [Components](https://ui.shadcn.com/docs/components)
- **React Email**: [Documentation](https://react.email/) | [Examples](https://react.email/examples)

### 🐛 Issues & Questions

- [Open an Issue](https://github.com/your-username/nextjs-better-auth-boilerplate/issues)
- [Discussions](https://github.com/your-username/nextjs-better-auth-boilerplate/discussions)

---

**Happy coding!** 🚀
