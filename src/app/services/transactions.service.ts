import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private getTrasactionsUrl: string = "http://localhost:8080/transaction/";
  private getBalanceUrl: string = "http://localhost:8080/balance/";

  constructor(private http: HttpClient) { }

  getTransactionList(){
    return this.http.get(this.getTrasactionsUrl)
    .pipe(map(responseData => {
      const transactions : Transaction[] = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          transactions.push( {...responseData[key]} )
        }
      }
      return transactions;
    }));
  }

  getBalance(){
    return this.http.get(this.getBalanceUrl)
    .pipe(map(responseData => {
      return responseData['balance'];
    }));
  }
}