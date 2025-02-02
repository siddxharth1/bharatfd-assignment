# FAQ Management System

A multilingual FAQ management system with automatic translation support, built using TypeScript, React, Node.js, MongoDB, and Redis.

## Features

- ✨ Multilingual support with automatic translation
- 🚀 Real-time language switching
- 💾 Caching with Redis
- 🔄 Automatic translation during FAQ creation
- 🌐 Support for multiple languages (English, Hindi, Bengali, Spanish, French)
- 🎯 REST API with TypeScript

## Tech Stack

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Database: MongoDB
- Cache: Redis
- Translation: Google Cloud Translate API
- Docker for containerization

## Getting Started

### Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Google Cloud Translate API key

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd faq-management
```

2. Create environment files:

Backend `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/bharatfd
REDIS_URL=redis://redis:6379
GOOGLE_TRANSLATE_API_KEY=your_api_key_here
```

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

Using Docker:
```bash
docker-compose up --build
```

Manual Setup:

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd client
npm install
npm run dev
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All FAQs
```http
GET /faqs?lang={language_code}
```
- Parameters:
  - `lang` (optional): Language code (default: 'en')
- Response: `200 OK`
```json
[
  {
    "_id": "123",
    "question": "What is your return policy?",
    "answer": "You can return items within 30 days.",
    "translations": {
      "hi": {
        "question": "आपकी वापसी नीति क्या है?",
        "answer": "आप 30 दिनों के भीतर वस्तुओं को वापस कर सकते हैं।"
      }
    }
  }
]
```

#### 2. Create FAQ
```http
POST /faqs
```
- Body:
```json
{
  "question": "What is your return policy?",
  "answer": "You can return items within 30 days."
}
```
- Response: `201 Created`

#### 3. Update FAQ
```http
PUT /faqs/:id
```
- Parameters:
  - `id`: FAQ ID
- Body:
```json
{
  "question": "Updated question?",
  "answer": "Updated answer."
}
```
- Response: `200 OK`

#### 4. Get Supported Languages
```http
GET /faqs/languages
```
- Response: `200 OK`
```json
{
  "en": "English",
  "hi": "Hindi",
  "bn": "Bengali",
  "es": "Spanish",
  "fr": "French"
}
```

## Error Responses

```json
{
  "error": "Error message here"
}
```

Status Codes:
- `400`: Bad Request
- `404`: Not Found
- `500`: Server Error

## Frontend Features

### Components

1. FAQ List
- Displays all FAQs
- Supports language switching
- Expandable/collapsible answers

2. Language Selector
- Dropdown for language selection
- Real-time translation display

3. Create FAQ Form
- Input validation
- Automatic translation to all supported languages
- Error handling

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── types/         # TypeScript types
│   └── Dockerfile
│
├── client/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx       # Main component
│   └── Dockerfile
│
└── docker-compose.yml
```

## Caching Strategy

- FAQ responses cached by language (1 hour)
- Translation results cached (24 hours)
- Cache invalidation on updates
- Redis for improved performance

## Development Guidelines

1. Code Style
- Follow TypeScript best practices
- Use ESLint for code quality
- Maintain consistent formatting

2. Git Workflow
- Feature branches
- Descriptive commit messages
- Pull request reviews

3. Testing
- Write unit tests for API endpoints
- Test translations and caching
- Frontend component testing

## Security Considerations

- Input validation
- Rate limiting
- CORS configuration
- Environment variables
- Error handling

## Performance Optimization

- MongoDB indexing
- Frontend optimization
- API response compression
