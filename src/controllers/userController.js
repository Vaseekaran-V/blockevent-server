"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const index_1 = require("../dao/index");
let docClient = new index_1.AWS.DynamoDB.DocumentClient();
var userController;
(function (userController) {
    class UserData {
        getUserGitHub(req, res, next) {
            axios_1.default.get(`https://api.github.com/users/${req.params.gitID}`, {
                params: {
                    client_id: 'd043583aba9242a12df8',
                    client_secret: 'f31a713d397670fa4d79eaffade66effb9d91e2d'
                }
            }).then(response => {
                // console.log(response.data);
                res.send(response.data);
            }).catch(err => {
                axios_1.default.get(`https://api.github.com/users/${req.params.gitID}`, {
                    params: {
                        client_id: 'cc9899804e4f90dfe846',
                        client_secret: '45a3d82aed3b27a3fb2a3f36c65c22959f54db30'
                    }
                }).then(response => {
                    // console.log(response.data);
                    res.send(response.data);
                }).catch(err => {
                    var obj = {
                        status: 'Getting Git User Data Failed'
                    };
                    console.log(obj);
                    res.statusCode = 400;
                    res.send(obj);
                });
            });
        }
        getUserStack(req, res, next) {
            axios_1.default.get(`https://api.stackexchange.com/2.2/users/${req.params.stackID}`, {
                params: {
                    order: 'desc',
                    sort: 'reputation',
                    site: 'stackoverflow',
                    key: 'SEFCadUUA4CqM91xwQvUDw%28%28'
                }
            }).then(response => {
                console.log(response.data);
                res.send(response.data);
            }).catch(err => {
                var obj = {
                    status: 'Getting Stack User Data Failed'
                };
                console.log(obj);
                res.statusCode = 400;
                res.send(obj);
            });
        }
        sendSMSToken(req, res, next) {
            // var userId = firebase.auth().currentUser.uid;
            axios_1.default.post('https://ideabiz.lk/apicall/pin/verify/v1/verify', {
                method: 'ANC',
                msisdn: req.body.telephone
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer a34edf99db05d1f1ead4423d4992ce9',
                    'Accept': 'application/json'
                }
            }).then(response => {
                // console.log(response.data);
                res.send(response.data);
            }).catch(err => {
                var obj = {
                    status: 'sending token failed'
                };
                console.log(obj);
                res.statusCode = 400;
                res.send(obj);
            });
        }
        verifySMSToken(req, res, next) {
            // var userId = firebase.auth().currentUser.uid;
            axios_1.default.post('https://ideabiz.lk/apicall/pin/verify/v1/submitPin', {
                pin: req.body.pin,
                serverRef: req.body.serverRef
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer a34edf99db05d1f1ead4423d4992ce9',
                    'Accept': 'application/json'
                }
            }).then(response => {
                // console.log(response.data);
                res.send(response.data);
            }).catch(err => {
                var obj = {
                    status: 'verifying token failed'
                };
                console.log(obj);
                res.statusCode = 400;
                res.send(obj);
            });
        }
        AddUser(req, res, next) {
            //first retrieve to check for dulicates
            var paramsG = {
                TableName: "Users",
                Key: {
                    "email": req.body.email
                }
            };
            console.log(paramsG);
            docClient.get(paramsG, function (err, data) {
                if (err) {
                    res.statusCode = 501;
                    res.send({ status: "DB Crashed while checking whether the user object exists" });
                }
                else {
                    if (JSON.stringify(data.Item, null, 2) == null) {
                        //adding the user
                        const params = {
                            TableName: 'Users',
                            Item: req.body
                        };
                        docClient.put(params, function (err1, data1) {
                            if (err1) {
                                console.log(err1);
                                res.statusCode = 500;
                                res.send({ status: "DB Crashed While Adding New User" });
                            }
                            else {
                                const params2 = {
                                    TableName: 'PhoneNumbers',
                                    Item: { telephone: req.body.phoneNumber, email: req.body.email }
                                };
                                docClient.put(params2, function (err2, data2) {
                                    if (err2) {
                                        console.log(err2);
                                    }
                                });
                                res.statusCode = 200;
                                res.send({ status: 'User Added Successfully' });
                            }
                        });
                    }
                    else {
                        res.statusCode = 201;
                        res.send({ status: "Email Address is Already Registered" });
                    }
                }
            });
        }
        GetUser(req, res, next) {
            var params = {
                TableName: "Users",
                Key: {
                    "email": req.params.email
                }
            };
            docClient.get(params, function (err, data) {
                if (err) {
                    res.statusCode = 500;
                    res.send({ status: 'DB Crash' });
                }
                else if (JSON.stringify(data.Item, null, 2) == null) {
                    res.statusCode = 200;
                    res.send(null);
                }
                else {
                    res.statusCode = 200;
                    res.send(data.Item);
                }
            });
        }
        EmailAvailability(req, res, next) {
            //first retrieve to check for dulicates
            var paramsG = {
                TableName: "Users",
                Key: {
                    "email": req.body.email
                }
            };
            console.log(paramsG);
            docClient.get(paramsG, function (err, data) {
                if (err) {
                    console.log(err);
                    res.statusCode = 501;
                    res.send({ status: "DB Crashed while checking whether the user object exists" });
                }
                else {
                    if (JSON.stringify(data.Item, null, 2) == null) {
                        res.statusCode = 200;
                        res.send({ available: true });
                    }
                    else {
                        res.statusCode = 200;
                        res.send({ available: false });
                    }
                }
            });
        }
        MobileNumberAvailability(req, res, next) {
            //first retrieve to check for dulicates
            var paramsG = {
                TableName: "PhoneNumbers",
                Key: {
                    "telephone": req.body.phoneNumber
                }
            };
            console.log(paramsG);
            docClient.get(paramsG, function (err, data) {
                if (err) {
                    console.log(err);
                    res.statusCode = 501;
                    res.send({ status: "DB Crashed while checking whether the user object exists" });
                }
                else {
                    if (JSON.stringify(data.Item, null, 2) == null) {
                        res.statusCode = 200;
                        res.send({ available: true });
                    }
                    else {
                        res.statusCode = 200;
                        res.send({ available: false });
                    }
                }
            });
        }
    }
    userController.UserData = UserData;
})(userController = exports.userController || (exports.userController = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlckNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGtEQUEwQjtBQUMxQix3Q0FBbUM7QUFFbkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxXQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ2xELElBQWlCLGNBQWMsQ0ErTzlCO0FBL09ELFdBQWlCLGNBQWM7SUFDM0IsTUFBYSxRQUFRO1FBQ1YsYUFBYSxDQUFDLEdBQVksRUFBRSxHQUFhLEVBQUUsSUFBa0I7WUFDaEUsZUFBSyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDMUQsTUFBTSxFQUFFO29CQUNKLFNBQVMsRUFBRSxzQkFBc0I7b0JBQ2pDLGFBQWEsRUFBRSwwQ0FBMEM7aUJBQzVEO2FBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDZiw4QkFBOEI7Z0JBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDWCxlQUFLLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUMxRCxNQUFNLEVBQUU7d0JBQ0osU0FBUyxFQUFFLHNCQUFzQjt3QkFDakMsYUFBYSxFQUFFLDBDQUEwQztxQkFDNUQ7aUJBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDZiw4QkFBOEI7b0JBQzlCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1gsSUFBSSxHQUFHLEdB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