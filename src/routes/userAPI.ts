
import { userController } from "../controllers/userController";
import { Router, Request, Response, NextFunction } from "express";
import axios from 'axios';
import { auth } from '../middleware/auth';


const userRouter: Router = Router();

userRouter.get("/getGitUserDetails/:gitID", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.getUserGitHub(req, res, next);

});

userRouter.get("/getStackUserDetails/:stackID", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.getUserStack(req, res, next);

});

userRouter.post("/add", (req: Request, res: Response, next: NextFunction) => {

    axios.post('https://ideabiz.lk/apicall/pin/verify/v1/submitPin',
        {
            pin: req.body.pin,
            serverRef: req.body.serverRef
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer a34edf99db05d1f1ead4423d4992ce9',
                'Accept': 'application/json'
            }
        }).then(resp => {
            const controller = new userController.UserData;
            controller.AddUser(req, res, next);

        }).catch(err => {
            var obj = {
                status: 'verifying token failed'
            }
            //console.log(obj);
            res.statusCode = 206;
            res.send(obj);
        });

});

userRouter.get("/getStackUserDetails/:stackID", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.getUserStack(req, res, next);

});
userRouter.post("/updateAddress", auth, (req: Request, res: Response, next: NextFunction) => {

    const controller = new userController.UserData;
    controller.AddContactDetails(req, res, next);

});

userRouter.post("/login", (req: Request, res: Response, next: NextFunction) => {

    const controller = new userController.UserData;
    controller.GetUser(req, res, next);
});


userRouter.post("/checkAvailability/", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.EmailAvailability(req, res, next);
});

userRouter.post("/checkMobileNumberAvailability/", (req: Request, res: Response, next: NextFunction) => {
    const controller = new userController.UserData;
    controller.MobileNumberAvailability(req, res, next);
});
export { userRouter };





