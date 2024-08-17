import express from "express";
import loginRouter from "./routes/login";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

if (!process.env.COOKIE_SESSION_KEY) {
  throw new Error("Cookie session key is required");
}

const app = express();
const PORT = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: [process.env.COOKIE_SESSION_KEY] }));
app.use(loginRouter);

app.listen(PORT, () => {
  console.log(`Listing at http://localhost:${PORT}`);
});
