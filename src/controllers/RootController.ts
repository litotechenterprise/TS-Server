import { Request, Response } from "express";
import { get } from "./decorators/routes";
import { controller } from "./decorators/controllers";
import { requireAuth } from "../middleware";
import { use } from "./decorators/use";

@controller("")
export class RootController {
  @get("/")
  getRoot(req: Request, res: Response): void {
    if (req.session && req.session.loggedIn) {
      res.send(`
                   <div>
                      <p>You are logged in!</p>
                      <a href="/protected">Protected content</a>
                         <a href="/auth/logout">Logout</a>
      
                  </div>
                  `);
    } else {
      res.send(`
                  <div>
                      <p>You are currently logged out</p>
                      <a href="/auth/login">Login</a>
                  </div>
                  `);
    }
  }

  @get("/protected")
  @use(requireAuth)
  getProtected(req: Request, res: Response): void {
    res.send(`
        <div>
               <p>You are able to view protexted content</p>
                <a href="/auth/logout">logout</a>
           </div>
       `);
  }

  @get("/denied")
  GetDenied(req: Request, res: Response): void {
    res.send(`
             <div>
                    <p>You are denied from seeing this content</p>
                       <a href="/auth/login">login</a>
                </div>
            `);
  }
}
