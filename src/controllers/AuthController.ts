import { NextFunction, Request, Response } from "express";
import { get, post } from "./decorators/routes";
import { controller } from "./decorators/controllers";
import { use } from "./decorators/use";
import { bodyValidator } from "./decorators/validator";
import { RequestWithBody } from "../types";
import { logger } from "../middleware";

@controller("/auth")
export class LoginController {
  @get("/login")
  @use(logger)
  getLogin(req: Request, res: Response): void {
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
  }

  @post("/login")
  @bodyValidator("email", "password")
  login(req: RequestWithBody, res: Response): void {
    const { email, password } = req.body;
    const authenticated =
      email &&
      password &&
      email === process.env.EMAIL &&
      password === process.env.PASSWORD;

    if (authenticated) {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.status(422).send("Invalid credentials");
    }
  }

  @get("/logout")
  logOut(req: RequestWithBody, res: Response): void {
    req.session = undefined;
    res.redirect("/");
  }
}
