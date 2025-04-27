# Rewardify Frontend

Rewardify is a **React.js** frontend that allows users to create, track, and complete personal challenges powered by AI-generated plans.  
Seamlessly integrates with the Rewardify API backend.


**Frontend Repository:** https://github.com/dvolynov/Rewardify-App  
**Backend Repository:** https://github.com/dvolynov/Rewardify


[🚀TEST THE APP](https://rewardify-hack-9862f082da4d.herokuapp.com/)   
[📚GO TO API](https://rewardify-api-f36c675ae5dc.herokuapp.com/docs)


## 📂 Project Structure

```
src/
├── api/
│   └── (API connection utilities)
├── assets/
│   └── (images like logo and hero-image)
├── components/
│   └── ui/
│       └── SidebarToggleButton.jsx
├── features/
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── LoadingIndicator.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── SidebarToggleButton.jsx
│   │   └── pages/
│   │       ├── Account.jsx
│   │       ├── Challenge.jsx
│   │       ├── Detail.jsx
│   │       ├── Help.jsx
│   │       ├── Notifications.jsx
│   │       ├── Stats.jsx
│   │       └── Today.jsx
│   ├── landing/
│   │   ├── components/
│   │   │   ├── Countries.jsx
│   │   │   └── Navbar.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Landing.jsx
│   ├── Login.jsx
│   └── Signup.jsx
├── styles/
│   ├── Dashboard.css
│   ├── Landing.css
│   └── Sidebar.css
├── utils/
│   └── get_color.js
├── App.jsx
├── index.js
├── reportWebVitals.js
├── setupTests.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
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

## 📚 Main Pages Overview

| Page         | URL Path             | Purpose                                   |
|:-------------|:---------------------|:-----------------------------------------|
| Landing      | `/`                   | Landing page with intro and CTA          |
| Login        | `/login`              | User authentication                      |
| Signup       | `/signup`             | User registration                        |
| Dashboard    | `/app/challenge`      | User challenges overview                 |
| Challenge    | `/app/challenge/:hash`| Detailed view and milestone tracking     |
| Account      | `/app/account`        | Manage profile, password, and country    |
| Help         | `/app/help`           | FAQ and help section                     |


## 🛠 Built With

- React 18
- React Router 6
- Axios
- Bootstrap 5
- JavaScript ES6+
- Vite / Create React App

## 📄 License

Rewardify Frontend is licensed under the **MIT License**.
