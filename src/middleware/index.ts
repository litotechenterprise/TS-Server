import { NextFunction, Request, Response } from "express";

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  } else {
    return res.redirect("/denied");
  }
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Logger was used");
  next();
}
