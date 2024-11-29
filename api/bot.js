const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Constants for API URLs
const TELEGRAM_API_URL = `https://api.telegram.org/bot7783278698:AAEvfYlaUVbseYYXCPVxJPhgbiWnclxaeiU`;
const WEB_APP_URL = "https://demo-gamma-blond.vercel.app";

app.post('/api/bot', async (req, res) => {
    console.log('Received update:', JSON.stringify(req.body));
    const message = req.body.message;

    if (message && message.text === "/start") {
        const responseText = `
🚀 *Welcome to Your Amazing Bot!* 🚀

Get ready for an exciting experience with our bot!

🌟 *Features:*
• Feature 1: Description of feature 1
• Feature 2: Description of feature 2
• Feature 3: Description of feature 3

🏆 Are you ready to begin your journey?

Click the button below to start!`;

        try {
            // Create an inline keyboard with a button to open the web app
            const inlineKeyboardMarkup = {
                inline_keyboard: [
                    [{
                        text: "🎉 Start Now!",
                        web_app: {
                            url: `${WEB_APP_URL}?startapp=fullscreen`
                        }
                    }]
                ]
            };

            // Send the welcome message with the inline keyboard
            const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
                chat_id: message.chat.id,
                text: responseText,
                parse_mode: 'Markdown',
                reply_markup: JSON.stringify(inlineKeyboardMarkup)
            });

            console.log('Telegram API response:', response.data);
            res.status(200).send('Command processed');
        } catch (error) {
            console.error('Failed to process command:', error.response ? error.response.data : error.message);
            res.status(500).send('Error processing command');
        }
    } else {
        // Log if no command was processed
        console.log('No command processed for message:', message ? message.text : 'undefined');
        res.status(200).send('No command processed');
    }
});

// Export the Express app
module.exports = app;