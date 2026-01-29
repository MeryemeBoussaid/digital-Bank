import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { AccountsService } from '../services/accounts.service';
import { Customer } from '../model/customer.model';

@Component({
    selector: 'app-new-account',
    templateUrl: './new-account.component.html',
    styleUrl: './new-account.component.css'
})
export class NewAccountComponent implements OnInit {
    newAccountForm!: FormGroup;
    customers: Customer[] = [];
    loading: boolean = false;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private customerService: CustomerService,
        private accountsService: AccountsService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.newAccountForm = this.fb.group({
            customerId: ['', Validators.required],
            accountType: ['CurrentAccount', Validators.required],
            initialBalance: [0, [Validators.required, Validators.min(0)]],
            overdraft: [0],
            interestRate: [0]
        });

        this.loadCustomers();

        // Show/hide fields based on account type
        this.newAccountForm.get('accountType')?.valueChanges.subscribe(type => {
            if (type === 'CurrentAccount') {
                this.newAccountForm.get('overdraft')?.enable();
                this.newAccountForm.get('interestRate')?.disable();
            } else {
                this.newAccountForm.get('overdraft')?.disable();
                this.newAccountForm.get('interestRate')?.enable();
            }
        });
    }

    loadCustomers(): void {
        this.customerService.getCustomers().subscribe({
            next: (data) => {
                this.customers = data;
            },
            error: (err) => {
                this.errorMessage = 'Error loading customers';
                console.error(err);
            }
        });
    }

    onSubmit(): void {
        if (this.newAccountForm.valid) {
            this.loading = true;
            const formValue = this.newAccountForm.value;

            this.accountsService.saveAccount(formValue).subscribe({
                next: (data) => {
                    alert('Account created successfully!');
                    this.router.navigate(['/admin/accountsList']);
                },
                error: (err) => {
                    this.errorMessage = 'Error creating account: ' + err.message;
                    this.loading = false;
                    console.error(err);
                }
            });
        }
    }

    onCancel(): void {
        this.router.navigate(['/admin/accountsList']);
    }
}
