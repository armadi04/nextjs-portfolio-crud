# 🎨 Modern Portfolio Website Template

A beautiful, fully-featured portfolio website template with an integrated CMS admin dashboard. Built with Next.js 14, TypeScript, Tailwind CSS, and Prisma ORM.

![Portfolio Preview](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma)

## ✨ Features

### 🎯 Frontend

- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Mode** - Theme switching with next-themes
- **Smooth Animations** - Beautiful transitions with Framer Motion
- **SEO Optimized** - Meta tags and structured data
- **Modern UI Components** - Built with Shadcn UI and Radix UI
- **Analytics Ready** - Integrated with Vercel Analytics

### 🔐 Admin Dashboard

- **Secure Authentication** - Protected routes with NextAuth
- **Content Management** - Full CRUD operations for all sections
- **Drag & Drop** - Reorder projects, skills, and more
- **Real-time Updates** - Changes reflect immediately on the frontend
- **Rich Text Editing** - Manage all your content easily
- **Image Management** - Upload and manage project images

### 📊 Manageable Sections

- Profile & Bio
- Skills & Technologies
- Work Experience
- Projects Portfolio
- Education
- Achievements

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A database (PostgreSQL recommended, SQLite for development)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/portfolio-template.git
cd portfolio-template
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
# Database (choose one)
DATABASE_URL="postgresql://user:password@host:port/database"
# OR for development
DATABASE_URL="file:./dev.db"

# Admin credentials
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="your-secure-password"

# Auth secret (generate with: openssl rand -base64 32)
AUTH_SECRET="your-secret-key"

# App URL
NEXTAUTH_URL="http://localhost:3000"
```

4. **Set up the database**

For PostgreSQL:

```bash
npx prisma generate
npx prisma db push
```

For SQLite (development):

```bash
# Windows PowerShell
$env:DATABASE_URL="file:./dev.db"; npx prisma db push

# Linux/Mac
DATABASE_URL="file:./dev.db" npx prisma db push
```

5. **Seed the database (optional)**

```bash
# Windows PowerShell
$env:DATABASE_URL="file:./dev.db"; npx tsx prisma/seed.ts

# Linux/Mac
DATABASE_URL="file:./dev.db" npx tsx prisma/seed.ts
```

6. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

## 🎨 Customization

### Accessing the Admin Dashboard

1. Navigate to `/login`
2. Enter your admin credentials (from `.env`)
3. Start managing your content!

### Managing Content

**Profile Section**

- Update your name, tagline, bio, and contact information
- Set your years of experience and projects completed

**Skills**

- Add/edit/delete skills
- Organize by categories (Frontend, Backend, Tools, etc.)
- Drag & drop to reorder

**Projects**

- Create new projects with title, description, and images
- Add tags and links
- Reorder with drag & drop

**Experience**

- Add your work history
- Include company, role, period, and description

**Education**

- List your educational background
- Add degrees, institutions, and periods

**Achievements**

- Showcase your awards and certifications
- Add images and descriptions

## 🗄️ Database Options

### PostgreSQL (Recommended for Production)

Update your `prisma/schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

**Recommended Providers:**

- [Supabase](https://supabase.com) - Free tier available
- [Railway](https://railway.app) - Easy deployment
- [Neon](https://neon.tech) - Serverless PostgreSQL
- [Vercel Postgres](https://vercel.com/storage/postgres) - Integrated with Vercel

### SQLite (Development Only)

Update your `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Set in `.env`:

```env
DATABASE_URL="file:./dev.db"
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

3. **Configure Environment Variables**

Add these in Vercel dashboard:

```
DATABASE_URL=your-postgresql-url
DIRECT_URL=your-postgresql-direct-url
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password
AUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
```

4. **Deploy!**

Vercel will automatically build and deploy your site.

### Other Platforms

This template works on any platform that supports Next.js:

- [Railway](https://railway.app)
- [Netlify](https://netlify.com)
- [Render](https://render.com)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

## 📁 Project Structure

```
├── app/
│   ├── (admin)/              # Admin dashboard routes
│   │   ├── dashboard/        # Dashboard pages
│   │   └── layout.tsx        # Admin layout with auth
│   ├── api/                  # API routes
│   ├── login/                # Login page
│   └── page.tsx              # Homepage
├── components/
│   ├── admin/                # Admin components
│   │   ├── ProjectForm.tsx
│   │   ├── ProjectsList.tsx
│   │   └── ...
│   └── ui/                   # UI components (Shadcn)
├── actions/                  # Server actions
│   └── portfolio.ts          # CRUD operations
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   └── prisma.ts             # Prisma client
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
└── public/                   # Static assets
```

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Icons:** [Lucide React](https://lucide.dev/), [Hugeicons](https://hugeicons.com/)
- **Drag & Drop:** [@dnd-kit](https://dndkit.com/)

## 🔧 Troubleshooting

### Build Errors

**Error: Prisma Client not generated**

```bash
npx prisma generate
```

**Error: Database connection failed**

- Check your `DATABASE_URL` in `.env`
- Ensure your database is running
- Verify credentials are correct

### Cache Issues

**Clear Next.js cache:**

```bash
# Windows
Remove-Item -Recurse -Force .next

# Linux/Mac
rm -rf .next
```

Then restart the dev server:

```bash
npm run dev
```

### Authentication Issues

**Can't login:**

- Verify `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env`
- Check `AUTH_SECRET` is set
- Ensure `NEXTAUTH_URL` matches your domain

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Vercel](https://vercel.com) for the amazing hosting platform
- [Prisma](https://www.prisma.io/) for the excellent ORM

## 📧 Support

If you have any questions or need help, please open an issue or reach out:

- Create an [Issue](https://github.com/yourusername/portfolio-template/issues)
- Start a [Discussion](https://github.com/yourusername/portfolio-template/discussions)

---

**Made with ❤️ using Next.js**

If you find this template useful, please consider giving it a ⭐️!
