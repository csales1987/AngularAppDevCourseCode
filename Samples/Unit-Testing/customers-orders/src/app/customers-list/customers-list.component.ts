import { Component, Input, OnInit } from '@angular/core';

import { ICustomer } from '../shared/interfaces';
import { SorterService } from '../core/sorter.service';

@Component({
    selector: 'co-customers-list',
    templateUrl: './customers-list.component.html'
})
export class CustomersListComponent implements OnInit {
    private _customers: ICustomer[] = [];

    title: string;
    @Input() get customers(): ICustomer[] { 
        return this._customers; 
    };
    set customers(value: ICustomer[]) { 
        if (value) {
            this.filteredCustomers = this._customers = value; 
            this.calculateOrders();
        }
    }
    filteredCustomers: ICustomer[] = [];
    customersOrderTotal: number;
    currencyCode: string = 'USD';

    constructor(private sorter: SorterService) { }

    ngOnInit() { 
        this.title = 'Customers';
    }

    calculateOrders() {
        this.customersOrderTotal = 0;
        this.filteredCustomers.forEach((cust: ICustomer) => {
            this.customersOrderTotal += cust.orderTotal;
        });
    }

    filter(data: string) {
        if (data) {
            this.filteredCustomers = this.customers.filter((cust: ICustomer) => {
                return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1;
            });
            this.calculateOrders();
        } else {
            this.filteredCustomers = this.customers;
        }
    }

    sort(prop: string) {
        this.sorter.sort(this.filteredCustomers, prop);
    }

    customerTrackBy(index: number, customer: ICustomer) {
        return customer.id;
    }

}