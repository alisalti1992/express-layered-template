# SiteScope

SiteScope is a web application for SEO professionals to crawl websites, capture screenshots, generate SEO reports, and monitor website performance. Built with Node.js, React, PostgreSQL, and RabbitMQ, it is designed for easy deployment with Docker.

## Features

- User Management (Admin and Users)
- Crawl Websites for SEO data
- Screenshot pages using headless Chrome (Puppeteer)
- Job queue system with RabbitMQ
- Basic Reporting and report generation (PDF/HTML)
- User History and Logs
- REST API backend
- React-based User Interface
- Crawl Settings customization

## Tech Stack

- Backend: Node.js with Express  
- Frontend: React  
- Database: PostgreSQL  
- Queue: RabbitMQ  
- Screenshot service: Puppeteer (headless Chrome)  
- Containerization: Docker  

## Installation

### Prerequisites

- Docker & Docker Compose installed  
- Node.js and npm (for local development without Docker)  
- PostgreSQL instance (if not using Dockerized one)

### Using Docker

1. Clone the repository  
```bash
git clone https://your-repo-url.git
cd sitescope
```

2. Build and start containers  
```bash
docker-compose up --build
```

3. Access the app UI at `http://localhost:3000` (default)

### Local Development (Without Docker)

1. Backend setup  
```bash
cd backend
npm install
npm run dev
```

2. Frontend setup  
```bash
cd frontend
npm install
npm start
```

3. Make sure PostgreSQL and RabbitMQ are running locally or via Docker.

## Usage

- Admin users can create and manage users via the UI or API.  
- Users can submit crawl jobs with specific settings.  
- Crawl jobs run asynchronously using RabbitMQ queue.  
- Crawled pages are captured, screenshots taken, and data stored.  
- Reports can be viewed and exported from the UI.

## API Overview

- `/api/auth` - Authentication endpoints  
- `/api/users` - User management (admin only)  
- `/api/crawls` - Submit crawl jobs, check status, get results  
- `/api/reports` - Generate and download reports

(Full API documentation to be added)

## Roadmap

- Token-based paid users and billing integration  
- Advanced SEO metrics and analytics  
- Scheduled recurring crawls  
- Multi-user teams and permissions  
- Enhanced reporting and notifications

## Contributing

Contributions are welcome! Please fork the repo, create feature branches, and submit pull requests. Follow coding standards and write tests.

## License

[MIT License](LICENSE)

---
