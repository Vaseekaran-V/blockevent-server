import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response } from "express";
import { Network, Server, Keypair, Asset, TransactionBuilder, Operation, Transaction } from 'stellar-sdk';
// import { Server, Network, Keypair, Transaction } from "stellar-base";
var server = new Server('https://horizon-testnet.stellar.org');
Network.useTestNetwork();
// import { admin } from '../firebase/admin'
import axios from 'axios';

export namespace userController {
    export class UserData {


        public writeUserData(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;
            const now = new Date();
            const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
            return firebase.database()
                .ref('users/' + req.body.userId)
                .set(req.body, function (error) {
                    if (error) {
                        res.send({ message: "Failed" });// The write failed...
                    } else {
                        res.send({ message: "Success" });
                        // Data saved successfully!
                    }
                });
        }


        public updateUserData(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;

            // const pushToken=req.body.pushToken;
            const lol = firebase.database()
                .ref('users/' + req.body.userId);

            return lol.update(
                req.body
                , function (error) {
                    if (error) {
                        res.send({ message: "Failed" });// The write failed...
                    } else {
                        res.send({ message: "Success" });
                        // Data saved successfully!
                    }
                });
        }


        public getUserData(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;

            return firebase.database().ref('/users/' + req.params.userId)
                .once('value')
                .then(function (snapshot) {
                    const lol = snapshot.val();
                    return lol;
                }).catch(() => {
                    //console.log("error");
                });
        }

        public signUserTicket(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;
            console.log(req.body);
            const sourceKeypair = Keypair.fromSecret('SCRQA4B4EGD463RMX4ZCSW56S6QIOUQG5BHSPNE6XRSOEBKB5RSLD7NG');

            var obj = {
                //@ts-ignore
                'status': '205',
                //@ts-ignore
                'statusText': 'Error in request body',
            };

            if (req.body.xdr) {
                const parsedTx = new Transaction(req.body.xdr)
                parsedTx.sign(sourceKeypair)
                let x = parsedTx.toEnvelope().toXDR().toString('base64')
                console.log(x);
                // var obj = {
                //     //@ts-ignore
                //     'status': '205',
                //     //@ts-ignore
                //     'statusText': 'Error in request body',
                // };

                server.submitTransaction(parsedTx)
                    .then(function (transactionResult) {
                        firebase.database().ref(`tickets/${transactionResult.hash}`)
                            .set({
                                eventID: req.body.eventID,
                                emailHash: req.body.emailHash,
                                ticketCount: 1,
                                status: "pending"
                            }).then(() => {
                                firebase.database().ref(`users/${req.body.emailHash}/events/${req.body.eventID}`)
                                    .set({
                                        ticketID: transactionResult.hash
                                    }).then(() => {
                                        console.log(transactionResult);
                                        obj.status = '201';
                                        obj.statusText = 'Success';
                                        res.send(obj);
                                    }).catch(() => {

                                    })
                            }).catch(() => {

                            })
                    }).catch(function (err) {
                        console.log(err.response);
                        obj.status = '203'
                        obj.statusText = 'Error submitting to Stellar';
                        res.send(obj);

                    })

            } else {
                res.send(obj);
            }


        }

    }
}