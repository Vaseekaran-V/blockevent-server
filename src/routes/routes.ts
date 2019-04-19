import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { ticketRouter } from "./ticketAPI";
import { userRouter } from "./userAPI";
import { formRouter } from "./formAPI";
import { AWS } from '../dao/index';
import { auth } from '../middleware/auth';

let docClient = new AWS.DynamoDB.DocumentClient();

var jwt = require('jsonwebtoken');

const router: Router = Router();


router.use("/ticket", auth, ticketRouter);
router.use("/user", userRouter);
router.use("/regForm", auth, formRouter);
router.use("/regFormTest",  formRouter);


router.post("/sendToken", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.sendSMSToken(req, res, next);

});

router.post("/verifyToken", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.verifySMSToken(req, res, next);

});

router.post("/token", (req, res, next) => {

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
                            res.statusCode = 200;
                            const tokenStuff = {
                                email: data.Item.email,
                                phoneNumber: data.Item.phoneNumber,
                                username: data.Item.username,
                                isRegistered: data.Item.isRegistered,
                                publicKey: data.Item.publicKey
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


export { router };

