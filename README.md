# Factly - AI-Powered Fact Discovery Platform

A modern web application that leverages artificial intelligence to provide instant, accurate, and interesting facts on any topic. Built with Next.js 15, featuring robust content moderation, user authentication, and persistent data storage.

## Overview

Factly is an intelligent fact-finding platform that allows users to explore knowledge across various domains including science, history, technology, space exploration, and more. The application combines Google's Gemini AI with sophisticated content moderation to deliver safe, educational content in an intuitive user interface.

## Key Features

- **AI-Powered Fact Generation**: Utilizes Google Gemini AI to generate comprehensive and accurate facts
- **Advanced Content Moderation**: Multi-layer filtering system to ensure appropriate and safe content
- **User Authentication**: Secure authentication system powered by Clerk
- **Request History**: Persistent storage of user queries and responses with MongoDB
- **Responsive Design**: Optimized for desktop and mobile devices
- **Real-time Updates**: Dynamic sidebar showing recent fact requests
- **Professional Dark Theme**: Clean, modern interface optimized for readability

## Technology Stack

### Frontend
- **Next.js 15**: React framework with App Router for server-side rendering
- **React 19**: Latest React features with modern hooks
- **TypeScript**: Type-safe development environment
- **Tailwind CSS 4**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth user interactions

### Backend & Infrastructure
- **Next.js API Routes**: Server-side API endpoints
- **MongoDB**: NoSQL database for data persistence
- **Prisma ORM**: Type-safe database client and schema management
- **Vercel**: Cloud deployment platform

### External Services
- **Google Gemini AI**: Advanced language model for fact generation
- **Clerk**: Authentication and user management
- **MongoDB Atlas**: Cloud database hosting

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Zod**: Runtime type validation
- **Git**: Version control system

## Project Structure

```
factly/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── fact/          # Fact generation API endpoint
│   │   │   └── logs/          # User history API endpoint
│   │   ├── globals.css        # Global styles and CSS variables
│   │   ├── layout.tsx         # Root layout with Clerk provider
│   │   └── page.tsx           # Main application page
│   ├── components/
│   │   ├── FactForm.tsx       # Input form for topic requests
│   │   ├── HistorySidebar.tsx # User request history display
│   │   └── ResultDisplay.tsx  # Fact presentation component
│   ├── lib/
│   │   ├── env.ts             # Environment variable validation
│   │   ├── gemini.ts          # Google Gemini AI integration
│   │   ├── moderation.ts      # Content moderation system
│   │   ├── prisma.ts          # Database connection setup
│   │   └── utils.ts           # Utility functions
│   └── middleware.ts          # Clerk authentication middleware
├── prisma/
│   └── schema.prisma          # Database schema definition
├── .env.example               # Environment variables template
├── vercel.json               # Vercel deployment configuration
└── package.json              # Dependencies and scripts
```

## Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or cloud)
- Google Gemini API key
- Clerk authentication keys

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/deepanshu-yd/intresting-facts-app.git
   cd intresting-facts-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**

   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"

   # Google Gemini AI
   GEMINI_API_KEY="your_gemini_api_key"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
   CLERK_SECRET_KEY="sk_test_..."
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |

### External Service Setup

#### Google Gemini AI
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your environment variables

#### Clerk Authentication
1. Create an account at [Clerk.dev](https://clerk.dev)
2. Create a new application
3. Copy the publishable and secret keys
4. Configure allowed domains for production

#### MongoDB Database
1. Create a MongoDB Atlas cluster at [MongoDB.com](https://cloud.mongodb.com)
2. Set up database access credentials
3. Configure network access
4. Get the connection string

## Deployment

### Vercel Deployment

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Vercel will auto-detect Next.js configuration

2. **Configure Environment Variables**
   - Add all required environment variables in Vercel dashboard
   - Ensure production URLs are configured in Clerk

3. **Deploy**
   - Vercel will automatically build and deploy your application
   - The app will be available at your assigned Vercel URL

### Production Considerations

- Environment variables are managed through Vercel dashboard
- MongoDB connection should use production cluster
- Clerk domains must include your production URL
- Content moderation list can be expanded based on requirements

## API Endpoints

### POST /api/fact
Generates facts for a given topic.

**Request Body:**
```json
{
  "topic": "space exploration"
}
```

**Response:**
```json
{
  "message": "Generated fact content..."
}
```

### GET /api/logs
Retrieves user's fact request history.

**Response:**
```json
{
  "logs": [
    {
      "id": "log_id",
      "topic": "space exploration",
      "responseText": "Fact content...",
      "isWarning": false,
      "createdAt": "2025-09-05T12:00:00Z"
    }
  ]
}
```

## Content Moderation

The application implements multi-layer content moderation:

- **Input Validation**: Length limits, URL detection, special character filtering
- **Word Filtering**: Comprehensive list of inappropriate terms
- **Pattern Detection**: Regex-based harmful content identification
- **User Feedback**: Clear warning messages for blocked content

## Database Schema

```prisma
model RequestLog {
  id            String   @id @default(auto()) @map("_id") @db.ObjectId
  userId        String
  topic         String
  responseText  String
  isWarning     Boolean  @default(false)
  warningReason String?
  createdAt     DateTime @default(now())
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, issues, or feature requests, please create an issue in the GitHub repository.

## Acknowledgments

- Google Gemini AI for intelligent fact generation
- Clerk for robust authentication system
- MongoDB for reliable data persistence
- Vercel for seamless deployment platform