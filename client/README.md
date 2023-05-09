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

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
