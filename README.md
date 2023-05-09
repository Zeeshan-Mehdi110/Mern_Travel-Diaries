# Travel Diaries

Travel Diaries is a web application that allows users to create and manage their travel diaries. This is a MERN stack project built using React, Node.js, Express, and MongoDB.

## Getting Started

To get started with this project, you can either clone the repository or download the source code as a ZIP file. Once you have the source code, follow these steps:

1. Install dependencies for the server and client:
   ```
   npm install

   cd ../client
   npm install
   ```
2. Create a `.env` file in the `server` directory and add the following environment variables:
   ```
   NODE_ENV=development
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```
3. Start the server and client:
   ```
   cd server
   npm run start

   cd ../client
   npm start
   ```
   The server will be running on `http://localhost:5000` and the client will be running on `http://localhost:3000`.

## Features

Travel Diaries has the following features:

- User authentication (signUp, login, logout)
- Create, update, and delete travel diaries
- View all travel diaries
- View travel diaries by location

## Technologies Used

This project uses the following technologies:

- React
- Node.js
- Express
- MongoDB
- Redux
- Material-UI

## Project Structure

The project is structured as follows:

```
travel-diaries/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── static/
│   │   ├── store/
│   │   ├── App.js
│   │   ├── index.js
│   ├── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── app.js
│   ├── package.json
├── .gitignore
├── README.md
```

The `client` folder contains the frontend code, while the `server` folder contains the backend code. The `public` folder in the `client` folder contains the static assets (images, fonts, etc.) for the client.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)