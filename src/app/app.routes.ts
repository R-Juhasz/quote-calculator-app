import { Routes } from '@angular/router';
import { QuoteFormComponent } from './components/quote-form/quote-form.component';
import { QuoteHistoryComponent } from './components/quote-history/quote-history.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'quote', pathMatch: 'full' },
  { path: 'quote', component: QuoteFormComponent },
  { path: 'history', component: QuoteHistoryComponent },
  { path: 'login', component: LoginComponent }
];
