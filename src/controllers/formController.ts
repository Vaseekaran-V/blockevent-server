import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response } from "express";
// import { Network, Server, Keypair, Asset, TransactionBuilder, Operation, Transaction } from 'stellar-sdk';
// import { Server, Network, Keypair, Transaction } from "stellar-base";
// var server = new Server('https://horizon-testnet.stellar.org');
// Network.useTestNetwork();
// import { admin } from '../firebase/admin'
import axios from 'axios';
import { AWS } from '../dao/index';

let docClient = new AWS.DynamoDB.DocumentClient();
export namespace formController {
    export class formData {
        public addForm(req: Request, res: Response, next: NextFunction) {
            //console.log(req.body);

            const params = {
                TableName: 'Forms',
                Item: req.body
            };
            docClient.put(params, function (err1: any, data1: any) {
                if (err1) {
                    //console.log(err1);

                    res.statusCode = 500;
                    res.send({ status: "DB Crashed While Adding the registration form" });
                } else {
                    req.body.isRegistered = true;
                    var paramsG = {
                        TableName: "Users",
                        Key: {
                            "email": req.body.email
                        }
                    };
                    docClient.get(paramsG, function (err2: any, data2: any) {
                        if (err2) {
                            res.statusCode = 500;
                            res.send({ status: "DB Crashed While Validating User" });
                        } else {
                            if (JSON.stringify(data2.Item, null, 2) != null) {
                                data2.Item.isRegistered = true;
                                const params = {
                                    TableName: 'Users',
                                    Item: data2.Item
                                };
                                docClient.put(params, function (err3: any, data3: any) {
                                    if (err3) {
                                        //console.log(err3);
                                    } else {
                                        res.statusCode = 200;
                                        res.send({ status: 'Registration form Added Successfully' });
                                    }
                                });
                            } else {
                                res.statusCode = 400;
                                res.send({ status: 'User email invalid' });
                            }

                        }
                    })

                }
            });

        }

        public getForm(req: Request, res: Response, next: NextFunction) {

            var paramsG = {
                TableName: 'PhoneNumbers',
                Key: {
                    "telephone": req.body.phoneNumber
                }
            };
            docClient.get(paramsG, function (err2: any, data2: any) {
                if (err2) {
                    console.log("first error" + err2);
                    res.statusCode = 500;
                    res.send({ status: "DB Crashed While Validating User" });
                } else {
                    if (JSON.stringify(data2.Item, null, 2) != null) {
                        var paramsE = {
                            TableName: 'Forms',
                            Key: {
                                "email": data2.Item.email
                            }
                        };
                        docClient.get(paramsE, function (err3: any, data3: any) {
                            if (err3) {
                                console.log("second error" + err3);
                                res.statusCode = 500;
                                res.send({ status: "DB Crashed While Validating User" });
                            } else {
                                console.log(data3.Item);
                                if (JSON.stringify(data3.Item, null, 2) != null) {
                                    // res.send(data3.Item);
                                    res.send({
                                        name: data3.Item.fname,
                                        phoneNumber: data3.Item.phoneNumber,
                                        tshirtSize: data3.Item.tshirtSize,
                                        mealPreference: data3.Item.mealPreference
                                    });

                                } else {
                                    res.statusCode = 400;
                                    res.send({ status: 'User email invalid' });
                                }

                            }
                        })
                    } else {
                        res.statusCode = 400;
                        res.send({ status: 'User phoneNumber invalid' });
                    }

                }
            })





        }
    }
}