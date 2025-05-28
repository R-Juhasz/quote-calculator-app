import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quote-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-result.component.html',
  styleUrls: ['./quote-result.component.scss']
})
export class QuoteResultComponent {
  @Input() quote: number | null = null;
}
