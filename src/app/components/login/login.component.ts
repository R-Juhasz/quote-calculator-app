import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], 

})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  user: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
    });
  }

  async login() {
    this.error = '';
    try {
      await signInWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/quote']);
    } catch (err: any) {
      this.error = err.message || 'Login failed';
    }
  }

  async register() {
    this.error = '';
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      this.router.navigate(['/quote']);
    } catch (err: any) {
      this.error = err.message || 'Registration failed';
    }
  }

  async logout() {
    await signOut(this.auth);
    this.user = null;
  }

  get userEmail(): string {
    return this.user?.email ?? 'User';
  }
}
