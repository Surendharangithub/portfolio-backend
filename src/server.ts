import express from "express";
import dotenv from "dotenv";
import { Resend } from "resend";
import { emailParams } from "./@types";
import { limiter } from "./utils";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.NODE_APP_PORT!;
const API_KEY = process.env.RESEND_API_KEY!;
const resend = new Resend(API_KEY);

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Health Check Done!'
    });
});

app.post('/v1/api/email', limiter, async (req, res) => {
    if (!req.body?.email) {
        return res.status(400).json({
            success: false,
            message: 'Please Enter Email ID!'
        });
    }

    const { email } = req.body as emailParams;

    try {
        await resend.emails.send({
            from: 'noreply@surencodes.com',
            to: email,
            replyTo: 'surenrengarajan@gmail.com',
            subject: 'Welcome to SurenCodes from Email',
            html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Welcome to SurenCodes! 👋</h2>
                <p>Hi there, thanks for joining us.</p>
                <a href="https://surencodes.com">Get Started</a>
            </div>`
        });

        return res.status(200).json({
            success: true,
            message: 'Email Sent Successfully!'
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Failed to Send Email'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
});