import { Request, Response, Router } from "express";
import { RequestWithBody } from "../types";

if (!process.env.EMAIL || !process.env.PASSWORD) {
  throw new Error("Email and password environment variables are required");
}

const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response): void => {
  res.send(`
          <div>
              <h1>hi there</h1>
          </div>
          `);
});

loginRouter
  .route("/login")
  .get((req: Request, res: Response): void => {
    res.send(`
              <form method="post">
                  <div>
                  <label>Email</label>
                  <input name="email" type="text" />
                  </div>
                  <div>
                   <label>Password</label>
                  <input type="password" name="password" />
                  </div>
                  <button>Submit</button>
              </form>
              `);
  })
  .post((req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    const authenticated =
      email &&
      password &&
      email === "pablo@gmail.com" &&
      password === "password";

    if (authenticated) {
      res.send(`${email}`);
    } else {
      res.status(422).send("Invalid credentials");
    }
  });

export default loginRouter;
