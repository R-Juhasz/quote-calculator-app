import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { QuoteHistoryComponent } from './components/quote-history/quote-history.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'quote', component: QuoteFormComponent },
  { path: 'history', component: QuoteHistoryComponent },
  { path: '**', redirectTo: '' } // Redirect unknown paths to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
