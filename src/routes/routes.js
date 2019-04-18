"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("../controllers/userController");
const express_1 = require("express");
const ticketAPI_1 = require("./ticketAPI");
const userAPI_1 = require("./userAPI");
const formAPI_1 = require("./formAPI");
const index_1 = require("../dao/index");
const auth_1 = require("../middleware/auth");
let docClient = new index_1.AWS.DynamoDB.DocumentClient();
var jwt = require('jsonwebtoken');
const router = express_1.Router();
exports.router = router;
router.use("/ticket", auth_1.auth, ticketAPI_1.ticketRouter);
router.use("/user", userAPI_1.userRouter);
router.use("/regForm", auth_1.auth, formAPI_1.formRouter);
router.use("/regFormTest", formAPI_1.formRouter);
router.post("/sendToken", (req, res, next) => {
    const controller = new userController_1.userController.UserData;
    controller.sendSMSToken(req, res, next);
});
router.post("/verifyToken", (req, res, next) => {
    const controller = new userController_1.userController.UserData;
    controller.verifySMSToken(req, res, next);
});
router.post("/token", (req, res, next) => {
    var params = {
        TableName: "Users",
        Key: {
            "email": req.body.email
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            res.statusCode = 500;
            res.send({ error: "Server Error when retrieving user object" });
        }
        else {
            if (JSON.stringify(data.Item, null, 2) == null) {
                res.statusCode = 400;
                res.send({ error: "Email is not authenticated!" });
            }
            else {
                res.statusCode = 200;
                var token = jwt.sign(data.Item, process.env.SECRET);
                res.send({ token: token });
            }
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0VBQStEO0FBQy9ELHFDQUFrRTtBQUNsRSwyQ0FBMkM7QUFDM0MsdUNBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx3Q0FBbUM7QUFDbkMsNkNBQTBDO0FBRTFDLElBQUksU0FBUyxHQUFHLElBQUksV0FBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUVsRCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFbEMsTUFBTSxNQUFNLEdBQVcsZ0JBQU0sRUFBRSxDQUFDO0FBZ0R2Qix3QkFBTTtBQTdDZixNQUFNLENBQUMsR0FBRyxDQUFDLFNBQVMsRUFBRSxXQUFJLEVBQUUsd0JBQVksQ0FBQyxDQUFDO0FBQzFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLG9CQUFVLENBQUMsQ0FBQztBQUNoQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFJLEVBQUUsb0JBQVUsQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFHLG9CQUFVLENBQUMsQ0FBQztBQUd4QyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0IsRUFBRSxFQUFFO0lBQzFFLE1BQU0sVUFBVSxHQUFHLElBQUksK0JBQWMsQ0FBQyxRQUFRLENBQUM7SUFDL0MsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBRTVDLENBQUMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUM1RSxNQUFNLFVBQVUsR0FBRyxJQUFJLCtCQUFjLENBQUMsUUFBUSxDQUFDO0lBQy9DLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUU5QyxDQUFDLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUNyQyxJQUFJLE1BQU0sR0FBRztRQUNULFNBQVMsRUFBRSxPQUFPO1FBQ2xCLEdBQUcsRUFBRTtZQUNELE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7U0FDMUI7S0FDSixDQUFDO0lBQ0YsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxHQUFRLEVBQUUsSUFBUztRQUMvQyxJQUFJLEdBQUcsRUFBRTtZQUNMLEdBQUcsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO1lBQ3JCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsMENBQTBDLEVBQUUsQ0FBQyxDQUFDO1NBQ25FO2FBQ0k7WUFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUM1QyxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztnQkFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSw2QkFBNkIsRUFBRSxDQUFDLENBQUM7YUFDdEQ7aUJBQU07Z0JBQ0gsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7Z0JBQ3JCLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7YUFDOUI7U0FFSjtJQUNMLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUMifQ==