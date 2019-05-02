import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { ticketRouter } from "./ticketAPI";
import { userRouter } from "./userAPI";
import { formRouter } from "./formAPI";
import { AWS } from '../dao/index';
import { auth } from '../middleware/auth';

let docClient = new AWS.DynamoDB.DocumentClient();
const rateLimit = require("express-rate-limit");
const regLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
// //  apply to all requests
// app.use(limiter);
var jwt = require('jsonwebtoken');
const router: Router = Router();
router.use("/ticket", regLimiter, auth, ticketRouter);
router.use("/user", regLimiter, userRouter);
router.use("/regForm", regLimiter, auth, formRouter);
router.use("/v1/participantDetails", (req: Request, res: Response, next: NextFunction) => {
    console.log(req.hostname);
    console.log(req.url);

    if (req.headers.authorization) {
        const lol = req.headers.authorization;
        const token: string[] = lol.split(" ");

        jwt.verify(token[1], process.env.SECRET, (err: any, decodedToken: any) => {
            if (err || !decodedToken) {
                return res.status(403).json({ err: "Authentication failed" });
            } else {
                console.log(decodedToken)
                if (decodedToken.appName == "dialog") {
                    req.url = '/getDedicated';
                    next();
                }
            }
        });
    } else {
        next();
    }

}, formRouter);


router.post("/sendToken", regLimiter, (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.sendSMSToken(req, res, next);

});
router.post("/verifyToken", regLimiter, (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.verifySMSToken(req, res, next);

});
router.post("/token", regLimiter, (req, res, next) => {

    if (req.headers.authorization) {
        const lol = req.headers.authorization;
        const token: string[] = lol.split(" ");

        jwt.verify(token[1], process.env.SECRET, (err: any, decodedToken: any) => {
            if (err || !decodedToken) {
                //   logger.info("Authentication failed");
                //console.log("3")

                return res.status(403).json({ err: "Authentication failed" });
            } else {

                //console.log(decodedToken);
                var params = {
                    TableName: "Users",
                    Key: {
                        "email": decodedToken.email
                    }
                };
                docClient.get(params, function (err: any, data: any) {
                    if (err) {
                        res.statusCode = 500;
                        res.send({ error: "Server Error when retrieving user object" });
                    }
                    else {
                        if (JSON.stringify(data.Item, null, 2) == null) {
                            res.statusCode = 400;
                            res.send({ error: "Email is not authenticated!" });
                        } else {
                            let isSelected = false;
                            if (data.Item.isSelected) {
                                isSelected = data.Item.isSelected;
                            }

                            res.statusCode = 201;
                            const tokenStuff = {
                                email: data.Item.email,
                                phoneNumber: data.Item.phoneNumber,
                                username: data.Item.username,
                                isRegistered: data.Item.isRegistered,
                                publicKey: data.Item.publicKey,
                                isSelected: isSelected
                            };
                            var token = jwt.sign(tokenStuff, process.env.SECRET);
                            // //console.log(token)
                            res.send({ token: token });
                        }

                    }
                })
            }

        });
    } else {
        return res.status(400).json({ err: "The Authorization token is not found" });
    }

});
router.post("/tokenTest", regLimiter, (req, res, next) => {
    if (req.body) {
        if (req.body.appName && req.body.exp) {
            res.statusCode = 200;
            const tokenStuff = {
                appName: req.body.appName,
                exp: req.body.exp
            };
            var token = jwt.sign(tokenStuff, process.env.SECRET);
            // //console.log(token)
            res.send({ token: token });

        } else {
            res.statusCode = 400;
            res.send({ status: "appName and exp are not present" });
        }
    } else {
        res.statusCode = 400;
        res.send({ status: "Request body is not present" });
    }
});


export { router };

