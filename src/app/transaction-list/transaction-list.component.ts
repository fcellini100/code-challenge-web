import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../services/transactions.service';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  private transactions: Transaction[] = [];
  private isFetching: boolean;
  private balance: number;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.fetchTransactions();
  }

  onFetchTransactions(){
    this.fetchTransactions();
  }

  private fetchTransactions(){
    this.isFetching = true;
    this.transactionsService.getTransactionList().subscribe(responseData => {
      
      this.transactions =  responseData;

      this.transactionsService.getBalance().subscribe(balance => {
        this.isFetching = false;
        this.balance = balance
      })

     },err => {
        this.isFetching = false;
        console.error('HTTP Error', err);
     });
  }

}
