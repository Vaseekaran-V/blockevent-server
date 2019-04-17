import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { ticketController } from "../controllers/ticketController";
import { formController } from "../controllers/formController";
var jwt = require('jsonwebtoken');

const formRouter: Router = Router();


formRouter.post("/submit", (req: Request, res: Response, next: NextFunction) => {
    const lol = req.headers.authorization;
    const token: string[] = lol.split(" ");

    jwt.verify(token[1], process.env.SECRET, (err: any, decodedToken: any) => {
        if (err || !decodedToken) {
            return res.status(403).json({ err: "Authentication failed" });
        } else if (req.body.email == decodedToken.email && req.body.phoneNumber == decodedToken.phoneNumber) {
            const controller = new formController.formData;
            controller.addForm(req, res, next);
        } else {
            return res.status(403).json({ err: "Call +94765785123 for a free pass" });
        }
    });


});

export { formRouter };
