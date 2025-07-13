
# t3node – TypeScript + Mongoose

**t3node** is a modular, scalable RESTful webservice built using **Node.js**, **TypeScript**, **Mongoose**,  **JWT**, and  **Swagger**,

## Installation

### Using Docker
You can run this api using Docker with a single command.
```bash
docker compose up --build
```

### Without Docker
Install project dependencies using:
```bash
npm i
```

#### Database Setup

1. **Create a MongoDB database** (locally or using a cloud service like MongoDB Atlas).
2. in .env file in root directory, configure your MongoDB connection string:
```code
DB_URL=mongodb://localhost:27017/t3node
```

#### Compilation
To compile and run the project in development mode:
```bash
npm run dev
```
This command starts the development server with hot reloading enabled .

#### Populate data
To seed the database with initial data, run the following command:

```bash
npm run seed
```
This will populate the database with required initial admin with this information
```markdown
email: 'admin@atoundji.com',
password: 'atoundji.com',
```



## Authentication & Security
This project implements a three-level security layer:
API Key (Required for all requests)
All incoming requests must include a valid x-api-key header. This key is checked against the value stored in .env.

```bash
Example:
x-api-key: aX9BtW3rYzLpM7uKfDqE0NsVjTgCHi2Z
```

### JWT Authentication
Used for protected endpoints requiring user identity:
```bash
Example:
Authorization: Bearer x-api-key: aX9BtW3rYzLpM7uKfDqE0NsVjTgCHi2Z....
```

### Basic Auth for Swagger Access
Access to the Swagger documentation is protected using Basic Authentication.
These credentials are stored in the .env file as:
```bash
DOC_USER_NAME="contact@atoundji.com"
DOC_PASSWORD="Password@1234"
```
Without valid credentials, access to the documentation will be denied.

## API Documentation
The API is documented using **Swagger (OpenAPI)**.
Once the server is running, you can access the interactive documentation in your browser at:

```
http://localhost:3000/docs
```
The documentation includes details about all available endpoints, request formats and  response types  structures.


## Project Structure
The project is organized with a clean and scalable architecture:
```
├── controllers/        # Handles HTTP requests and delegates to services
├── services/           # Business logic for each domain
├── routes/             # API endpoint definitions and route grouping
├── dto/               # TypeScript Data Transfer Objects (input/output typing)
├── entities/           # Mongoose schemas and data models
├── core/
│   ├── enums/          # Global enums used across modules
│   ├── middleware/     # Reusable Express middleware (e.g. auth, validation)
│   ├── seed/           # Seed logic and data initialization
│   ├── swagger/        # Swagger setup and configuration files
├── app.ts              # App configuration, middlewares, and routes mounting
├── main.ts             # Main entry point that starts the server
```


