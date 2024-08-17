import express from "express";
import loginRouter from "./routes/login";
import bodyParser from "body-parser";

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(loginRouter);

app.listen(PORT, () => {
  console.log(`Listing at http://localhost:${PORT}`);
});
