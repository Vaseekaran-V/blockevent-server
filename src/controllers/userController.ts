import { NextFunction, Request, Response } from "express";
import axios from 'axios';
import { AWS } from '../dao/index';

let docClient = new AWS.DynamoDB.DocumentClient();
export namespace userController {
    export class UserData {
        public getUserGitHub(req: Request, res: Response, next: NextFunction) {
            axios.get(`https://api.github.com/users/${req.params.gitID}`, {
                params: {
                    client_id: 'd043583aba9242a12df8',
                    client_secret: 'f31a713d397670fa4d79eaffade66effb9d91e2d'
                }
            }).then(response => {
                // console.log(response.data);
                res.send(response.data);
            }).catch(err => {
                axios.get(`https://api.github.com/users/${req.params.gitID}`, {
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
                    }
                    console.log(obj);
                    res.statusCode = 400;
                    res.send(obj);
                });
            });
        }
        public getUserStack(req: Request, res: Response, next: NextFunction) {
            axios.get(`https://api.stackexchange.com/2.2/users/${req.params.stackID}`, {
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
                }
                console.log(obj);
                res.statusCode = 400;
                res.send(obj);
            });
        }
        public sendSMSToken(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            axios.post('https://ideabiz.lk/apicall/pin/verify/v1/verify',
                {
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
                    }
                    console.log(obj);
                    res.statusCode = 400;
                    res.send(obj);
                });

        }
        public verifySMSToken(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;
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
                }).then(response => {
                    // console.log(response.data);
                    res.send(response.data);

                }).catch(err => {
                    var obj = {
                        status: 'verifying token failed'
                    }
                    console.log(obj);
                    res.statusCode = 400;
                    res.send(obj);
                });


        }
        public AddUser(req: Request, res: Response, next: NextFunction) {
            //first retrieve to check for dulicates
            var paramsG = {
                TableName: "Users",
                Key: {
                    "email": req.body.email
                }
            };

            console.log(paramsG);

            docClient.get(paramsG, function (err: any, data: any) {
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
                        docClient.put(params, function (err1: any, data1: any) {
                            if (err1) {
                                console.log(err1);

                                res.statusCode = 500;
                                res.send({ status: "DB Crashed While Adding New User" });
                            } else {
                                const params2 = {
                                    TableName: 'PhoneNumbers',
                                    Item: { telephone: req.body.phoneNumber, email: req.body.email }
                                };
                                docClient.put(params2, function (err2: any, data2: any) {
                                    if (err2) { 
                                        console.log(err2);

                                    }
                                });
                                res.statusCode = 200;
                                res.send({ status: 'User Added Successfully' });
                            }
                        });

                    } else {
                        res.statusCode = 201;
                        res.send({ status: "Email Address is Already Registered" });
                    }
                }
            })

        }
        public GetUser(req: Request, res: Response, next: NextFunction) {
            var params = {
                TableName: "Users",
                Key: {
                    "email": req.params.email
                }
            };
            docClient.get(params, function (err: any, data: any) {
                if (err) {
                    res.statusCode = 500;
                    res.send({ status: 'DB Crash' });
                }
                else if (JSON.stringify(data.Item, null, 2) == null) {
                    res.statusCode = 200;
                    res.send(null);
                } else {
                    res.statusCode = 200;
                    res.send(data.Item);
                }

            })

        }
        public EmailAvailability(req: Request, res: Response, next: NextFunction) {
            //first retrieve to check for dulicates
            var paramsG = {
                TableName: "Users",
                Key: {
                    "email": req.params.email
                }
            };
            console.log(paramsG);

            docClient.get(paramsG, function (err: any, data: any) {
                if (err) {
                    console.log(err)
                    res.statusCode = 501;
                    res.send({ status: "DB Crashed while checking whether the user object exists" });
                }
                else {
                    if (JSON.stringify(data.Item, null, 2) == null) {
                        res.statusCode = 200;
                        res.send({ available: true });

                    } else {
                        res.statusCode = 200;
                        res.send({ available: false });
                    }
                }
            })

        }
        public MobileNumberAvailability(req: Request, res: Response, next: NextFunction) {
            //first retrieve to check for dulicates
            var paramsG = {
                TableName: "PhoneNumbers",
                Key: {
                    "telephone": req.params.mobileNumber
                }
            };
            console.log(paramsG);

            docClient.get(paramsG, function (err: any, data: any) {
                if (err) {
                    console.log(err)

                    res.statusCode = 501;
                    res.send({ status: "DB Crashed while checking whether the user object exists" });
                }
                else {
                    if (JSON.stringify(data.Item, null, 2) == null) {
                        res.statusCode = 200;
                        res.send({ available: true });

                    } else {
                        res.statusCode = 200;
                        res.send({ available: false });
                    }
                }
            })

        }
    }
}