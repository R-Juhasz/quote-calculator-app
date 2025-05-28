import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuoteService, Quote } from '../../services/quote.service';

@Component({
  selector: 'app-quote-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-history.component.html',
  styleUrls: ['./quote-history.component.scss'],
})
export class QuoteHistoryComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.quoteService.getQuotes().subscribe((quotes) => {
      this.quotes = quotes;
    });
  }
}
