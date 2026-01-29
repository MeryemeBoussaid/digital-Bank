import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule, MatIconButton } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from "@angular/common/http";
import { MatTableModule } from "@angular/material/table";
import { NavbarComponent } from './navbar/navbar.component';
import { AccountsComponent } from './accounts/accounts.component';
import { CustomersComponent } from './customers/customers.component';
import { RouterModule } from "@angular/router";
import { HomeComponent } from './home/home.component';
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { LoginComponent } from './login/login.component';
import { AppHttpInterceptor } from "./interceptors/app-http.interceptor";
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfilComponent } from './profil/profil.component';
import { MatAccordion, MatExpansionModule } from "@angular/material/expansion";
import { TemplateComponent } from './template/template.component';
import { MyAccountsComponent } from './my-accounts/my-accounts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MatDividerModule } from "@angular/material/divider";
import { NewAccountComponent } from './new-account/new-account.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AlertsComponent } from './alerts/alerts.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccountsComponent,
    CustomersComponent,
    HomeComponent,
    NewCustomerComponent,
    EditCustomerComponent,
    LoginComponent,
    NotAuthorizedComponent,
    DashboardComponent,
    ProfilComponent,
    TemplateComponent,
    MyAccountsComponent,
    AccountDetailsComponent,
    NewAccountComponent,
    TransactionsComponent,
    AlertsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatAccordion,
    MatExpansionModule,
    MatDividerModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
