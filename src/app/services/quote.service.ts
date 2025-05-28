import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';

export interface Quote {
  type: string;
  width: number;
  height: number;
  material: string;
  price: number;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private quotes: Quote[] = [];
  private quotesSubject = new BehaviorSubject<Quote[]>([]);

  constructor(private auth: Auth, private firestore: Firestore) {
    // Subscribe to auth state changes to load quotes only when user is logged in
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.loadQuotes();
      } else {
        this.quotes = [];
        this.quotesSubject.next(this.quotes);
      }
    });
  }

  async loadQuotes() {
    const user = this.auth.currentUser;
    if (!user) {
      this.quotes = [];
      this.quotesSubject.next(this.quotes);
      return;
    }

    try {
      const q = query(collection(this.firestore, 'quotes'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      this.quotes = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Log date field for debugging
        console.log('Loaded date:', data['date']);
        this.quotes.push({
          type: data['type'],
          width: data['width'],
          height: data['height'],
          material: data['material'],
          price: data['price'],
          date: data['date']
            ? data['date'].toDate
              ? data['date'].toDate()
              : new Date(data['date'])
            : new Date(), // fallback to current date if missing
        });
      });
      this.quotesSubject.next(this.quotes);
    } catch (error) {
      console.error('Error loading quotes:', error);
    }
  }

  async addQuote(quote: Quote): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('User must be logged in to save quotes');
    }

    try {
      await addDoc(collection(this.firestore, 'quotes'), {
        ...quote,
        userId: user.uid,
        date: quote.date,
      });
      this.quotes = [...this.quotes, quote];
      this.quotesSubject.next(this.quotes);
    } catch (error) {
      console.error('Error saving quote:', error);
      throw error; // rethrow so component can catch it
    }
  }

  getQuotes(): Observable<Quote[]> {
    return this.quotesSubject.asObservable();
  }
}
