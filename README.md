# SiteScope

SiteScope is a modern Node.js Express application for SEO website crawling, screenshotting, and comprehensive reporting.

## Tech Stack

- **Backend**: Node.js with Express.js framework
- **Database**: PostgreSQL with Prisma ORM
- **Language**: TypeScript
- **Testing**: Jest with Supertest
- **Validation**: Zod for input validation
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston structured logging
- **Containerization**: Docker & Docker Compose

## Features

- **Website Crawling**: Intelligent web crawling with queue management
- **Screenshot Capture**: Automated screenshot generation using Puppeteer
- **SEO Analysis**: Comprehensive SEO metrics and analysis
- **RESTful API**: Well-documented API endpoints
- **Rate Limiting**: Request throttling and protection
- **Reporting**: Detailed analytics and reporting system

## Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Docker (optional)

### Local Development

```bash
# Clone repository
git clone <repository-url>
cd sitescope

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Set up database
npx prisma migrate dev

# Start development server
npm run dev
```

### Docker Development (Recommended)

```bash
# Build and start all services
docker compose up -d

# View logs
docker compose logs -f app

# Check service status
docker compose ps

# Stop services
docker compose down
```

The Docker setup includes:
- **Application**: Node.js app with TypeScript build
- **PostgreSQL**: Database with persistent storage
- **Redis**: Caching layer for future features
- **Health Checks**: Monitoring for all services

## API Documentation

The SiteScope API includes comprehensive OpenAPI documentation:

- **Swagger UI**: `http://localhost:3000/api-docs` - Interactive API documentation
- **Health Check**: `http://localhost:3000/health` - Server health status
- **Welcome**: `http://localhost:3000/` - API welcome message

### API Features:
- ✅ OpenAPI 3.0 specification
- ✅ Interactive Swagger UI interface  
- ✅ Complete endpoint documentation with examples
- ✅ Reusable schema components
- ✅ Standard HTTP error responses

## Development

This project follows a **phased development approach** with small, focused iterations:

✅ **Phase 1-7**: Foundation Complete (Node.js, Express, Linting, Prisma, Testing, Docker, API Docs)
🔄 **Phase 8**: Input Validation (Current)
📋 **Phase 9-10**: Core Infrastructure (Logging, Architecture)
📋 **Phase 11+**: Feature Development (Crawling, Screenshots, SEO Analysis, Reporting)

See [DEVELOPMENT.md](./DEVELOPMENT.md) for the complete phase-by-phase implementation plan.

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start           # Start production server
npm test            # Run tests
npm run lint        # Check code quality
npm run type-check  # TypeScript type checking
```

## Project Structure

```
src/
├── controllers/    # HTTP request handlers
├── services/      # Business logic
├── repositories/  # Database access layer
├── middlewares/   # Express middlewares
├── types/         # TypeScript type definitions
├── utils/         # Helper utilities
└── config/        # Configuration management
```

## License

MIT