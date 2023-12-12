const request = require('supertest');
const app = require('../App');
const User = require('../models/User');
const BudgetItem = require('../models/BudgetItem');

describe('API Routes', () => {
  let token;

  beforeAll(async () => {
    // Create a test user and get the authentication token
    const hashedPassword = await bcryptjs.hash('testpassword', 10);
    const user = new User({
      username: 'testuser',
      password: hashedPassword,
      date_created: new Date()
    });
    await user.save();

    const response = await request(app)
      .post('/api/login')
      .send({ username: 'testuser', password: 'testpassword' });

    token = response.text;
  });

  afterAll(async () => {
    // Clean up test data
    await User.deleteMany({});
    await BudgetItem.deleteMany({});
  });

  describe('POST /api/signup', () => {
    it('should create a new user', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send({ username: 'newuser', password: 'newpassword' });

      expect(response.status).toBe(201);
      expect(response.body.userId).toBeDefined();
    });

    it('should return an error if username is missing', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send({ password: 'newpassword' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Username is required');
    });

    it('should return an error if password is missing', async () => {
      const response = await request(app)
        .post('/api/signup')
        .send({ username: 'newuser' });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Password is required');
    });
  });

  describe('POST /api/login', () => {
    it('should authenticate a user and return a token', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(response.status).toBe(200);
      expect(response.text).toBeDefined();
    });

    it('should return an error if username is incorrect', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ username: 'wronguser', password: 'testpassword' });

      expect(response.status).toBe(400);
      expect(response.text).toBe('Cannot find user');
    });

    it('should return an error if password is incorrect', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ username: 'testuser', password: 'wrongpassword' });

      expect(response.status).toBe(403);
      expect(response.text).toBe('Login forbidden!');
    });
  });

  describe('POST /api/logout', () => {
    it('should log out a user', async () => {
      const response = await request(app)
        .post('/api/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.text).toBe('Logged out successfully.');
    });
  });

  describe('GET /api/protected', () => {
    it('should return protected data if user is authenticated', async () => {
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.text).toBe('Protected data.');
    });

    it('should return an error if user is not authenticated', async () => {
      const response = await request(app).get('/api/protected');

      expect(response.status).toBe(401);
      expect(response.text).toBe('Unauthorized');
    });
  });

  describe('GET /api/budget', () => {
    it('should return all budget items', async () => {
      const response = await request(app)
        .get('/api/budget')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('POST /api/budget', () => {
    it('should create a new budget item', async () => {
      const response = await request(app)
        .post('/api/budget')
        .set('Authorization', `Bearer ${token}`)
        .send({
          custom_id: 'item1',
          title: 'Item 1',
          value: 100,
          color: '#ff0000'
        });

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
    });

    it('should return an error if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/budget')
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.message).toBe('Missing required fields');
    });
  });

  describe('GET /api/invalid', () => {
    it('should return 404 for invalid endpoint', async () => {
      const response = await request(app).get('/api/invalid');

      expect(response.status).toBe(404);
      expect(response.text).toBe('Endpoint not found');
    });
  });
});