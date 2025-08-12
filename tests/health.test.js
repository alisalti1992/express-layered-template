"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
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
        const response = await (0, supertest_1.default)(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'OK');
        expect(response.body).toHaveProperty('message', 'SiteScope API is running');
        expect(response.body).toHaveProperty('timestamp');
        expect(response.body).toHaveProperty('version', '1.0.0');
        // Validate timestamp is a valid ISO string
        expect(new Date(response.body.timestamp).toISOString()).toBe(response.body.timestamp);
    });
    test('GET /health should have correct Content-Type', async () => {
        const response = await (0, supertest_1.default)(app).get('/health');
        expect(response.headers['content-type']).toMatch(/application\/json/);
    });
});
//# sourceMappingURL=health.test.js.map