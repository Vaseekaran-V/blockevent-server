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


        public getUserGitHub(req: Request, res: Response, next: NextFunction) {
            axios.get(`https://api.github.com/users/${req.params.gitID}`, {
                params:{
                  client_id: 'd043583aba9242a12df8',
                  client_secret: 'f31a713d397670fa4d79eaffade66effb9d91e2d'
              }
              }).then(response => {
                // console.log(response.data);
                res.send(response.data);              
            }).catch(err => {
                var obj = {
                    status: 'getting dataFailed'
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
        public signUserTicket(req: Request, res: Response, next: NextFunction) {
            // var userId = firebase.auth().currentUser.uid;
            console.log(req.body);
            const sourceKeypair = Keypair.fromSecret('SBVB4S5BUNUNRLMBF7LJC6DQAAGCPHD6KASBJYVNL4SXARAQYMFWA6LB');

            var obj = {
                //@ts-ignore
                'status': '205',
                //@ts-ignore
                'statusText': 'Error in request body',
            };

            if (req.body.xdr) {
                const parsedTx = new Transaction(req.body.xdr)

                parsedTx.sign(sourceKeypair)
                let publicKey = parsedTx.source
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
                                email: req.body.email,
                                ticketCount: 1,
                                publicKey: publicKey,
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