const { request, API_VERSION, helpers } = require("../testSetup");

describe("Authentication API Tests", () => {
  jest.setTimeout(30000);

  beforeAll(async () => {
    await helpers.createUserAndGetToken();
  });

  afterAll(async () => {
    try {
      await helpers.cleanupUsers();
    } catch (error) {
      console.error("Cleanup failed in afterAll:", error);
      // Don't throw here to avoid masking test failures
    }
  });

  test("AU01 - Authenticate user with valid credentials", async () => {
    const response = await request
      .post(`${API_VERSION}/auth`)
      .send({ email: "user@gmail.com", password: "user123" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(typeof response.body.token).toBe("string");
  });

  test("AU02 - Invalid email format", async () => {
    const response = await request.post(`${API_VERSION}/auth`).send({
      email: "invalid-email.com",
      password: "user123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/incorrect email or password/i);
  });

  test("AU03 - Non-existent email", async () => {
    const response = await request.post(`${API_VERSION}/auth`).send({
      email: "doesnotexist@gmail.com",
      password: "user123",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("AU04 - Wrong password", async () => {
    const response = await request.post(`${API_VERSION}/auth`).send({
      email: "user@gmail.com",
      password: "wrongpass",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("AU05 - Empty email field", async () => {
    const response = await request.post(`${API_VERSION}/auth`).send({
      email: "",
      password: "user123",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("AU06 - Empty password field", async () => {
    const response = await request.post(`${API_VERSION}/auth`).send({
      email: "user@gmail.com",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
