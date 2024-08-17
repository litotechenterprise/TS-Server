import { NextFunction, Request, Response, Router } from "express";
import { RequestWithBody } from "../types";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.EMAIL || !process.env.PASSWORD) {
  throw new Error("Email and password environment variables are required");
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    return res.redirect("/denied");
  }
}

const loginRouter = Router();

loginRouter.get("/", (req: Request, res: Response): void => {
  if (req.session && req.session.loggedIn) {
    res.send(`
             <div>
                <p>You are logged in!</p>
                <a href="/protected">Protected content</a>
                   <a href="/logout">Logout</a>

            </div>
            `);
  } else {
    res.send(`
            <div>
                <p>You are currently logged out</p>
                <a href="/login">Login</a>
            </div>
            `);
  }
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
      email === process.env.EMAIL &&
      password === process.env.PASSWORD;

    if (authenticated) {
      req.session = { loggedIn: true };
      res.redirect("/");
    } else {
      res.status(422).send("Invalid credentials");
    }
  });

loginRouter.get("/denied", (req: Request, res: Response) => {
  res.send(`
           <div>
                  <p>You are denied from seeing this content</p>
                     <a href="/login">login</a>
              </div>
          `);
});

loginRouter.get("/logout", (req: Request, res: Response) => {
  req.session = undefined;
  res.redirect("/");
});

loginRouter.get("/protected", requireAuth, (req: Request, res: Response) => {
  res.send(`
        <div>
               <p>You are able to view protexted content</p>
                <a href="/logout">logout</a>
           </div>
       `);
});

export default loginRouter;
