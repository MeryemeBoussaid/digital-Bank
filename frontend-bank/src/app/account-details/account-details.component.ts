import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-account-details',
    templateUrl: './account-details.component.html',
    styleUrl: './account-details.component.css'
})
export class AccountDetailsComponent implements OnInit {
    accountId!: string;
    accountDetails: any;
    operations: any[] = [];
    currentPage: number = 0;
    pageSize: number = 5;
    totalPages: number = 0;
    loading: boolean = true;
    errorMessage: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private accountsService: AccountsService,
        public authService: AuthService
    ) { }

    ngOnInit(): void {
        this.accountId = this.route.snapshot.params['id'];
        this.loadAccountDetails();
    }

    loadAccountDetails(): void {
        this.loading = true;
        this.accountsService.getAccount(this.accountId, this.currentPage, this.pageSize).subscribe({
            next: (data) => {
                this.accountDetails = data;
                this.operations = data.accountOperations;
                this.totalPages = data.totalPages;
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Error loading account details';
                this.loading = false;
                console.error(err);
            }
        });
    }

    goToPage(page: number): void {
        this.currentPage = page;
        this.loadAccountDetails();
    }

    getAccountType(): string {
        return this.accountDetails?.type === 'CurrentAccount' ? 'Current Account' : 'Saving Account';
    }

    goBack(): void {
        this.router.navigate(['/user/my-accounts']);
    }
}
