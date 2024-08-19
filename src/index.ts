import express from "express";
import loginRouter from "./routes/login";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
dotenv.config();
import "./controllers/AuthController";
import "./controllers/RootController";
import { AppRouter } from "./AppRouter";

if (!process.env.COOKIE_SESSION_KEY) {
  throw new Error("Cookie session key is required");
}

if (!process.env.PORT) {
  throw new Error("Must set a port within environment variable");
}

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [process.env.COOKIE_SESSION_KEY] }));
app.use(AppRouter.getInstance());

app.listen(PORT, () => {
  console.log(`Listing at http://localhost:${PORT}`);
});
