 # 🔐 RS256 JWT Authentication Example (Node.js + TypeScript)

This project demonstrates how to implement **JWT authentication using RS256 (asymmetric keys)** in a Node.js + Express app with TypeScript.

---

## ✅ Features

* RS256 JWT signing & verification
* Public/Private key-based authentication
* Express API with `/login` and `/profile` routes
* Environment variable configuration
* Secure `.gitignore` for keys & secrets

---
 
## 🔐 Generate RSA Key Pair

```bash
# Generate private key
openssl genrsa -out keys/private.key 2048

# Generate public key
openssl rsa -in keys/private.key -pubout -out keys/public.key
```

---

## ⚙️ Setup & Run

```bash
# Clone the repo
git clone https://github.com/sindhusid5/rs256-jwt-nodejs.git
cd rs256-jwt-demo

# Install dependencies
npm install

# Create .env file
echo "PRIVATE_KEY_PATH=./keys/private.key
PUBLIC_KEY_PATH=./keys/public.key
JWT_EXPIRES_IN=1h" > .env

# Start server
npx ts-node src/app.ts
```

Server runs at:
`http://localhost:3000`

---

## ▶️ API Endpoints

### **1. POST /login**

Generate a JWT token.

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"demo_user"}'
```

Response:

```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### **2. GET /profile**

Access a protected route using the token.

```bash
curl http://localhost:3000/profile \
  -H "Authorization: Bearer <your-token>"
```

Response:

```json
{
  "message": "Profile data",
  "user": {
    "username": "demo_user",
    "role": "user",
    "iat": 1700000000,
    "exp": 1700036000
  }
}
```

--- 
