const { request, helpers } = require("../testSetup");

describe("GET USER - GET /api/v1/users", () => {
  let token;

  beforeAll(async () => {
    await helpers.createUserAndGetToken(); 
    token = await helpers.authenticateAndGetToken();
  });

  test("GU01 - Valid token", async () => {
    const res = await request
      .get("/api/v1/users")
      .set("Authorization", `${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
      email: expect.any(String),
      id: expect.any(Number),
      imageUrl: expect.any(String),
      password: expect.any(String)
      })
    );
  });

  test("GU02 - Invalid token", async () => {
    const res = await request
      .get("/api/v1/users")
      .set("Authorization", "Bearer invalidtoken");
    expect(res.status).toBe(403); 
    expect(res.body.message).toMatch(/invalid token|unauthorized/i);
  });

  test("GU03 - Missing token", async () => {
    const res = await request.get("/api/v1/users");
    expect(res.status).toBe(401); 
    expect(res.body.message).toMatch(/missing token|unauthorized/i); 
  });
});
