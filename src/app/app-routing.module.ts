import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './modules/dashboard/presentation/dashboard-home/dashboard-home.component';
import { RegisterFormComponent } from './modules/forms/presentation/register-form/register-form.component';
import { LoginFormComponent } from './modules/forms/presentation/login-form/login-form.component';
import { ReportListComponent } from './modules/reports/presentation/report-list/report-list.component';
import { UserManualModule } from './modules/user-manual/user-manual.module';
import { ManualComponent } from './modules/user-manual/manual/manual.component';

const routes: Routes = [
  { path: '', component: RegisterFormComponent},
  { path: 'home', component: DashboardHomeComponent},
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'report', component: ReportListComponent},
  { path: 'help', component: ManualComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
