const bcrypt = require("bcrypt");

const users = [
  {
    email: "demo@example.com",
    password: "demo123", // Will be hashed by the model pre-save hook
    name: "Demo User",
    company: "Demo Store",
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
];

module.exports = users;
