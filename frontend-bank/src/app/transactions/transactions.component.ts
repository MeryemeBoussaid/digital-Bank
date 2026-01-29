import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
    allTransactions: any[] = [];
    filteredTransactions: any[] = [];
    loading: boolean = true;
    searchTerm: string = '';
    filterType: string = 'ALL';

    constructor(private accountsService: AccountsService) { }

    ngOnInit(): void {
        this.loadAllTransactions();
    }

    loadAllTransactions(): void {
        this.accountsService.getAccounts().subscribe({
            next: (accounts: any) => {
                this.allTransactions = [];
                console.log('Accounts loaded:', accounts); // Debug
                accounts.forEach((account: any) => {
                    if (account.accountOperations && account.accountOperations.length > 0) {
                        account.accountOperations.forEach((op: any) => {
                            this.allTransactions.push({
                                ...op,
                                accountId: account.accountId || account.id,
                                accountType: account.accountType || account.type,
                                customerName: account.customerDTO?.name || 'Unknown'
                            });
                        });
                    }
                });
                console.log('Total transactions:', this.allTransactions.length); // Debug
                // Sort by date descending
                this.allTransactions.sort((a, b) =>
                    new Date(b.operationDate).getTime() - new Date(a.operationDate).getTime()
                );
                this.filteredTransactions = [...this.allTransactions];
                this.loading = false;
            },
            error: (err) => {
                console.error('Error loading transactions', err);
                this.loading = false;
            }
        });
    }

    applyFilters(): void {
        this.filteredTransactions = this.allTransactions.filter(transaction => {
            const matchesType = this.filterType === 'ALL' || transaction.operationType === this.filterType;
            const matchesSearch = !this.searchTerm ||
                transaction.description?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                transaction.customerName?.toLowerCase().includes(this.searchTerm.toLowerCase());
            return matchesType && matchesSearch;
        });
    }

    getTotalAmount(type: string): number {
        return this.allTransactions
            .filter(t => t.operationType === type)
            .reduce((sum, t) => sum + t.amount, 0);
    }
}
