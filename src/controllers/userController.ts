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

        public signUserTicket(req: Request, res: Response, next: NextFunction): Promise<any> {
            // var userId = firebase.auth().currentUser.uid;
            console.log(req.body);
            const sourceKeypair = Keypair.fromSecret('SCRQA4B4EGD463RMX4ZCSW56S6QIOUQG5BHSPNE6XRSOEBKB5RSLD7NG');

            if (req.body.xdr) {
                const parsedTx = new Transaction(req.body.xdr)
                parsedTx.sign(sourceKeypair)
                let x = parsedTx.toEnvelope().toXDR().toString('base64')
                console.log(x);
                var obj;

                server.submitTransaction(parsedTx)
                    .then(function (transactionResult) {

                        obj = {
                            //@ts-ignore
                            'status': transactionResult.response.status,
                            //@ts-ignore
                            'statusText': transactionResult.response.statusText,

                        }

                        //@ts-ignore
                        console.log(transactionResult.response.status);
                        //@ts-ignore
                        console.log(transactionResult.response.statusText);
                    }).catch(function (err) {
                        console.log(err);
                    })


                return;
            } else {
                return;
            }


        }

    }
}