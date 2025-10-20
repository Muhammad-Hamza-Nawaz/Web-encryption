// --- Client-Side Caesar Cipher Implementation 
function caesarEncrypt(text, shift = 3) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-z]/i)) {
            let code = text.charCodeAt(i);
            let isUpperCase = code >= 65 && code <= 90;
            let offset = isUpperCase ? 65 : 97;
            char = String.fromCharCode(((code - offset + shift) % 26) + offset);
        }
        result += char;
    }
    return result;
}


async function processAction(action) {
    const textInput = document.getElementById('plainText');
    const algorithm = document.getElementById('algorithm').value;
    const cipherOutput = document.getElementById('cipherText');
    const errorElement = document.getElementById('error-message');
    const copyButton = document.getElementById('copyButton');
    
    // Clear previous results/errors
    cipherOutput.value = '';
    errorElement.textContent = '';
    copyButton.style.display = 'none';

    // 1. Core Validation 
    if (textInput.value.trim() === '' && action !== 'decrypt') {
        errorElement.textContent = 'Error: Please enter the plain text.'; // Prevent empty inputs [cite: 19]
        return;
    }
    if (algorithm === '') {
        errorElement.textContent = 'Error: Please select an encryption method.'; // Ensure users select an encryption method [cite: 20]
        return;
    }

    let result = '';

    if (algorithm === 'Caesar' && action === 'encrypt') {
        // Handle Caesar Cipher client-side
        result = caesarEncrypt(textInput.value.trim(), 3);
        cipherOutput.value = result;
        copyButton.style.display = 'block';
        return;
    } 
    
    // --- Server-Side Operations (AES, SHA-256) ---

    try {
        let apiUrl = '';
        let bodyData = {};

        if (action === 'encrypt' || action === 'hash') {
            
            // Hashing (SHA-256) (Bonus Marks) [cite: 25]
            if (algorithm === 'sha256') {
                apiUrl = '/api/hash';
                bodyData = { text: textInput.value.trim(), algorithm: algorithm };
            } 
            // Encryption (AES-256-CBC)
            else if (algorithm === 'aes-256-cbc') {
                apiUrl = '/api/encrypt';
                bodyData = { text: textInput.value.trim(), algorithm: algorithm };
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });

            const data = await response.json();

            if (response.ok) {
                if (data.encrypted) {
                    // Store Key/IV for later decryption
                    document.getElementById('storedKey').value = data.key;
                    document.getElementById('storedIV').value = data.iv;
                    result = data.encrypted;
                } else if (data.hash) {
                    result = data.hash;
                }
            } else {
                errorElement.textContent = `Server Error: ${data.error}`;
                return;
            }

        } else if (action === 'decrypt' && algorithm === 'aes-256-cbc') {
            // Decryption Feature
            apiUrl = '/api/decrypt';
            const encrypted = textInput.value.trim();
            const key = document.getElementById('storedKey').value.trim();
            const iv = document.getElementById('storedIV').value.trim();

            if (!encrypted || !key || !iv) {
                 errorElement.textContent = 'Error: Decryption requires encrypted text, Key, and IV.';
                 return;
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ encrypted, key, iv, algorithm })
            });

            const data = await response.json();

            if (response.ok) {
                result = data.decrypted;
            } else {
                errorElement.textContent = `Decryption Failed: ${data.error}`;
                return;
            }
        }
    } catch (error) {
        console.error('API Error:', error);
        errorElement.textContent = 'Network Error: Could not connect to the server.';
        return;
    }

    // Display final result
    cipherOutput.value = result;
    copyButton.style.display = 'block'; // Allow users to copy the ciphertext easily. 
}

// Advanced Feature: Copy Ciphertext 
function copyCiphertext() {
    const cipherTextOutput = document.getElementById('cipherText');
    cipherTextOutput.select();
    navigator.clipboard.writeText(cipherTextOutput.value).then(() => {
        alert('Result copied to clipboard!');
    }).catch(err => {
        alert('Failed to copy text. Please copy manually.');
    });
}