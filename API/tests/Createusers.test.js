const { request, API_VERSION, helpers } = require("../testSetup");

describe("CREATE USER - POST /api/v1/users", () => {
  jest.setTimeout(30000);
  
  beforeAll(async () => {
    // Check if server is running
    try {
      await request.get('/health').timeout(5000);
    } catch (error) {
      console.error('Server is not running! Please start your server first.');
      console.error('Run: npm start (or node server.js) in another terminal');
      throw new Error('Server not available');
    }
  });
  
  afterAll(async () => {
    try {
      await helpers.cleanupUsers();
    } catch (error) {
      console.error("Cleanup failed in afterAll:", error);
    }
  });

  test("CU01 - Valid credentials", async () => {
    try {
      const response = await request
        .post(`${API_VERSION}/users`)
        .send({
          name: "Habiba Behairy",
          email: "behairy14@gmail.com",
          password: "password12345",
        });
      
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toMatch(/User registered with success/i);
      expect(response.body).toHaveProperty("token");
      expect(typeof response.body.token).toBe("string");
    } catch (err) {
      console.error("Test CU01 failed:", err);
      throw err;
    }
  });

  test("CU02 - Missing name", async () => {
    try {
      const response = await request
        .post(`${API_VERSION}/users`)
        .send({
          email: "test1@gmail.com",
          password: "password123",
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    } catch (err) {
      console.error("Test CU02 failed:", err);
      throw err;
    }
  });

  test("CU03 - Missing email", async () => {
    try {
      const response = await request
        .post(`${API_VERSION}/users`)
        .send({
          name: "Test User",
          password: "password123",
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    } catch (err) {
      console.error("Test CU03 failed:", err);
      throw err;
    }
  });

  test("CU04 - Missing password", async () => {
    try {
      const response = await request
        .post(`${API_VERSION}/users`)
        .send({
          name: "Test User",
          email: "noPassword@gmail.com",
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    } catch (err) {
      console.error("Test CU04 failed:", err);
      throw err;
    }
  });

  test("CU05 - Invalid email format", async () => {
    try {
      const response = await request
        .post(`${API_VERSION}/users`)
        .send({
          name: "Test User",
          email: "invalid-email",
          password: "password123",
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    } catch (err) {
      console.error("Test CU05 failed:", err);
      throw err;
    }
  });

  test("CU06 - Email already exists", async () => {
    try {
      // Create first user
      await request
        .post(`${API_VERSION}/users`)
        .send({
          name: "Duplicate",
          email: "dupe@gmail.com",
          password: "password123",
        });

      // Try to create second user with same email
      const response = await request
        .post(`${API_VERSION}/users`)
        .send({
          name: "Another",
          email: "dupe@gmail.com",
          password: "password123",
        });
      
      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty("message");
    } catch (err) {
      console.error("Test CU06 failed:", err);
      throw err;
    }
  });

  test("CU07 - Password too short", async () => {
    try {
      const response = await request
        .post(`${API_VERSION}/users`)
        .send({
          name: "ShortPass",
          email: "shortpass@gmail.com",
          password: "123",
        });
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message");
    } catch (err) {
      console.error("Test CU07 failed:", err);
      throw err;
    }
  });
});