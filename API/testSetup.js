const request = require('supertest');

// Base URL for the running mock server
const API_BASE_URL = 'http://localhost:3000';
const API_VERSION = '/api/v1';

// Create the request instance pointing to live server
const testRequest = request(API_BASE_URL);

// Test data (you can override this later in test files if needed)
const TEST_DATA = {
  validUser: {
    email: 'user@gmail.com',
    password: 'user123'
  },
  validCredentials: {
    email: 'user@gmail.com',
    password: 'user123'
  },
  adminKey: {
    key: 'admin' // Or whatever the delete-all endpoint expects
  }
};

// Helper functions
const helpers = {
  // Create a user and return the token
  createUserAndGetToken: async (userData = TEST_DATA.validUser) => {
    const response = await testRequest
      .post(`${API_VERSION}/users`)
      .send(userData);

    return response.body.token;
  },

  // Authenticate and get token
  authenticateAndGetToken: async (credentials = TEST_DATA.validCredentials) => {
    const response = await testRequest
      .post(`${API_VERSION}/auth`)
      .send(credentials);

    return response.body.token;
  },

  // Clean up - delete all users (if the API allows it)
  cleanupUsers: async () => {
    try {
      await testRequest
        .delete(`${API_VERSION}/users`)
        .send(TEST_DATA.adminKey);
    } catch (error) {
      // Ignore cleanup errors silently
    }
  }
};

module.exports = {
  request: testRequest,
  API_VERSION,
  helpers
};
