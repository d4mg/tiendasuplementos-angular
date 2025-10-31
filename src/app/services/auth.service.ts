import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalService } from './../services/modal.service';

export interface User {
  email: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  constructor(private modalService: ModalService) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  login(email: string, password: string): boolean {
    if (email && password) {
      const isAdmin = email === 'admin1@gmail.com' && password === '123456';
      const user: User = {
        email,
        isAdmin
      };

      this.userSubject.next(user);
      localStorage.setItem('user', JSON.stringify(user));
      this.isLoggedInSubject.next(true);
      this.modalService.closeAuthModal();
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  isAdmin(): boolean {
    const user = this.userSubject.value;
    return user ? user.isAdmin : false;
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}
