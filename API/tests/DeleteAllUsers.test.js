const { request, helpers, API_VERSION } = require("../testSetup");

describe("DELETE ALL USERS - DELETE /api/v1/all-users", () => {
  beforeAll(async () => {
    await helpers.createUserAndGetToken(); // Ensure there's at least one user
  });

  afterAll(async () => {
    await helpers.cleanupUsers();
  });

  test("DA01 - Valid admin key", async () => {
    const res = await request
      .delete(`${API_VERSION}/all-users`)
      .send({ key_admin: "keyadmin123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Users deleted with success/i);
  });

  test("DA02 - Invalid admin key 'no permision for deletion '", async () => {
    const res = await request
      .delete(`${API_VERSION}/all-users`)
      .send({ key_admin: "INVALID_ADMIN_KEY" }); // Changed to use .send() for consistency
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/Unauthorized access/i);
  });

  test("DA03 - Missing admin key", async () => {
    const res = await request.delete(`${API_VERSION}/all-users`);
    expect(res.statusCode).toBe(401); 
    expect(res.body.message).toMatch(/Authentication required|Missing admin key/i);
  });
});