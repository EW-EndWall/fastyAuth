# API Documentation for fastyAuth

## Overview

This API provides endpoints for user registration, login, and profile management. The data is stored in MongoDB, and all inputs are validated for security and integrity. The API is implemented using Node.js and Fastify, with JWT for authentication. With multi-language support, return messages are supported in different languages.

### Base URL

```bash
http://localhost:3000/api/v1
```

### Endpoints

## User Login

Endpoint: POST /v1/auth/login

Logs in a user and returns a JWT token.

### Request:

- Method: POST
- URL: /v1/auth/login
- Headers:
  - Content-Type: application/json
- Body (JSON):

#### One of

- username
- email
- phone

```json
{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "phone": "01234567890",
  "password": "SecurePass123!",
  "rememberMe": true
}
```

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "message": "Login successful.",
  "token": "jwt_token_here",
  "username": "john_doe",
  "details": {
    "language": "EN_en",
    "translationLanguage": "RU_ru"
  }
}
```

## User Registration

Endpoint: POST /v1/auth/register

Registers a new user with the provided information.

### Request:

- Method: POST
- URL: /v1/auth/register
- Headers:
  - Content-Type: application/json
- Body (JSON):

```json
{
  "username": "john_doe",
  "password": "SecurePass123!",
  "contact": {
    "email": "john.doe@example.com",
    "phone": "01234567890"
  },
  "details": {
    "firstName": "John",
    "lastName": "Doe",
    "birthdate": "1990-01-01",
    "country": "USA",
    "language": "EN_en",
    "translationLanguage": "RU_ru"
  }
}
```

### Response:

- Status: 201 Created
- Body (JSON):

```json
{
  "message": "User registered successfully."
}
```

## Password Reset

Endpoint: POST /v1/auth/reset-password

A reset code is sent to reset the user password.

### Request:

- Method: POST
- URL: /v1/auth/reset-password
- Headers:
  - Content-Type: application/json
- Body (JSON):

#### One of

- email
- phone

```json
{
  "email": "john.doe@example.com",
  "phone": "01234567890"
}
```

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "message": "Password reset code sent."
}
```

## Password Reset

Endpoint: POST /v1/auth/reset-password-update

The code sent to reset the user password is verified.

### Request:

- Method: POST
- URL: /v1/auth/reset-password-update
- Headers:
  - Content-Type: application/json
- Body (JSON):

#### One of

- email
- phone

```json
{
  "email": "john.doe@example.com",
  "phone": "01234567890",
  "verifyCode": "123456",
  "password": "SecurePass123!"
}
```

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "message": "Password reset successfully"
}
```

---

## Get User Profile

Endpoint: GET /v1/account/profile

Returns the profile of the authenticated user.

### Request:

- Method: GET
- URL: /v1/account/profile
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer jwt_token_here
  - Accept-Language: en

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "newToken": "jwt_token_here",
  "userId": "012345678912345",
  "username": "john_doe",
  "contact": {
    "email": "john.doe@example.com",
    "phone": "01234567890"
  },
  "details": {
    "firstName": "John",
    "lastName": "Doe",
    "birthdate": "1990-01-01",
    "country": "USA",
    "language": "English",
    "translationLanguage": "Spanish"
  },
  "status": {
    "accountStatus": "active",
    "systemStatus": "active"
  },
  "verify": {
    "verificationType": {
      "emailVerified": true,
      "phoneVerified": true
    }
  },
  "createdAt": "2024-07-10T10:00:00Z"
}
```

## Update User Profile

Endpoint: PATCH /v1/account/profile

Updates the profile of the authenticated user. Only the fields provided in the request body will be updated.

### Request:

- Method: PATCH
- URL: /v1/account/profile
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer jwt_token_here
  - Accept-Language: en
- Body (JSON):

```json
{
  "username": "john_doe",
  "contact": {
    "email": "john.doe@example.com",
    "phone": "01234567890"
  }
}
```

all

```json
{
  "username": "john_doe",
  "contact": {
    "email": "john.doe@example.com",
    "phone": "01234567890"
  },
  "details": {
    "firstName": "John",
    "lastName": "Doe",
    "birthdate": "1990-01-01",
    "country": "USA",
    "language": "English",
    "translationLanguage": "Spanish"
  }
}
```

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "message": "The update was successful."
}
```

## Update Password

Endpoint: PATCH /v1/account/update-password

Updating the user account password.

### Request:

- Method: PATCH
- URL: /v1/account/update-password
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer jwt_token_here
  - Accept-Language: en
- Body (JSON):

```json
{
  "password": "SecurePass123!",
  "newPassword": "SecurePass123!"
}
```

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "message": "Password updated."
}
```

## Update Account Status

Endpoint: PATCH /v1/account/status

Update user account status.

### Request:

- Method: PATCH
- URL: /v1/account/status
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer jwt_token_here
  - Accept-Language: en
- Body (JSON):

```json
{
  "accountStatus": "active"
}
```

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "message": "Account status updated."
}
```

## Account Verify Code

Endpoint: GET /v1/account/verify

User information verification code.

### Request:

- Method: GET
- URL: /v1/account/verify
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer jwt_token_here
  - Accept-Language: en
- Querystring:

```bash
 http://localhost:3000/api/v1/account/verify?verificationType="email"
```

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "message": "Verification code has been sent."
}
```

## Account Verify

Endpoint: POST /v1/account/verify

User information verification.

### Request:

- Method: POST
- URL: /v1/account/verify
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer jwt_token_here
  - Accept-Language: en
- Body (JSON):

```json
{
  "verifyCode": "123456"
}
```

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "message": "Verification successful."
}
```

## Account Delete

Endpoint: DELETE /v1/account/profile

Delete user account

### Request:

- Method: DELETE
- URL: /v1/account/profile
- Headers:
  - Content-Type: application/json
  - Authorization: Bearer jwt_token_here
  - Accept-Language: en
- Body (JSON):

```json
{
  "verifyCode": "123456"
}
```

### Response:

- Status: 200 OK
- Body (JSON):

```json
{
  "message": "The user deletion process has been completed successfully."
}
```

# Validation

1. Headers:

   - Ensure Content-Type is application/json for requests.
   - Ensure Authorization header is present for protected routes.

2. User Fields:

   - username: Alphanumeric characters only.
   - password: Minimum 8 characters, at least one letter and one number.
   - contact
     - email: Valid email format.
     - phone: Valid phone number format.
   - details
     - firstName:
     - lastName:
     - birthdate: Valid date format (YYYY-MM-DD).
     - country: Non-empty string.
     - language: Non-empty string and min-max length 5.
     - translationLanguage: Non-empty string and min-max length 5.
   - status
     - accountStatus: active or passive
   - verify
     - accountStatus: true or false
     - systemStatus: true or false

3. Security:

   - Use HTTPS for secure communication.
   - Store tokens securely.

# Error Handling

- 400 Bad Request: Invalid input data.
- 401 Unauthorized: Missing or invalid JWT token.
- 404 Not Found: Resource not found.
- 500 Internal Server Error: Unexpected server error.

## Example Error Response

```json
{
  "statusCode": 400,
  "error": ["Invalid email format"]
}
```
