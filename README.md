## Description

[Nest](https://github.com/nestjs/nest): framework. TypeScript. Github Repository Query App.

## Project setup

```bash
npm install
```

## Compile and run the project

##### watch mode

```bash
npm run start:dev
```

## Run tests

##### unit tests

```bash
npm run test
```

## Docker Deployment

### 1. Build Docker Image

```bash
docker build -t github-repo-app .
```

### 2. Run Container

```bash
docker run -p 3000:3000 \
  -e GITHUB_API_URL=https://api.github.com \
  github-repo-app
```

### 3. Environment Variables

| Variable         | Required | Default | Description         |
| ---------------- | -------- | ------- | ------------------- |
| `GITHUB_API_URL` | Yes      | -       | GitHub API base URL |

### 4. Available Endpoints

- API Documentation: `http://localhost:3000/api`
- Search Repositories: `http://localhost:3000/v1/github/repositories?search=test`

## Project Documentation

### Key Features

- GitHub repository search API with sorting/filtering
- Swagger documentation
- Request validation
- Error handling middleware
- Config management
- Morgan request logging

### API Usage Example

```bash
# Search repositories containing "react"
curl "http://localhost:3000/v1/github/repositories?search=react"

# Sort results ascending
curl "http://localhost:3000/v1/github/repositories?search=react&sort=asc"

# Ignore repos containing "example"
curl "http://localhost:3000/v1/github/repositories?search=react&ignore=example"
```

### Architecture

```
src/
├── common/              # Shared utilities
│   └── middleware/      # Request handlers
├── config/              # Configuration files
├── github-search/       # Feature module
│   ├── controllers/     # API endpoints
│   ├── dto/             # Data transfer objects
│   ├── interfaces/     # Type definitions
│   └── services/        # Business logic
└── main.ts              # Application entry
```
