# All-In-One Event Collaboration Platform 🛡️

A modern React application demonstrating protected routing and authentication flow using React Router v6. Keep your application's pages secure and your users authenticated with style!

## ✨ Features

- 🔒 Protected route implementation
- 🚦 Clean routing structure
- 🎯 Centralized authentication flow
- 📱 Responsive dashboard interface
- 🔑 Dedicated login page

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Dashboard.js
│   ├── Login.js
│   └── ProtectedRoute.js
└── App.js
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone [your-repo-url]
cd [your-project-name]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

## 🛣️ Available Routes

- `/` - Home route (protected, redirects to dashboard)
- `/login` - Authentication page
- `/dashboard` - Main dashboard (protected)

## 💻 Usage

The application implements a secure routing system where protected routes require authentication:

```jsx
// Example of protected route usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 🔧 Technologies Used

- React
- React Router v6
- JavaScript/ES6+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✍️ Authors

- Your Name - *Initial work*

## 🙏 Acknowledgments

- React Router team for the excellent routing library
- The React community for continuous inspiration

---
Made with ❤️ and React