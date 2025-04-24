# KwikIntent Backend API

KwikIntent is an intelligent e-commerce optimization platform that uses real-time user behavior analysis to dynamically personalize the shopping experience and improve conversion rates.

## Features

- Real-time user intent analysis based on behavioral signals
- Dynamic widget customization based on user intent
- Checkout optimization with multiple factors
- Analytics dashboard with insights and recommendations
- Public API for PDP (Product Detail Page) integration

## Tech Stack

- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/kwikthon2025-kwikintent-be.git
cd kwikthon2025-kwikintent-be
```

2. Install dependencies

```bash
npm install
# or
pnpm install
```

3. Create a .env file in the root directory with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/kwikintent
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the development server

```bash
npm run dev
# or
pnpm dev
```

## API Documentation

### Authentication

The API uses JWT for authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

### API Endpoints

#### Public Endpoints

- `POST /api/auth/login` - Login to get authentication token
- `POST /api/public/pdp/poll/:userId` - Poll for user intent on PDP

#### Protected Endpoints

Analytics:

- `GET /api/analytics/overview` - Get analytics overview
- `GET /api/analytics/intent-analysis` - Get intent analysis
- `GET /api/analytics/checkout-analysis` - Get checkout analysis
- `GET /api/analytics/insights` - Get insights and recommendations

Checkout Factors:

- `POST /api/checkout-factors` - Create checkout factor
- `GET /api/checkout-factors` - Get all checkout factors
- `GET /api/checkout-factors/:factorType` - Get specific checkout factor
- `PUT /api/checkout-factors/:factorType` - Update checkout factor

### Postman Collection

A Postman collection and environment are included in the `/postman` directory:

1. Import `KwikIntent.postman_collection.json` into Postman
2. Import `KwikIntent.postman_environment.json` into Postman
3. Update the environment variables:
   - `baseUrl`: Your API base URL (default: http://localhost:3000)
   - `token`: Your authentication token (obtained after login)

## Sample Data

The project includes seed data for testing:

- Sample users
- Intent rules
- Widgets
- Checkout factors
- Analytics data

To seed the database:

```bash
npm run seed
# or
pnpm seed
```

## Development

### Project Structure

```
.
├── app/                  # Next.js app directory (frontend components)
├── components/          # React components
├── controllers/         # API controllers
├── middleware/         # Express middleware
├── models/            # Mongoose models
├── routes/            # API routes
├── seeds/            # Seed data
├── utils/            # Utility functions
└── server.js         # Express app entry point
```

### Key Files

- `server.js` - Express application setup
- `routes/index.js` - API route registration
- `models/` - Database schema definitions
- `controllers/` - Business logic implementation
- `middleware/auth.js` - JWT authentication middleware

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
