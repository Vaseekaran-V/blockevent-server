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


router.post("/sendToken", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.sendSMSToken(req, res, next);

});

router.post("/verifyToken", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.verifySMSToken(req, res, next);

});

router.post("/token", (req, res, next) => {
    var params = {
        TableName: "Users",
        Key: {
            "email": req.params.email
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
                var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
                res.send({ token: token });
            }

        }
    })
});


export { router };

