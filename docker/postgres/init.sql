-- PostgreSQL initialization script for SiteScope
-- This script runs when the PostgreSQL container starts for the first time

-- Create additional indexes for performance (Prisma will handle table creation)
-- These will be applied after Prisma migrations

-- Set timezone
SET timezone = 'UTC';

-- Enable extensions that might be useful for SEO crawling
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- For text search optimization

-- Log initialization
SELECT 'SiteScope PostgreSQL database initialized successfully' AS status;