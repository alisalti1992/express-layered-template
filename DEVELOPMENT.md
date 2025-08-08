# SiteScope Development Plan

## Overview
SiteScope is a web application for Move Ahead Media to crawl websites for SEO analysis, capture screenshots, and generate reports. The MVP will focus on user management and basic crawl/report features. It will be built with Laravel (backend), PostgreSQL (database), Blade (frontend), and use headless Chrome for screenshots. Docker compatibility is essential for easy deployment.

---

## Tech Stack
- Backend: Laravel (PHP)
- Database: PostgreSQL
- Frontend: Blade templating engine
- Screenshot: Headless Chrome (Puppeteer or Laravel wrapper)
- Queue System: **Not included for MVP** (planned for future)
- Containerization: Docker

---

## Features & Milestones

### Phase 1: MVP - Core User Management + Basic Crawl
- User Management
    - Admin users with ability to create/manage other users
    - Paid users (token system) **planned for later**
- Authentication (Laravel built-in auth)
- Basic Crawl Function
    - Crawl a single URL for SEO data (e.g. meta tags, headers)
    - Capture screenshot of the crawled page
- Basic Reporting UI
    - View crawl results and screenshot
- Crawl Settings (simple form for URL input)
- Dockerize the application for deployment

### Phase 2: User History and Logs
- Store crawl jobs per user
- View crawl history in UI
- Basic logs for crawling and errors

### Phase 3: REST API
- Expose endpoints for user management and crawling
- Token-based authentication for API

### Phase 4: Queue System Integration
- Implement Laravel queues (Redis or database driver)
- Async crawling jobs
- Background screenshot capture

### Phase 5: Advanced Reporting & Settings
- Advanced SEO reports (links, speed metrics)
- Customizable crawl options
- Export reports (PDF/CSV)

---

## Development Workflow
- Follow feature branch workflow: `feature/xxx`
- Pull Requests for code review before merging to `main`
- Use Git tags to mark releases (e.g. v0.1.0, v0.2.0)

---

## Current Progress Marker

| Feature                        | Status         | Notes                            |
|-------------------------------|----------------|---------------------------------|
| Project setup & Docker config  | Not started    |                                 |
| User Management               | Not started    | Admin & paid users (MVP)         |
| Authentication                | Not started    | Laravel built-in auth            |
| Basic Crawl Function          | Not started    | Single URL, SEO data extraction  |
| Screenshot Capture            | Not started    | Headless Chrome integration      |
| Basic Reporting UI            | Not started    | Show crawl results and screenshot|
| Crawl Settings               | Not started    | URL input form                   |
| User History & Logs           | Planned        | For Phase 2                     |
| REST API                     | Planned        | For Phase 3                     |
| Queue System                 | Planned        | For Phase 4                     |
| Advanced Reporting            | Planned        | For Phase 5                     |

---

## Notes
- Paid users and token-based access will be designed but deferred to later phases.
- Headless Chrome integration can be done with Laravel wrappers or external Node.js service called from Laravel.
- Focus on security, especially in user authentication and data isolation.

---