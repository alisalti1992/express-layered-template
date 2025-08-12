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

### Docker Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

## API Documentation

Once running, access the API documentation at:
- Swagger UI: `http://localhost:3000/api-docs`
- Health Check: `http://localhost:3000/health`

## Development

This project follows a **phased development approach** with small, focused iterations:

- **Phase 1-4**: Foundation (Node.js, Express, Linting, Prisma)
- **Phase 5-10**: Core Infrastructure (Testing, Docker, Documentation, Validation, Logging, Architecture)
- **Phase 11+**: Feature Development (Crawling, Screenshots, SEO Analysis, Reporting)

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