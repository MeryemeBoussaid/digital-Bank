import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrl: './alerts.component.css'
})
export class AlertsComponent implements OnInit {
    negativeBalanceAccounts: any[] = [];
    lowBalanceAccounts: any[] = [];
    loading: boolean = true;

    constructor(private accountsService: AccountsService) { }

    ngOnInit(): void {
        this.loadAlerts();
    }

    loadAlerts(): void {
        this.accountsService.getAccounts().subscribe({
            next: (accounts: any) => {
                console.log('Accounts for alerts:', accounts); // Debug
                this.negativeBalanceAccounts = accounts.filter((acc: any) => acc.balance < 0);
                this.lowBalanceAccounts = accounts.filter((acc: any) => acc.balance >= 0 && acc.balance < 1000);
                console.log('Negative:', this.negativeBalanceAccounts.length, 'Low:', this.lowBalanceAccounts.length); // Debug
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading alerts', err);
                this.loading = false;
            }
        });
    }
}
