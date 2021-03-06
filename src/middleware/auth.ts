var jwt = require('jsonwebtoken');
import { Router, Request, Response, NextFunction } from "express";


export function auth(req: Request, res: Response, next: NextFunction) {

    if (req.headers.authorization) {
        const lol = req.headers.authorization;
        const token: string[] = lol.split(" ");

        jwt.verify(token[1], process.env.SECRET, (err: any, decodedToken: string) => {
            if (err || !decodedToken) {
                //   logger.info("Authentication failed");
                //console.log("3")

                return res.status(403).json({ err: "Authentication failed" });
            } else {

                //console.log(decodedToken);

                next();
            }

        });
    } else {
        return res.status(400).json({ err: "The Authorization token is not found" });
    }

}
export function dialogAuth(req: Request, res: Response, next: NextFunction) {

    if (req.headers.authorization) {
        const lol = req.headers.authorization;
        const token: string[] = lol.split(" ");

        jwt.verify(token[1], process.env.SECRET, (err: any, decodedToken: any) => {
            if (err || !decodedToken) {
                return res.status(403).json({ err: "Authentication failed" });
            } else {
               req.headers.cookie='';
            }
        });
    } else {
        return res.status(400).json({ err: "The Authorization token is not found" });
    }

}