const { request, API_VERSION } = require("../testSetup");

describe("CREATE USER - POST /api/v1/users", () => {
  test("CU01 - Valid credentials", async () => {
    const res = await request.post(`${API_VERSION}/users`).send({
      name: "Habiba Behairy",
      email: "behairy14@gmail.com",
      password: "password12345",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/User registered with success/i);
    expect(res.body).toHaveProperty("token");
  });

  test("CU02 -  Missing name", async () => {
    const res = await request.post(`${API_VERSION}/users`).send({
      email: "test1@gmail.com",
      password: "password123",
    });
    expect(res.status).toBe(400);
  });

  test("CU03 -  Missing email", async () => {
    const res = await request.post(`${API_VERSION}/users`).send({
      name: "Test User",
      password: "password123",
    });
    expect(res.status).toBe(400);
  });

  test("CU04 - Missing password", async () => {
    const res = await request.post(`${API_VERSION}/users`).send({
      name: "Test User",
      email: "noPassword@gmail.com",
    });
    expect(res.status).toBe(400);
  });

  test("CU05 - Invalid email format", async () => {
    const res = await request.post(`${API_VERSION}/users`).send({
      name: "Test User",
      email: "invalid-email",
      password: "password123",
    });
    expect(res.status).toBe(400);
  });

  test("CU06 - Email already exists", async () => {
    await request.post(`${API_VERSION}/users`).send({
      name: "Duplicate",
      email: "dupe@gmail.com",
      password: "password123",
    });

    const res = await request.post(`${API_VERSION}/users`).send({
      name: "Another",
      email: "dupe@gmail.com",
      password: "password123",
    });
    expect(res.status).toBe(409);
  });

  test("CU07 - Password too short", async () => {
    const res = await request.post(`${API_VERSION}/users`).send({
      name: "ShortPass",
      email: "shortpass@gmail.com",
      password: "123",
    });
    expect(res.status).toBe(400);
  });
});
