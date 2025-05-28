import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { QuoteService, Quote } from '../../services/quote.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrls: ['./quote-form.component.scss'],
  template: `
    <div class="form-wrapper">
      <form (ngSubmit)="submitQuote()" #form="ngForm" class="form-card">
        <h2>New Quote</h2>

        <label for="type">Type:</label>
        <select id="type" [(ngModel)]="type" name="type" required>
          <option *ngFor="let t of types" [value]="t">{{ t }}</option>
        </select>

        <label for="width">Width:</label>
        <input id="width" type="number" [(ngModel)]="width" name="width" required />

        <label for="height">Height:</label>
        <input id="height" type="number" [(ngModel)]="height" name="height" required />

        <label for="material">Material:</label>
        <select id="material" [(ngModel)]="material" name="material" required>
          <option *ngFor="let m of materials" [value]="m">{{ m }}</option>
        </select>

        <label for="price">Price:</label>
        <input id="price" type="number" [(ngModel)]="price" name="price" required />

        <button type="submit" [disabled]="!form.form.valid">Save Quote</button>

        <div *ngIf="!user" class="login-warning">
          Please <a routerLink="/register">register</a> or <a routerLink="/login">login</a> to save quotes to your history.
        </div>
      </form>
    </div>
  `
})
export class QuoteFormComponent {
  types: string[] = ['standard', 'premium', 'custom'];
  materials: string[] = ['wood', 'metal', 'plastic', 'glass'];

  type: string = 'standard';
  width: number = 0;
  height: number = 0;
  material: string = 'wood';
  price: number = 0;

  user: any;

  private auth = inject(Auth);
  private quoteService = inject(QuoteService);

  constructor() {
    this.user = this.auth.currentUser;
    this.auth.onAuthStateChanged(user => {
      this.user = user;
    });
  }

  async submitQuote() {
    if (!this.user) {
      alert('Please register or login to save quotes.');
      return;
    }

    const quote: Quote = {
      type: this.type,
      width: this.width,
      height: this.height,
      material: this.material,
      price: this.price,
      date: new Date(),
    };

    try {
      await this.quoteService.addQuote(quote);
      alert('Quote saved!');
    } catch (err: any) {
      alert('Error saving quote: ' + (err.message || err));
    }
  }
}
