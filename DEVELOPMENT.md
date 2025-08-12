# SiteScope Development Guide

SiteScope is a Node.js Express application for SEO website crawling, screenshotting, and reporting.

## Development Phases

### Phase 1: Basic Node.js Setup ✅ COMPLETED

**Objective**: Initialize Node.js project with TypeScript

#### Tasks:
- ✅ Initialize package.json
- ✅ Install TypeScript and basic dependencies
- ✅ Configure TypeScript compiler
- ✅ Create basic project structure

#### Commands:
```bash
npm init -y
npm install -D typescript @types/node ts-node nodemon
npx tsc --init
```

#### Deliverables:
- ✅ package.json with scripts (build, start, dev, type-check)
- ✅ tsconfig.json configured for Node.js development
- ✅ Basic src/ folder structure with index.ts

---

### Phase 2: Express.js Foundation (Current - 2-3 hours)

**Objective**: Set up basic Express server

#### Tasks:
- Install Express and basic middleware
- Create minimal server
- Add health check endpoint
- Configure development server

#### Commands:
```bash
npm install express cors helmet morgan dotenv
npm install -D @types/express
```

#### Deliverables:
- Working Express server on port 3000
- Basic middleware configured
- Health check endpoint responding

---

### Phase 3: Code Quality Setup (1-2 hours)

**Objective**: Configure ESLint and Prettier

#### Tasks:
- Install and configure ESLint
- Set up Prettier
- Add lint scripts to package.json
- Configure VS Code settings

#### Commands:
```bash
npm install -D eslint prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-config-prettier eslint-plugin-prettier
```

#### Deliverables:
- ESLint configuration
- Prettier configuration
- Lint scripts working

---

### Phase 4: Prisma Setup (2-3 hours)

**Objective**: Initialize Prisma ORM

#### Tasks:
- Install Prisma
- Initialize schema
- Configure database connection
- Create first model

#### Commands:
```bash
npm install prisma @prisma/client
npx prisma init
```

#### Deliverables:
- Prisma schema file
- Database connection configured
- First migration ready

---

### Phase 5: Testing Framework (2-3 hours)

**Objective**: Set up Jest testing

#### Tasks:
- Install Jest and testing utilities
- Configure test environment
- Write first test
- Add test scripts

#### Commands:
```bash
npm install -D jest @types/jest supertest @types/supertest ts-jest
```

#### Deliverables:
- Jest configuration
- Basic test structure
- Sample API test

---

### Phase 6: Docker Setup (2-3 hours)

**Objective**: Containerize application

#### Tasks:
- Create Dockerfile
- Set up docker-compose
- Configure PostgreSQL service
- Test containerized setup

#### Deliverables:
- Dockerfile
- docker-compose.yml
- Working containerized environment

---

### Phase 7: API Documentation (2 hours)

**Objective**: Set up Swagger/OpenAPI

#### Tasks:
- Install Swagger dependencies
- Configure OpenAPI spec
- Add documentation middleware
- Document existing endpoints

#### Commands:
```bash
npm install swagger-ui-express swagger-jsdoc
npm install -D @types/swagger-ui-express
```

#### Deliverables:
- Swagger UI accessible
- API documentation structure

---

### Phase 8: Input Validation (2 hours)

**Objective**: Add request validation

#### Tasks:
- Install Zod for validation
- Create validation middleware
- Add input validation to endpoints
- Error handling setup

#### Commands:
```bash
npm install zod express-rate-limit
```

#### Deliverables:
- Validation middleware
- Error handling system

---

### Phase 9: Logging & Monitoring (2 hours)

**Objective**: Add structured logging

#### Tasks:
- Install Winston or Pino
- Configure log levels
- Add request logging
- Set up log rotation

#### Commands:
```bash
npm install winston
```

#### Deliverables:
- Structured logging system
- Request/response logging

---

### Phase 10: Project Structure (2 hours)

**Objective**: Organize code into layers

#### Tasks:
- Create layered architecture
- Separate controllers, services, repositories
- Add dependency injection
- Refactor existing code

#### Deliverables:
```
src/
├── controllers/    # Request handlers
├── services/      # Business logic
├── repositories/  # Data access
├── middlewares/   # Custom middleware
├── types/         # TypeScript types
├── utils/         # Utilities
└── config/        # Configuration
```

---

### Future Feature Phases (3-4 hours each)

**Phase 11**: Basic web crawling
**Phase 12**: URL queue management
**Phase 13**: Screenshot capture
**Phase 14**: SEO analysis engine
**Phase 15**: Data storage models
**Phase 16**: REST API endpoints
**Phase 17**: Rate limiting & throttling
**Phase 18**: Error handling & retries
**Phase 19**: Reporting system
**Phase 20**: Dashboard UI

