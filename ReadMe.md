
# Full Stack APP: Mongo/Mongoose Express.js React Node

## Prerequisites
Node.js (v18+ recommended)

npm (comes with Node)

MongoDB Atlas account (free tier works great)

## Installation
Clone the repo and install dependencies:

bash
git clone https://github.com/your-username/full-stack-mongo.git
cd full-stack-mongo
npm install
This installs root dev tools (like concurrently) and ensures both client and server can be run together.

Environment Variables
Create a .env file inside the server folder:

env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/demo
PORT=4000
Replace <username> and <password> with your Atlas database user credentials.

## Running the App
Start both client and server with one command:

bash
npm run dev
Client (React + Vite) → runs on http://localhost:5173

Server (Express + Mongoose) → runs on http://localhost:4000

## API Endpoints
GET /api/users → fetch all users

POST /api/users → add a new user

Example Request
bash
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Paul","email":"paul@example.com"}'