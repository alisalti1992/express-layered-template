# SiteScope

SiteScope is a web application for crawling websites, capturing screenshots, and generating SEO reports. Built for Move Ahead Media, it provides an easy-to-use platform to analyze websites for SEO optimization.

---

## Features (MVP)
- User Management with Admin and Paid Users (token system planned)
- Basic website crawl for SEO metadata
- Screenshot capture of crawled pages using headless Chrome
- Simple reporting UI
- Crawl settings with URL input
- Docker compatible for easy deployment

---

## Tech Stack
- Backend: Laravel (PHP)
- Database: PostgreSQL
- Frontend: Blade
- Screenshot service: Headless Chrome
- Containerization: Docker

---

## Installation

### Requirements
- PHP >= 8.x
- Composer
- PostgreSQL
- Docker & Docker Compose (optional for containerized setup)
- Node.js & npm (for headless Chrome setup if using Node service)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/your-org/sitescope.git
   cd sitescope
   ```

2. Install PHP dependencies
   ```bash
   composer install
   ```

3. Setup environment variables  
   Copy `.env.example` to `.env` and configure your database and app settings.

4. Generate app key
   ```bash
   php artisan key:generate
   ```

5. Run migrations
   ```bash
   php artisan migrate
   ```

6. Run the application
   ```bash
   php artisan serve
   ```

7. (Optional) Run headless Chrome screenshot service or configure your Laravel integration.

---

## Usage

- Admin users can create and manage other users.
- Users can input URLs to crawl and view SEO reports and screenshots.
- Reports and crawl history will be available in the user interface.

---

## API

*API endpoints planned for future releases.*

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## License

MIT License

---