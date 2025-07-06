const { request, API_VERSION, helpers } = require("../testSetup");

describe("Authentication API Tests", () => {
  beforeAll(async () => {
    await helpers.createUserAndGetToken(); 
  });

  describe("POST /api/v1/auth - User Authentication", () => {
    test("AU01 - Authenticate user with valid credentials", async () => {
      const response = await request
        .post(`${API_VERSION}/auth`)
        .send({ email: "user@gmail.com", password: "user123" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    });

    test("AU02 - Invalid email format", async () => {
      const res = await request.post(`${API_VERSION}/auth`).send({
        email: "invalid-email.com",
        password: "user123",
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/incorrect email or password/i);
    });

    test("AU03 - Non-existent email", async () => {
      const res = await request.post(`${API_VERSION}/auth`).send({
        email: "doesnotexist@gmail.com",
        password: "user123",
      });
      expect(res.status).toBe(401);
    });

    test("AU04 - Wrong password", async () => {
      const res = await request.post(`${API_VERSION}/auth`).send({
        email: "user@gmail.com",
        password: "wrongpass",
      });
      expect(res.status).toBe(401);
    });

    test("AU05 - Empty email field", async () => {
      const res = await request.post(`${API_VERSION}/auth`).send({
        email: "",
        password: "user123",
      });
      expect(res.status).toBe(400 );
    });

    test("AU06 - Empty password field", async () => {
      const res = await request.post(`${API_VERSION}/auth`).send({
        email: "user@gmail.com",
        password: "",
      });
      expect(res.status).toBe(400);
    });
  });
});
