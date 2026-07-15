# # Public API Integration Web Project

## 📌 Project Overview
This project is a dynamic web application built to fulfill the API Project requirements. It integrates a public API from the approved list to fetch, manipulate, and present data in an interactive and user-friendly web interface.

The application leverages a **GET endpoint** to securely request third-party data on the server side and dynamically serves it to the frontend.

---

## 🚀 Features
* **Live API Integration**: Implements server-side `GET` requests using Axios to fetch data.
* **Dynamic Rendering**: Uses a templating engine to inject real-time API data into the user interface.
* **Robust Error Handling**: Displays user-friendly error messages if the API is offline or returns an unexpected response, while logging internal technical faults to the server console.
* **Responsive Design**: Clean and accessible HTML/CSS interface optimized for both desktop and mobile layouts.

---

## 🛠️ Tech Stack & Architecture
* **Backend**: Node.js, Express.js
* **API Client**: Axios (for HTTP requests)
* **Frontend**: HTML5, CSS3, EJS (Embedded JavaScript templates)
* **Version Control**: Git & GitHub

---

## 💻 How to Launch the Project Locally

Follow these steps to set up and run the application on your local machine:

### 1. Prerequisites
Ensure you have **Node.js** (v16 or higher) and **npm** installed. You can check your version by running:
```bash
node -v
npm -v
```

### 2. Clone the Repository
Clone this repository to your local system and navigate into the root directory:
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <PROJECT_FOLDER_NAME>
```

### 3. Install Dependencies
Install all required node packages listed in the `package.json` file:
```bash
npm install
```

### 4. Start the Application
Run the local server using Node.js:
```bash
node server.js
```
*(Optional: If you have `nodemon` installed globally, you can run `nodemon server.js` for auto-reloading during development).*

### 5. Open in Browser
Once the terminal displays `Server running at http://localhost:3000`, open your preferred web browser and go to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📂 Project Structure
```text
├── views/
│   └── index.ejs       # Main frontend page with dynamic data templates
├── public/             # Static assets folder (CSS stylesheets, images)
├── server.js           # Express server setup, routing, and API integration
├── package.json        # Project metadata and dependencies manifest
└── README.md           # Project documentation and launch instructions
```

---

## 🔧 Code Implementation Highlights

### API Fetch & Error Handling Strategy
The application utilizes a `try...catch` block to handle API requests safely. If the public API fails, the server remains operational, logs the specific message globally, and provides context to the user:

```javascript
// Sample snippet from server.js
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('YOUR_CHOSEN_PUBLIC_API_URL');
        res.render('index', { data: response.data, error: null });
    } catch (error) {
        console.error('API Error:', error.message); // Server-side log
        res.render('index', { data: null, error: 'Failed to retrieve data.' }); // User-facing log
    }
});
```

---

## 📝 License
This project was created for educational purposes as part of a web development classroom assignment. Feel free to fork and modify!
