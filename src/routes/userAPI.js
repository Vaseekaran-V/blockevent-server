"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const userRouter = express_1.Router();
exports.userRouter = userRouter;
userRouter.get("/getGitUserDetails/:gitID", (req, res, next) => {
    const controller = new userController_1.userController.UserData;
    controller.getUserGitHub(req, res, next);
});
userRouter.get("/getStackUserDetails/:stackID", (req, res, next) => {
    const controller = new userController_1.userController.UserData;
    controller.getUserStack(req, res, next);
});
userRouter.post("/add", (req, res, next) => {
    axios_1.default.post('https://ideabiz.lk/apicall/pin/verify/v1/submitPin', {
        pin: req.body.pin,
        serverRef: req.body.serverRef
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer a34edf99db05d1f1ead4423d4992ce9',
            'Accept': 'application/json'
        }
    }).then(resp => {
        const controller = new userController_1.userController.UserData;
        controller.AddUser(req, res, next);
    }).catch(err => {
        var obj = {
            status: 'verifying token failed'
        };
        console.log(obj);
        res.statusCode = 206;
        res.send(obj);
    });
});
userRouter.get("/get/:email", (req, res, next) => {
    const controller = new userController_1.userController.UserData;
    controller.GetUser(req, res, next);
});
userRouter.post("/checkAvailability/", (req, res, next) => {
    const controller = new userController_1.userController.UserData;
    controller.EmailAvailability(req, res, next);
});
userRouter.post("/checkMobileNumberAvailability/", (req, res, next) => {
    const controller = new userController_1.userController.UserData;
    controller.MobileNumberAvailability(req, res, next);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckFQSS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXJBUEkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxrRUFBK0Q7QUFDL0QscUNBQWtFO0FBQ2xFLGtEQUEwQjtBQUUxQixNQUFNLFVBQVUsR0FBVyxnQkFBTSxFQUFFLENBQUM7QUF5RDNCLGdDQUFVO0FBdkRuQixVQUFVLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDNUYsTUFBTSxVQUFVLEdBQUcsSUFBSSwrQkFBYyxDQUFDLFFBQVEsQ0FBQztJQUMvQyxVQUFVLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFN0MsQ0FBQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsR0FBRyxDQUFDLCtCQUErQixFQUFFLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxJQUFrQixFQUFFLEVBQUU7SUFDaEcsTUFBTSxVQUFVLEdBQUcsSUFBSSwrQkFBYyxDQUFDLFFBQVEsQ0FBQztJQUMvQyxVQUFVLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFFNUMsQ0FBQyxDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBRXhFLGVBQUssQ0FBQyxJQUFJLENBQUMsb0RBQW9ELEVBQzNEO1FBQ0ksR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRztRQUNqQixTQUFTLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTO0tBQ2hDLEVBQUU7UUFDQyxPQUFPLEVBQUU7WUFDTCxjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLGVBQWUsRUFBRSx3Q0FBd0M7WUFDekQsUUFBUSxFQUFFLGtCQUFrQjtTQUMvQjtLQUNKLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDWCxNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUFjLENBQUMsUUFBUSxDQUFDO1FBQy9DLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV2QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDWCxJQUFJLEdBQUcsR0FBRztZQUNOLE1BQU0sRUFBRSx3QkFBd0I7U0FDbkMsQ0FBQTtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztBQUVYLENBQUMsQ0FBQyxDQUFDO0FBR0gsVUFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUM5RSxNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUFjLENBQUMsUUFBUSxDQUFDO0lBQy9DLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN2QyxDQUFDLENBQUMsQ0FBQztBQUdILFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUN2RixNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUFjLENBQUMsUUFBUSxDQUFDO0lBQy9DLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2pELENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBVSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQ25HLE1BQU0sVUFBVSxHQUFHLElBQUksK0JBQWMsQ0FBQyxRQUFRLENBQUM7SUFDL0MsVUFBVSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEQsQ0FBQyxDQUFDLENBQUMifQ==