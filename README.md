# SentinelShe – Women's Safety Platform

**Knowledge is Your Shield. Community is Your Strength.**

---

## 📋 Project Overview

SentinelShe is a comprehensive women's safety platform that combines structured knowledge, community intelligence, and safety resources. Unlike traditional safety apps that focus only on emergency alerts, SentinelShe takes a **proactive approach** by educating users, building awareness, and creating a community-powered safety network.

### 🎯 Core Mission
Empower women through knowledge and community support to help prevent unsafe situations before they occur.

---

## ✨ Key Features

### 1. The Academy 🎓
- Interactive learning modules for self-defense techniques  
- Scenario simulator for practicing real-life responses  
- Video lessons from certified self-defense experts  
- Progress tracking with a personal safety score  
- Downloadable content for offline access  

### 2. The Armory 🛡️
- Curated database of safety gadgets (alarms, sprays, trackers, etc.)  
- Smart gadget finder quiz for personalized recommendations  
- Legality checker by country or region  
- Verified user reviews and ratings  
- Price comparison with affiliate links  

### 3. The Watchtower 🗼
- Community-powered safety map with incident reports  
- Anonymous story sharing and experiences  
- Real-time alerts for suspicious activities  
- Heat maps highlighting unsafe areas  
- Upvote and comment system for community validation  

### 4. User Dashboard 📊
- Personal safety score tracking  
- Learning progress monitoring  
- Community contribution history  
- Buddy system for check-ins  
- Saved stories and reports  

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)  
- **Language:** TypeScript  
- **Styling:** Tailwind CSS v4  
- **State Management:** React Query + Zustand  
- **Forms:** React Hook Form + Zod  
- **Maps:** Mapbox GL JS  
- **Animations:** Framer Motion  

### Backend
- **API:** Next.js API Routes (Serverless)  
- **Database:** PostgreSQL with Prisma ORM  
- **Authentication:** NextAuth.js  
- **File Storage:** Cloudinary  
- **Caching:** Redis (Upstash)  

### DevOps
- **Hosting:** Vercel  
- **CI/CD:** GitHub Actions  
- **Monitoring:** Sentry  
- **Analytics:** Plausible  

---

## 📁 Project Structure

```text
sentinelshe/
├── src/
│   ├── app/
│   │   ├── (routes)/
│   │   │   ├── academy/
│   │   │   ├── armory/
│   │   │   ├── watchtower/
│   │   │   ├── resources/
│   │   │   └── about/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── reports/
│   │   │   ├── stories/
│   │   │   └── courses/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── academy/
│   │   ├── armory/
│   │   ├── watchtower/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── providers/
│   ├── lib/
│   │   ├── db/
│   │   ├── validators/
│   │   ├── constants.ts
│   │   └── utils/
│   ├── hooks/
│   ├── types/
│   └── middleware.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
├── .env.example
├── package.json
├── tailwind.config.ts
└── README.md
```
## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Mapbox API key
- Cloudinary account

---

### Installation

#### Clone the repository
```bash
git clone https://github.com/yourusername/sentinelshe.git
cd sentinelshe
```

#### Install dependencies
```bash
npm install
```

#### Set up environment variables
```bash
cp .env.example .env.local
```

Fill in the variables:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN="your-token"

# Cloudinary
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

#### Set up the database
```bash
npx prisma generate
npx prisma migrate dev --name init
```

(Optional) Seed the database:
```bash
npm run seed
```

#### Run the development server
```bash
npm run dev
```

Open your browser and navigate to:  
👉 http://localhost:3000

---

## 🧪 Available Scripts
- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm start` – Start production server
- `npm run lint` – Run ESLint
- `npm run format` – Format code with Prettier
- `npm run type-check` – Run TypeScript checks
- `npm run seed` – Seed database

---

## 🤝 Contributing

### Branch Naming
- `feature/` – New features
- `fix/` – Bug fixes
- `docs/` – Documentation
- `refactor/` – Refactoring

### Commit Convention
We follow **Conventional Commits**:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Refactoring
- `test:` Tests
- `chore:` Maintenance

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes
3. Run linting and tests
4. Submit a PR with a clear description
5. Wait for review and approval

---

## 📝 License
This project is **proprietary and confidential**.

---

## 📞 Contact
**Project Lead:** Your Name  
**Email:** contact@sentinelshe.com  
**Website:** https://sentinelshe.com  

---

## 🙏 Acknowledgments
- Self-defense experts who contributed content
- Community members who shared their stories
- Partner NGOs and women’s safety organizations
