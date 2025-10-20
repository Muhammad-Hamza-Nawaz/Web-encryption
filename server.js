const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Encryption endpoint
app.post('/api/encrypt', (req, res) => {
    try {
        const { text, algorithm = 'aes-256-cbc' } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const key = crypto.randomBytes(32);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        res.json({
            encrypted,
            key: key.toString('hex'),
            iv: iv.toString('hex'),
            algorithm
        });
    } catch (error) {
        res.status(500).json({ error: 'Encryption failed: ' + error.message });
    }
});

// Decryption endpoint
app.post('/api/decrypt', (req, res) => {
    try {
        const { encrypted, key, iv, algorithm = 'aes-256-cbc' } = req.body;
        
        if (!encrypted || !key) {
            return res.status(400).json({ error: 'Encrypted text and key and IV are required' });
        }

        const keyBuffer = Buffer.from(key, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, keyBuffer, ivBuffer);
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        res.json({ decrypted });
    } catch (error) {
        res.status(500).json({ error: 'Decryption failed: ' + error.message });
    }
});

// Hash endpoint
app.post('/api/hash', (req, res) => {
    try {
        const { text, algorithm = 'sha256' } = req.body;
        
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        const hash = crypto.createHash(algorithm).update(text).digest('hex');
        
        res.json({ hash, algorithm });
    } catch (error) {
        res.status(500).json({ error: 'Hashing failed: ' + error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Web Encryption Tool server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});



