# SiteScope — DEVELOPMENT

## Project Overview  
SiteScope is a web application designed for SEO professionals and website owners to crawl websites, capture screenshots, generate reports, and monitor SEO metrics. It supports user management, job queuing, and detailed logging, built for easy deployment with Docker.

---

## Tech Stack  
- **Backend:** Node.js with Express  
- **Database:** PostgreSQL  
- **Frontend:** React  
- **Queue:** RabbitMQ  
- **Screenshot Service:** Headless Chrome (Puppeteer)  
- **Containerization:** Docker  

---

## Features & Roadmap

### Phase 1 — MVP (Initial Features)  
- [x] Docker-compatible setup  
- [x] User Management  
  - Admin user (can create/manage users)  
  - Paid users (token system planned for later)  
- [x] REST API for all core features  
- [x] User History and Logs  
- [x] Basic UI (React)  
- [x] Queue system with RabbitMQ for crawl jobs  
- [x] Crawl functionality (fetch pages, extract SEO data)  
- [x] Screenshot pages via Puppeteer  
- [x] Basic Reporting (summary of crawl results)  
- [x] Crawl Settings (URL, depth, delay, etc.)  
- [x] Report Generator (PDF/HTML exports)  

### Phase 2 — Enhanced Features (Future)  
- Token-based paid users & billing integration  
- Advanced SEO metrics (backlinks, speed, keywords)  
- User notifications & alerts  
- Multi-user teams and permissions  
- Scheduled recurring crawls  
- More detailed analytics dashboards  

---

## Architecture Overview

```plaintext
+--------------+      +-----------------+      +--------------+
|  Frontend    | <--> |  REST API       | <--> |  PostgreSQL  |
| (React app)  |      | (Node.js/Express)|     |  (User, Crawl|
+--------------+      +-----------------+      |   Data, Logs)|
                          |       |             +--------------+
                          |       |
                     +----v-------v-----+
                     |   RabbitMQ Queue  |
                     +----+-------+-----+
                          |       |
                +---------v-+   +-v----------+
                | Crawl Worker|  | Screenshot|
                | (Node.js)  |  | Service   |
                +------------+  +-----------+
```

---

## Development Milestones & Timeline  

| Milestone               | Description                               | Status      | Notes                      |
|-------------------------|-------------------------------------------|-------------|----------------------------|
| Project setup & Docker   | Setup repo, Dockerfile, basic Express API | In Progress |                            |
| User Management API      | Admin user creation, user endpoints       | Pending     |                            |
| REST API for Crawling    | Crawl job submission, status, results     | Pending     |                            |
| RabbitMQ Queue Setup     | Job queue integration & worker             | Pending     |                            |
| Screenshot Functionality | Puppeteer integration for screenshots      | Pending     |                            |
| Frontend MVP             | Basic React UI for login, crawl submission| Pending     |                            |
| Reporting Module         | Generate and download crawl reports        | Pending     |                            |

---

## Progress Tracker  
_Update this section regularly to mark completed tasks_

- [x] Decide project name: SiteScope  
- [x] Choose tech stack  
- [x] Initial project outline and docs  
- [ ] Setup repo and Docker environment  
- [ ] Implement user management (admin & users)  
- [ ] Develop REST API endpoints for crawl jobs  
- [ ] Integrate RabbitMQ and crawl worker  
- [ ] Implement screenshot capture with Puppeteer  
- [ ] Build React frontend UI  
- [ ] Create basic reporting feature  

---

## Contribution Guidelines  
- Use feature branches for new functionality  
- Follow Node.js and React best practices  
- Write tests for API endpoints and workers  
- Update docs and this file with progress notes  

---

## Notes  
- PostgreSQL schema to be designed for users, jobs, crawl results, logs  
- RabbitMQ to handle job queuing asynchronously  
- Puppeteer will run in headless mode within Docker container  
- React UI will authenticate users, submit crawl jobs, show reports  
