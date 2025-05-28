import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quote, QuoteService } from '../services/quote.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quote',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.quoteService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
    });
  }

  async addSampleQuote() {
    const newQuote: Quote = {
      type: 'Window',
      width: 100,
      height: 200,
      material: 'Wood',
      price: 150,
      date: new Date(),
    };

    try {
      await this.quoteService.addQuote(newQuote);
      alert('Quote saved!');
    } catch (error: any) {
      alert(error.message || 'Could not save quote');
    }
  }
}

