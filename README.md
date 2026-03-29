# 🎮 Video Games Store by Mario

A modern, fully functional video game store built with **React**, **Vite**, **Tailwind CSS**, and **Supabase**.

## ✨ Features

- 🎮 **Game Catalog**: RAWG API integration with 500K+ games
- 🛒 **Shopping Cart**: Full-featured cart with persistence
- 👥 **Authentication**: Secure login/signup with Supabase
- 👨‍💼 **Admin Panel**: Manage games (add, edit, delete)
- 🌙 **Dark/Light Theme**: Toggle between modes
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile
- ✨ **Neon Effects**: Modern animations and visual effects
- 📊 **Ratings & Filters**: Sort by price, rating, release date, or alphabetically

## 🛠️ Tech Stack

| Layer        | Technology                         |
| ------------ | ---------------------------------- |
| **Frontend** | React 18.3 + Vite 6.0              |
| **Styling**  | Tailwind CSS 3.4                   |
| **Database** | Supabase (PostgreSQL)              |
| **Routing**  | React Router v7                    |
| **APIs**     | RAWG (games), Supabase (auth/data) |
| **Icons**    | Lucide React                       |
| **UI**       | SweetAlert2                        |

## 📋 Prerequisites

- Node.js v16+
- npm or yarn
- [RAWG.io](https://rawg.io) account (free API)
- [Supabase](https://supabase.com) account (free tier)

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd videogamestore
npm install
```

### 2. Configure Environment

Get your keys from [RAWG API](https://rawg.io/apidocs) and [Supabase](https://supabase.com), then:

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Setup Supabase

Run the SQL from `SUPABASE_SETUP.sql` in your Supabase SQL editor.

### 4. Run Development Server

```bash
npm run dev
```

Open http://localhost:5173

## 🏗️ Project Structure

```
src/
├── components/       # UI components
├── pages/           # Page containers
├── services/        # API services
├── hooks/          # Custom React hooks
├── context/        # Context providers
└── utils/          # Helper functions
```

## 🔐 Default Credentials

⚠️ **For development only. Change in production!**

- Username: `admin`
- Password: `admin`

## 📦 Build & Deploy

```bash
npm run build       # Production build
npm run preview     # Preview production build
```

**Deploy to Vercel**:

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Auto-deploy on every push

## 🔒 Security Notes

- ✅ `.env` is in `.gitignore` (secrets safe)
- ✅ API keys: RAWG is public (safe), Supabase uses RLS
- ⚠️ Passwords stored as plain text - use bcryptjs for production

See [SECURITY.md](SECURITY.md) for details.

## 🐛 Troubleshooting

| Issue                     | Solution                                  |
| ------------------------- | ----------------------------------------- |
| API key not found         | Check `.env` file exists with correct key |
| Supabase connection error | Verify URL and Anon Key in `.env`         |
| Port 5173 already in use  | `npm run dev -- --port 3000`              |

## 📊 Database Schema

**games** table: id, title, price, rating, release_date, image_url, stock, is_published, created_at
**users** table: id, username, password_hash, is_admin

See [DEPLOYMENT.md](DEPLOYMENT.md) for production checklist.

## 📝 Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🎯 Future Roadmap

- [ ] Password hashing (bcryptjs)
- [ ] User reviews & ratings
- [ ] Wishlist feature
- [ ] Payment integration
- [ ] Email notifications
- [ ] Multi-language support

---

**Made with ❤️ by Mario** 🎮

For questions or issues, open a GitHub issue.
