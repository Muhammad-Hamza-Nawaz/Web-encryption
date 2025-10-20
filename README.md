Web-Based Text Encryption Tool 🔐

This project delivers a functional, single-page web application for encrypting, hashing, and decrypting text. It was developed as an assignment and demonstrates proficiency in both client-side and server-side cryptographic implementation and secure key management.

🚀 Live Demo & Repository Link

View Code: https://github.com/Muhammad-Hamza-Nawaz/web-encryption

Demo Video Link: (Paste the link to your unlisted YouTube/Google Drive video here)

✨ Key Features & Assignment Status

The application meets all core requirements and successfully implements multiple optional advanced features for bonus marks.

Requirement Category

Feature Implemented

Implementation Detail

Status

Core Algorithms (Min 3)

Caesar Cipher (Shift: 3)

Implemented purely in Client-Side JavaScript (public/script.js).

MET



AES-256-CBC

Strong, reversible encryption using the Node.js crypto module.

MET



SHA-256 Hashing

Irreversible hashing function for integrity checks/password storage.

MET & Bonus

Core UI/Validation

Full UI (Input, Dropdown, Output)

Single HTML page (index.html).

MET



Input Validation

Prevents empty text and unselected algorithms (Client-side).

MET

Bonus Features

Decryption

Dedicated /api/decrypt endpoint using the original Key and IV.




Secure Key Handling

Server generates unique Key/IV for AES, displayed to the user for decryption.




Copy Ciphertext

Button to easily copy results to the clipboard.



💻 Technical Architecture

The application uses a hybrid structure optimized for security and performance:

Frontend (UI and Simple Logic):

HTML/CSS: Handles layout and styling.

JavaScript: Manages user interaction, validation, and the local Caesar Cipher operation. It uses the modern fetch API to communicate with the Node.js backend for all complex crypto tasks.

Backend (Security and Complex Crypto):

Node.js / Express: Runs the server and defines the API endpoints (/api/encrypt, /api/decrypt, /api/hash).

Native crypto Module: The core encryption uses the native Node.js crypto module (preferable over third-party libraries for server security) with the secure createCipheriv function.

Key Management Workflow (AES-256-CBC):

For AES, the application follows a robust key management process:

User inputs plaintext and selects AES.

The client sends the plaintext to the server.

The server generates a fresh, random 32-byte Key and a 16-byte IV (Initialization Vector).

The server returns the Ciphertext, Key, and IV.

The client automatically stores the Key and IV in the "Secrets Storage" fields, allowing the user to subsequently decrypt the message.

🛠️ Setup and Installation Guide

To run this application locally, you will need Node.js and npm installed.

1. Clone the Repository

Open your terminal or command prompt:

# Clone the repository (if you didn't do it already)
git clone YOUR_HTTPS_LINK_HERE
cd web-encryption-tool


2. Install Dependencies

Install the required Node.js packages (express and body-parser):

npm install


3. Start the Server

Launch the application:

node server.js


4. Access the Application

Open your web browser and navigate to:

http://localhost:3000


(The server must be running in the terminal while you use the application.)
