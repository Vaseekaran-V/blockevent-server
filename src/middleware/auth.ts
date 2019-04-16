var jwt = require('jsonwebtoken');
import { Router, Request, Response, NextFunction } from "express";


export function auth(req: Request, res: Response, next: NextFunction) {
    const lol = req.headers.authorization;
    const token: string[] = lol.split(" ");

    jwt.verify(token[1], process.env.SECRET, (err: any, decodedToken: string) => {
        if (err || !decodedToken) {
            //   logger.info("Authentication failed");

            return res.status(403).json({ err: "Authentication failed" });
        } else {

            //  //console.log(decodedToken);

            next();
        }

    });

}