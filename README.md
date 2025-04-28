# Rewardify Frontend

Rewardify is a **React.js** frontend that allows users to create, track, and complete personal challenges powered by AI-generated plans.  
Seamlessly integrates with the Rewardify API backend.


**Frontend Repository:** https://github.com/dvolynov/Rewardify-App  
**Backend Repository:** https://github.com/dvolynov/Rewardify


[🚀TEST THE APP](https://rewardify-hack-9862f082da4d.herokuapp.com/)   
[📚GO TO API](https://rewardify-api-f36c675ae5dc.herokuapp.com/docs)


## 📂 Project Structure

```
├── public/                # Static public files
├── src/                   # Source code
├── ├── api/               # API connection utilities
├── ├── assets/            # Static assets (images, icons)
├── ├── components/        # Reusable UI components
├── ├── features/          # Feature-specific components and logic
├── ├── pages/             # Route-level pages
├── ├── styles/            # CSS and styling files
├── ├── utils/             # Utility functions and helpers
├── ├── App.jsx            # Root React component
├── ├── index.js           # Application entry point
├── ├── reportWebVitals.js # Web vitals reporting
├── └── setupTests.js      # Testing setup file
├── .env                   # Environment variables
├── .gitignore             # Git ignored files list
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Exact versions of installed dependencies
└── README.md              # Project documentation
```

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/dvolynov/Rewardify-App.git
cd Rewardify-App
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Configure environment

Create a `.env` file:

```dotenv
# .env
REACT_APP_API_BASE=https://rewardify-api-f36c675ae5dc.herokuapp.com/api
```

> Make sure this points to the deployed backend!

### 4. Start the development server

```bash
npm run start
# or
yarn start
```

Runs on [http://localhost:3000](http://localhost:3000)


## 🛠 Built With

- React 19
- React Router 6
- Axios
- Bootstrap 5
- JavaScript ES6+

## 📄 License

Rewardify Frontend is licensed under the **MIT License**.
