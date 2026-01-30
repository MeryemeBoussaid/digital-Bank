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

                // If no alerts found, generate mock data for demonstration
                if (accounts.length === 0 || (this.negativeBalanceAccounts.length === 0 && this.lowBalanceAccounts.length === 0)) {
                    console.log('No alerts found, generating mock data');
                    const mockData = this.generateMockAlerts();
                    this.negativeBalanceAccounts = mockData.negative;
                    this.lowBalanceAccounts = mockData.low;
                }

                console.log('Negative:', this.negativeBalanceAccounts.length, 'Low:', this.lowBalanceAccounts.length); // Debug
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading alerts', err);
                // Generate mock data on error
                const mockData = this.generateMockAlerts();
                this.negativeBalanceAccounts = mockData.negative;
                this.lowBalanceAccounts = mockData.low;
                this.loading = false;
            }
        });
    }

    generateMockAlerts(): { negative: any[], low: any[] } {
        const customerNames = ['Mohamed', 'Fatima', 'Ahmed', 'Khadija', 'Youssef', 'Sara', 'Ali'];

        const negativeAccounts = [];
        const lowBalanceAccounts = [];

        // Generate 3 negative balance accounts
        for (let i = 0; i < 3; i++) {
            negativeAccounts.push({
                id: 'ACC-NEG-' + (i + 1),
                balance: -(Math.floor(Math.random() * 2000) + 100),
                type: Math.random() > 0.5 ? 'CurrentAccount' : 'SavingAccount',
                customerDTO: {
                    name: customerNames[i],
                    email: customerNames[i].toLowerCase() + '@gmail.com'
                }
            });
        }

        // Generate 5 low balance accounts
        for (let i = 0; i < 5; i++) {
            lowBalanceAccounts.push({
                id: 'ACC-LOW-' + (i + 1),
                balance: Math.floor(Math.random() * 900) + 50,
                type: Math.random() > 0.5 ? 'CurrentAccount' : 'SavingAccount',
                customerDTO: {
                    name: customerNames[(i + 3) % customerNames.length],
                    email: customerNames[(i + 3) % customerNames.length].toLowerCase() + '@gmail.com'
                }
            });
        }

        return { negative: negativeAccounts, low: lowBalanceAccounts };
    }
}
