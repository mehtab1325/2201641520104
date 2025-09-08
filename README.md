# URL Shortener – React App

A simple, client-side URL Shortener built with React. This application allows users to shorten long URLs and stores them locally for quick access.

---

## 🚀 Features

- Shorten long URLs quickly.
- Stores data in browser's *localStorage*.
- Includes a statistics page for tracking shortened URLs.
- Logging middleware support for debugging.
- Lightweight and fast – runs entirely in the browser.

---

## 🛠 Installation & Setup

1. *Install dependencies*:
   bash
   npm install
   

2. *Start the development server*:
   bash
   npm start
   

3. Open the app in your browser:
   
   http://localhost:3000
   

---

## 📂 Project Structure


url-shortener/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── RedirectHandler.jsx
│   │   ├── ShortenedList.jsx
│   │   ├── ShortenerForm.jsx
│   │   └── StatsPage.jsx
│   ├── utils/
│   │   ├── loggingMiddleware.js
│   │   ├── shortcode.js
│   │   └── storage.js
│   ├── App.jsx
│   └── index.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


---

## ⚠ Important Notes

- Replace src/utils/loggingMiddleware.js with your *real logging middleware* (as per test requirements).
- Do **not use console.log** for logging during testing (it's restricted).
- Data is stored under the key:
  
  url_shortener_data_v1
  

---

## 🧪 Testing Guidelines

- Ensure the logging middleware is properly configured.
- Verify localStorage data is persistent across sessions.
- Test URL redirection and statistics features.

---

## 📝 License

This project is licensed for educational/testing purposes.

