Since you had an issue with the content being centered on GitHub, and that's just GitHub's default layout, I'll give you the **final, correct version of the detailed README**.

Just copy the entire block below and paste it into your `README.md` file on GitHub, replacing the placeholders with your information.

-----

````markdown
# Web-Based Text Encryption Tool 🔐

This project delivers a functional, single-page web application for encrypting, hashing, and decrypting text. It was developed as an assignment and demonstrates proficiency in both client-side and server-side cryptographic implementation and secure key management.

## 🚀 Live Demo & Repository Link

* **View Code:** [https://github.com/Muhammad-Hamza-Nawaz/web-encryption]
* **Demo Video Link:** *(Paste the link to your unlisted YouTube/Google Drive video here)*

## ✨ Key Features & Assignment Status

The application meets all core requirements and successfully implements multiple optional advanced features for bonus marks.

| Requirement Category | Feature Implemented | Implementation Detail | Status |
| :--- | :--- | :--- | :--- |
| [cite_start]**Core Algorithms (Min 3)** [cite: 14] | **Caesar Cipher** (Shift: 3) | Implemented purely in **Client-Side JavaScript** (`public/script.js`). | **MET** |
| | **AES-256-CBC** | Strong, reversible encryption using the **Node.js `crypto` module**. | **MET** |
| | **SHA-256 Hashing** | [cite_start]Irreversible hashing function for integrity checks/password storage. [cite: 25] | **MET & Bonus** |
| **Core UI/Validation** | [cite_start]Full UI (Input, Dropdown, Output) [cite: 7, 8, 10, 11] | Single HTML page (`index.html`). | **MET** |
| | [cite_start]Input Validation [cite: 19, 20] | Prevents empty text and unselected algorithms (Client-side). | **MET** |
| **Bonus Features** | **Decryption** | [cite_start]Dedicated `/api/decrypt` endpoint using the original Key and IV. [cite: 24] | **Bonus** |
| | **Secure Key Handling** | Server generates unique Key/IV for AES, displayed to the user for decryption. | **Bonus** |
| | **Copy Ciphertext** | [cite_start]Button to easily copy results to the clipboard. [cite: 26] | **Bonus** |

---

## 💻 Technical Architecture

The application uses a hybrid structure optimized for security and performance:

1.  **Frontend (UI and Simple Logic):**
    * [cite_start]**Technology:** HTML, CSS, JavaScript[cite: 29].
    * **Function:** Manages user interaction, validation, and the local **Caesar Cipher** operation. It uses the modern `fetch` API to communicate with the Node.js backend.
2.  **Backend (Security and Complex Crypto):**
    * [cite_start]**Technology:** Node.js (Express)[cite: 30].
    * **Function:** Runs the server and defines the API endpoints. [cite_start]The core encryption uses the native **Node.js `crypto` module** (instead of CryptoJS [cite: 31]) for robust server-side security.

### Key Management Workflow (AES-256-CBC):

For AES, the application follows a robust key management process:
1.  User inputs plaintext and selects AES.
2.  The client sends the plaintext to the server.
3.  The server generates a fresh, random **Key** and **IV**.
4.  The server returns the Ciphertext, Key, and IV.
5.  The client automatically stores the Key and IV in the **"Secrets Storage"** fields, allowing the user to subsequently decrypt the message.

---

## 🛠️ Setup and Installation Guide

To run this application locally, you will need Node.js and npm installed.

### 1. Clone the Repository

Open your terminal or command prompt:

```bash
# Clone the repository
git clone YOUR_HTTPS_LINK_HERE
cd web-encryption-tool
````

### 2\. Install Dependencies

Install the required Node.js packages (`express` and `body-parser`):

```bash
npm install
```

### 3\. Start the Server

Launch the application:

```bash
node server.js
```

### 4\. Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

*(The server must be running in the terminal while you use the application.)*

```
```
