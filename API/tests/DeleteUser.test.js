const { request, helpers, API_VERSION } = require("../testSetup");

describe("DELETE USER - DELETE /api/v1/users", () => {
   beforeAll(async () => {
      await helpers.createUserAndGetToken(); 
      token = await helpers.authenticateAndGetToken();
  });
  test("DU01 - Valid token", async () => {
    const res = await request
      .delete("/api/v1/users")
      .set("Authorization", `${token}`);
    expect(res.statusCode).toBe(200);
  });

  test("DU02 - Invalid token", async () => {
    const res = await request
      .delete("/api/v1/users")
      .set("Authorization", "Bearer INVALID_TOKEN");
    expect(res.statusCode).toBe(403);
  });

  test("DU03 - Missing token", async () => {
    const res = await request.delete("/api/v1/users");
    expect(res.statusCode).toBe(401);
  });
});
