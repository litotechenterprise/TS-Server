import { Request, Response, Router } from "express";

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
                  <input name="email" />
                  </div>
                  <div>
                   <label>Password</label>
                  <input type="text" name="password" />
                  </div>
                  <button>Submit</button>
              </form>
              `);
  })
  .post((req: Request, res: Response) => {
    const { email, password } = req.body;
  });

export default loginRouter;
