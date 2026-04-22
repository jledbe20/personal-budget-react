# Personal Budget React

React version of the Personal Budget class project. It combines a React frontend with an Express/Mongoose API, JWT authentication, and budget visualizations.

## Features

- React single-page frontend with routed pages.
- Signup and login API routes.
- JWT-protected demo endpoint.
- MongoDB persistence through Mongoose.
- Budget item read/create/delete API.
- Chart.js, React Chart.js, and D3 budget visualizations.
- Express server can serve the production React build.

## Stack

- React 18
- React Router
- Sass
- Axios
- Chart.js / react-chartjs-2
- D3
- Node.js
- Express
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Tokens

## Project Structure

```text
src/App.js                  React route layout
src/pages/                  React page components
src/pages/Data/Data.js      Budget API client
src/server/server.js        Express server entry point
src/server/routes.js        API routes
src/server/models/          Mongoose models
src/server/json/            Sample JSON budget data
public/                     Static CRA public assets
build/                      Production build output
```

## Frontend Routes

```text
/about
/signup
/login
/contact
/chart
/d3_chart
/bar_chart
/dashboard
```

## API Routes

```text
POST   /api/signup       Creates a user with a hashed password
POST   /api/login        Logs in and returns a JWT
POST   /api/logout       Demo logout route
GET    /api/protected    JWT-protected demo route
GET    /api/budget       Returns budget items from MongoDB
POST   /api/budget       Creates a budget item
DELETE /api/budget/:id   Deletes a budget item
```

## Environment

The server expects these environment variables:

```text
MONGO_URI
TOKEN_SECRET
PORT
```

`PORT` defaults to `5000`.

## Run Locally

Start the React development server:

```powershell
npm install
npm start
```

Start the Express API server in another terminal:

```powershell
node src\server\server.js
```

Open:

```text
http://localhost:3000
```

The React development server proxies API requests to:

```text
http://localhost:5000
```

## Notes

- Do not publish real `.env` values or database credentials.
- `src/server/server.js` contains a fallback MongoDB URI; move deployment-specific configuration to environment variables before making the repo public.
