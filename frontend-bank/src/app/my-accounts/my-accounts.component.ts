import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-my-accounts',
    templateUrl: './my-accounts.component.html',
    styleUrl: './my-accounts.component.css'
})
export class MyAccountsComponent implements OnInit {
    accounts: any[] = [];
    loading: boolean = true;
    errorMessage: string = '';

    constructor(
        private accountsService: AccountsService,
        public authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loadAccounts();
    }

    loadAccounts(): void {
        this.accountsService.getAccounts().subscribe({
            next: (data) => {
                this.accounts = data;
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Error loading accounts';
                this.loading = false;
                console.error(err);
            }
        });
    }

    viewAccountDetails(accountId: string): void {
        this.router.navigate(['/user/account', accountId]);
    }

    getAccountType(account: any): string {
        return account.type === 'CurrentAccount' ? 'Current Account' : 'Saving Account';
    }
}
