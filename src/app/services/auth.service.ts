import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModalService } from './../services/modal.service'; // ✅ Importa tu servicio del modal

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  private userEmailSubject = new BehaviorSubject<string | null>(null);
  public userEmail$: Observable<string | null> = this.userEmailSubject.asObservable();

  constructor(private modalService: ModalService) { // ✅ Inyecta el modalService
    const storedUser = localStorage.getItem('userEmail');
    if (storedUser) {
      this.userEmailSubject.next(storedUser);
      this.isLoggedInSubject.next(true);
    }
  }

  restoreSession(email: string) {
    this.userEmailSubject.next(email);
    this.isLoggedInSubject.next(true);
  }

  login(email: string): boolean {
    if (email) {
      this.userEmailSubject.next(email);
      localStorage.setItem('userEmail', email);
      this.isLoggedInSubject.next(true);

      // 🚀 Cerrar el modal automáticamente al iniciar sesión
      this.modalService.closeAuthModal();
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('userEmail');
    this.userEmailSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getUserEmail(): string | null {
    return this.userEmailSubject.value;
  }
}
