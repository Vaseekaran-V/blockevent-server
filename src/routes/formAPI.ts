import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { ticketController } from "../controllers/ticketController";
import { formController } from "../controllers/formController";
var jwt = require('jsonwebtoken');

const formRouter: Router = Router();
const rateLimit = require("express-rate-limit");
const regLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

const dialogLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5000 // limit each IP to 5000 requests per windowMs
});


formRouter.post("/submit", (req: Request, res: Response, next: NextFunction) => {

    if (req.headers.authorization) {
        const lol = req.headers.authorization;
        const token: string[] = lol.split(" ");

        jwt.verify(token[1], process.env.SECRET, (err: any, decodedToken: any) => {
            if (err || !decodedToken) {
                //console.log("1")

                return res.status(403).json({ err: "Authentication failed" });
            } else if (req.body.email == decodedToken.email && req.body.phoneNumber == decodedToken.phoneNumber) {
                const controller = new formController.formData;
                controller.addForm(req, res, next);
            } else {
                return res.status(403).json({ err: "The email and phone number in the token and form doesn't match" });
            }
        });
    } else {
        //console.log("2")
        return res.status(400).json({ err: "The Authorization token is not found" });
    }

});


formRouter.post("/submitTest", (req: Request, res: Response, next: NextFunction) => {

    const controller = new formController.formData;
    controller.addForm(req, res, next);

});

//any user
formRouter.post("/get", regLimiter,(req: Request, res: Response, next: NextFunction) => {

    const controller = new formController.formData;
    controller.getForm(req, res, next);

});

//only for dialog partners
formRouter.post("/getDedicated", dialogLimiter,(req: Request, res: Response, next: NextFunction) => {

    const controller = new formController.formData;
    controller.getForm(req, res, next);

});

export { formRouter };
