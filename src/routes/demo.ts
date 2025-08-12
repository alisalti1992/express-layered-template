import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middlewares/validation';
import { ApiResponseUtils } from '../utils/apiResponse';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();

// Demo validation schemas
const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  email: z.string().email('Invalid email format'),
  age: z.number().int().min(18, 'Must be at least 18').max(120, 'Invalid age'),
  website: z.string().url('Invalid URL format').optional(),
});

const getUserParamsSchema = z.object({
  id: z.string().uuid('Invalid user ID format'),
});

const paginationSchema = z.object({
  page: z.coerce.number().int().min(1, 'Page must be positive').default(1),
  limit: z.coerce.number().int().min(1).max(100, 'Limit must be between 1-100').default(10),
  search: z.string().optional(),
});

/**
 * @swagger
 * /api/demo/users:
 *   post:
 *     summary: Create a new user (demo endpoint)
 *     description: Demo endpoint showing request validation with Zod
 *     tags: [Demo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               age:
 *                 type: integer
 *                 minimum: 18
 *                 maximum: 120
 *                 description: User's age
 *               website:
 *                 type: string
 *                 format: uri
 *                 description: User's website URL (optional)
 *           example:
 *             name: "John Doe"
 *             email: "john@example.com"
 *             age: 30
 *             website: "https://johndoe.com"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     age:
 *                       type: integer
 *                     website:
 *                       type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       422:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post(
  '/users',
  validateRequest({ body: createUserSchema }),
  asyncHandler(async (req, res) => {
    const userData = req.body;
    
    // Simulate user creation
    const newUser = {
      id: crypto.randomUUID(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    
    ApiResponseUtils.success(res, newUser, 'User created successfully', 201);
  })
);

/**
 * @swagger
 * /api/demo/users/{id}:
 *   get:
 *     summary: Get user by ID (demo endpoint)
 *     description: Demo endpoint showing URL parameter validation
 *     tags: [Demo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: User UUID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     age:
 *                       type: integer
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       422:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get(
  '/users/:id',
  validateRequest({ params: getUserParamsSchema }),
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    // Simulate user lookup
    const user = {
      id,
      name: 'Jane Doe',
      email: 'jane@example.com',
      age: 28,
    };
    
    ApiResponseUtils.success(res, user, 'User retrieved successfully');
  })
);

/**
 * @swagger
 * /api/demo/users:
 *   get:
 *     summary: List users with pagination (demo endpoint)
 *     description: Demo endpoint showing query parameter validation and pagination
 *     tags: [Demo]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term (optional)
 *     responses:
 *       200:
 *         description: Users list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       422:
 *         $ref: '#/components/responses/BadRequest'
 */
router.get(
  '/users',
  validateRequest({ query: paginationSchema }),
  asyncHandler(async (req, res) => {
    const { page, limit, search } = req.query;
    
    // Simulate users list with pagination
    const users = [
      { id: crypto.randomUUID(), name: 'Alice Smith', email: 'alice@example.com' },
      { id: crypto.randomUUID(), name: 'Bob Johnson', email: 'bob@example.com' },
    ];
    
    const filteredUsers = search && typeof search === 'string' 
      ? users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())) 
      : users;
    
    const result = {
      users: filteredUsers,
      pagination: {
        page: page || 1,
        limit: limit || 10,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / (typeof limit === 'number' ? limit : 10)),
      },
    };
    
    ApiResponseUtils.success(res, result, 'Users retrieved successfully');
  })
);

export default router;