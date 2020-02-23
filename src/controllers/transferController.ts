import firebase from '../firebase/fireConnection';
import { NextFunction, Request, Response } from "express";
import { Network, Server, Keypair, Asset, TransactionBuilder, Operation, Transaction } from 'stellar-sdk';
// import { Server, Network, Keypair, Transaction } from "stellar-base";
var server = new Server('https://horizon-testnet.stellar.org');
Network.useTestNetwork();
// import { admin } from '../firebase/admin'
import axios from 'axios';

export namespace transferController {
    export class transferData {
        public transferUserTicket(req: Request, res: Response, next: NextFunction) {
            
        }
    }
}