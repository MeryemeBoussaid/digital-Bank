import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    console.log('🔐 Login attempt:', { username, password });

    // First, try customer authentication
    this.http.get(`http://localhost:8080/customers/by-username/${username}`).subscribe({
      next: (customer: any) => {
        console.log('✅ Customer found:', customer);
        // Customer found, check password
        if (customer && customer.password === password) {
          console.log('✅ Password matches! Loading customer profile...');
          this.authService.loadCustomerProfile(customer.id, customer.username);
          console.log('✅ Navigating to customer dashboard...');
          this.router.navigateByUrl("/customer/dashboard");
        } else {
          console.log('❌ Password does not match');
          this.showError();
        }
      },
      error: (err) => {
        console.log('❌ Customer not found, trying admin/user/manager authentication...', err);
        // Not a customer, try admin/user/manager authentication
        this.authService.login(username, password).subscribe({
          next: data => {
            console.log('✅ Admin/User/Manager login successful:', data);
            this.authService.loadProfile(data);
            if (this.authService.isAdmin()) {
              this.router.navigateByUrl("/admin/home");
            } else {
              this.router.navigateByUrl("/user/home");
            }
          },
          error: error => {
            console.log('❌ Admin/User/Manager login failed:', error);
            this.showError();
          }
        });
      }
    });
  }

  showError() {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    }).fire({
      icon: 'error',
      title: 'Email or password incorrect'
    });
  }
}
