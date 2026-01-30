import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-customer-dashboard',
    templateUrl: './customer-dashboard.component.html',
    styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
    customerAccounts: any[] = [];
    loading: boolean = true;
    customerId: number = 0;
    customerName: string = '';

    constructor(
        public authService: AuthService,
        private http: HttpClient
    ) { }

    ngOnInit(): void {
        this.customerId = this.authService.customerId;
        this.customerName = this.authService.username;
        this.loadAccounts();
    }

    loadAccounts(): void {
        console.log('📊 Loading accounts for customer ID:', this.customerId);
        this.http.get<any[]>(`http://localhost:8080/customers/${this.customerId}/accounts`).subscribe({
            next: (accounts) => {
                console.log('✅ Accounts loaded:', accounts);
                this.customerAccounts = accounts;
                this.loading = false;
            },
            error: (err) => {
                console.error('❌ Error loading accounts:', err);
                this.loading = false;
            }
        });
    }

    getTotalBalance(): number {
        return this.customerAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    }
}
