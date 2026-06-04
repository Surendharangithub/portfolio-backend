import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.NODE_APP_PORT!;

app.listen(PORT, () => {
    console.log(`Listening in Port ${PORT}`)
})