const { request, helpers } = require("../testSetup");

describe("UPDATE USER - PATCH /api/v1/users", () => {
  let token;

  beforeAll(async () => {
    await helpers.createUserAndGetToken(); 
    token = await helpers.authenticateAndGetToken();
  });

  test("PU01 - Update all fields", async () => {
    const res = await request
      .patch("/api/v1/users")
      .set("Authorization", `${token}`)
      .send({
        name: "Habiba Elbehairy",
        email: "HabibaElbehairy@gmail.com",
        password: "HabibaElbehairy123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "User updated with success!");
    expect(res.body).toHaveProperty("data");
  });

  test("PU02 - Update only name", async () => {
    const res = await request
      .patch("/api/v1/users")
      .set("Authorization", `${token}`)
      .send({ name: "Bebo" });
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toHaveProperty("message", "User updated with success!");
  });

  test("PU03 - Update only email", async () => {
    const res = await request
      .patch("/api/v1/users")
      .set("Authorization", `${token}`)
      .send({ email: "bebo@gmail.com" });
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toHaveProperty("message", "User updated with success!");
  });

  test("PU04 - Update only password", async () => {
    const res = await request
      .patch("/api/v1/users")
      .set("Authorization", `${token}`)
      .send({ password: "Habibapassword123" });
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toHaveProperty("message", "User updated with success!");
  });

  test("PU05 - Invalid email format", async () => {
    const res = await request
      .patch("/api/v1/users")
      .set("Authorization", `${token}`)
      .send({ email: "not-an-email" });
    expect(res.statusCode).toBe(400);
  });

  test("PU06 - Email already exists", async () => {
    await request.post("/api/v1/users").send({
      name: "Another",
      email: "existingemail@gmail.com",
      password: "test1234",
    });

    const res = await request
      .patch("/api/v1/users")
      .set("Authorization", `${token}`)
      .send({ email: "existingemail@gmail.com" });
    expect(res.statusCode).toBe(409);
  });

  test("PU07 - Invalid token", async () => {
    const res = await request
      .patch("/api/v1/users")
      .set("Authorization", `Bearer invalid_token`)
      .send({ name: "Invalid" });
    expect(res.statusCode).toBe(401);
  });

  test("PU08 - Empty request body", async () => {
    const res = await request
      .patch("/api/v1/users")
      .set("Authorization", `${token}`)
      .send({});
    expect(res.statusCode).toBe(400);
  });
});
