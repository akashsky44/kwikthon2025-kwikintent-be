const bcrypt = require("bcrypt");

// Users will be created with merchant reference in index.js
const users = [
  {
    email: "demo@example.com",
    password: "demo123", // Will be hashed by the model pre-save hook
    role: "user",
    settings: {
      defaultCurrency: "USD",
      timezone: "America/New_York",
      notificationPreferences: {
        email: true,
        dashboard: true,
      },
    },
    isActive: true,
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    settings: {
      defaultCurrency: "USD",
      timezone: "UTC",
      notificationPreferences: {
        email: true,
        dashboard: true,
      },
    },
    isActive: true,
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = users;
