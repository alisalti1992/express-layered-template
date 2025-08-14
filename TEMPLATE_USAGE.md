# Express Layered Template Usage Guide

This guide helps you set up and customize the Express Layered Architecture Template for your own project.

## Quick Setup

### 1. Create Your Project

```bash
# Use this template to create a new project
git clone <your-template-url> your-project-name
cd your-project-name

# Remove template git history and create your own
rm -rf .git
git init
git add .
git commit -m "Initial commit from Express Layered Template"
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Required variables:
# - DATABASE_URL (PostgreSQL connection string)
# - NODE_ENV (development/production)
# - PORT (default: 3000)
# - LOG_LEVEL (error/warn/info/http/debug)
```

### 4. Database Setup

```bash
# Start Prisma Postgres server (development)
npx prisma dev

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 5. Start Development

```bash
# Start development server with hot reload
npm run dev

# The server will start on http://localhost:3000
# API docs available at http://localhost:3000/api-docs
```

## Docker Setup (Recommended)

```bash
# Start all services (app, PostgreSQL, Redis)
docker compose up -d

# View logs
docker compose logs -f app

# Stop services
docker compose down
```

## Customizing the Template

### 1. Update Project Information

Edit these files to reflect your project:
- `package.json` - Update name, description, author, repository
- `README.md` - Replace template content with your project description
- `CLAUDE.md` - Update project overview and guidelines for Claude Code

### 2. Database Schema

Modify `prisma/schema.prisma` to define your data models:

```prisma
model YourModel {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

After schema changes:
```bash
npx prisma generate
npx prisma db push
```

### 3. Add New Endpoints

Follow the layered architecture pattern:

#### Create Repository (Data Access)
```typescript
// src/repositories/yourRepository.ts
export class YourRepository {
  async findAll(): Promise<YourModel[]> {
    return prisma.yourModel.findMany();
  }
  
  async create(data: CreateYourModel): Promise<YourModel> {
    return prisma.yourModel.create({ data });
  }
}
```

#### Create Service (Business Logic)
```typescript
// src/services/yourService.ts
export class YourService {
  constructor(private repository: YourRepository) {}
  
  async getAllItems(): Promise<YourModel[]> {
    return this.repository.findAll();
  }
  
  async createItem(data: CreateYourModel): Promise<YourModel> {
    // Add business logic here
    return this.repository.create(data);
  }
}
```

#### Create Controller (HTTP Handlers)
```typescript
// src/controllers/yourController.ts
export class YourController {
  constructor(private service: YourService) {}
  
  getAll = async (req: Request, res: Response): Promise<void> => {
    const items = await this.service.getAllItems();
    res.json(ResponseHelper.success(items));
  };
  
  create = async (req: Request, res: Response): Promise<void> => {
    const item = await this.service.createItem(req.body);
    res.status(201).json(ResponseHelper.success(item));
  };
}
```

#### Add Routes
```typescript
// src/index.ts or separate router file
const yourRepository = new YourRepository();
const yourService = new YourService(yourRepository);
const yourController = new YourController(yourService);

app.get('/api/your-resource', yourController.getAll);
app.post('/api/your-resource', yourController.create);
```

### 4. Add Request Validation

Create Zod schemas and use validation middleware:

```typescript
// src/types/validation.ts
export const createYourModelSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
});

// In your route
app.post('/api/your-resource', 
  validateRequest({
    body: createYourModelSchema
  }), 
  yourController.create
);
```

### 5. API Documentation

Add Swagger documentation to your endpoints:

```typescript
/**
 * @swagger
 * /api/your-resource:
 *   get:
 *     summary: Get all items
 *     tags: [Your Resource]
 *     responses:
 *       200:
 *         description: List of items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/YourModel'
 */
```

## Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm start           # Start production server

# Code Quality
npm run lint        # Check code with ESLint
npm run lint:fix    # Fix ESLint issues automatically
npm run format      # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check  # Run TypeScript compiler check

# Database
npx prisma dev      # Start Prisma Postgres server
npx prisma generate # Generate Prisma client
npx prisma studio   # Open Prisma Studio GUI
npx prisma db push  # Push schema changes to database
npx prisma db seed  # Run database seeder (if configured)
npx prisma migrate reset # Reset database

# Docker
docker compose up -d     # Start services in background
docker compose down      # Stop all services
docker compose logs      # View logs
docker compose ps        # Check service status
```

## Project Structure

```
src/
├── controllers/    # HTTP request handlers
│   └── healthController.ts
├── services/      # Business logic layer
│   └── healthService.ts
├── repositories/  # Database access layer
│   └── healthRepository.ts
├── middlewares/   # Express middleware
│   ├── validation.ts      # Zod validation middleware
│   ├── rateLimiter.ts     # Rate limiting
│   ├── errorHandler.ts    # Error handling
│   └── logging.ts         # Request/response logging
├── types/         # TypeScript interfaces and types
│   └── index.ts
├── utils/         # Helper utilities
│   └── responseHelper.ts  # Consistent API responses
├── config/        # Configuration files
│   ├── swagger.ts         # API documentation setup
│   └── logger.ts          # Winston logging configuration
├── lib/           # External service integrations
│   └── prisma.ts          # Prisma client singleton
└── index.ts       # Express server entry point
```

## Environment Variables

```bash
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# Server
NODE_ENV="development"
PORT=3000

# Logging
LOG_LEVEL="info"  # error, warn, info, http, debug

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # requests per window
```

## Best Practices

### 1. Follow the Layered Architecture
- **Controllers**: Only handle HTTP concerns (request/response)
- **Services**: Contain all business logic
- **Repositories**: Handle only data access

### 2. Type Safety
- Use TypeScript interfaces for all data structures
- Leverage Prisma's generated types
- Validate inputs with Zod schemas

### 3. Error Handling
- Use the centralized error handler middleware
- Create custom error types for different scenarios
- Always return consistent error response format

### 4. Logging
- Use the Winston logger for all logging
- Include request IDs for traceability
- Log at appropriate levels (error, warn, info, debug)

### 5. API Design
- Follow RESTful conventions
- Document all endpoints with Swagger
- Use consistent response formats via ResponseHelper
- Implement proper HTTP status codes

### 6. Security
- Never commit secrets to version control
- Use environment variables for configuration
- Implement rate limiting for public endpoints
- Validate all inputs with Zod

## Deployment

### Docker Deployment

The template includes production-ready Dockerfiles:

```bash
# Build production image
docker build -t your-app .

# Run with docker-compose
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Environment Setup

For production, ensure these environment variables are set:
```bash
NODE_ENV=production
DATABASE_URL=<production-database-url>
LOG_LEVEL=info
PORT=3000
```

## Getting Help

- Check the [DEVELOPMENT.md](./DEVELOPMENT.md) for the complete implementation phases
- Review existing code in `src/` for examples of the layered architecture
- All endpoints are documented at `/api-docs` when the server is running
- Winston logs provide detailed debugging information

## Next Steps

After setting up your project, consider adding:
- Authentication and authorization
- Background job processing
- Caching layer (Redis integration is already included)
- Testing framework (Jest, integration tests)
- CI/CD pipeline
- Monitoring and alerting
- Performance optimization