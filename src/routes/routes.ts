import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import { ticketRouter } from "./ticketAPI";
import { userRouter } from "./userAPI";


var jwt = require('jsonwebtoken');

const router: Router = Router();


router.use("/ticket", ticketRouter);
router.use("/user", userRouter);


router.post("/sendToken", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.sendSMSToken(req, res, next);

});

router.post("/verifyToken", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.verifySMSToken(req, res, next);

});


export { router };

