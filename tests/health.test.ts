import request from 'supertest';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'SiteScope API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

describe('Health Endpoint', () => {
  test('GET /health should return 200 with correct structure', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('message', 'SiteScope API is running');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('version', '1.0.0');
    
    // Validate timestamp is a valid ISO string
    expect(new Date(response.body.timestamp).toISOString()).toBe(response.body.timestamp);
  });

  test('GET /health should have correct Content-Type', async () => {
    const response = await request(app).get('/health');

    expect(response.headers['content-type']).toMatch(/application\/json/);
  });
});