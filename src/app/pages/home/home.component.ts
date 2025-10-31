import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { User, AuthData } from '../../models/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showAuthModal = false;
  isRegisterMode = false;

  authData: AuthData = { email: '', password: '' };
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private modalService: ModalService // ✅ Inyectamos el servicio
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }

    // 🔥 Suscribirse al estado del modal
    this.modalService.authModalVisible$.subscribe((isVisible: boolean) => {
      this.showAuthModal = isVisible;
    });

    // Suscribirse al estado de autenticación
    this.authService.user$.subscribe(user => {
      if (user) {
        this.currentUser = {
          email: user.email,
          password: this.authData.password
        };
      } else {
        this.currentUser = null;
      }
    });
  }

  // Abrir modal desde el mismo Home
  openAuthModal() {
    this.modalService.openAuthModal();
  }

  // Cerrar modal
  closeAuthModal() {
    this.modalService.closeAuthModal();
    this.authData = { email: '', password: '' };
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isRegisterMode = !this.isRegisterMode;
  }

  onSubmit() {
    if (!this.authData.email || !this.authData.password) {
      alert('⚠️ Debes llenar todos los campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.authData.email)) {
      alert('⚠️ Ingresa un correo electrónico válido.');
      return;
    }

    if (this.authData.password.length < 6) {
      alert('⚠️ La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (this.isRegisterMode) {
      this.currentUser = { ...this.authData };
      const success = this.authService.login(this.authData.email, this.authData.password);
      if (success) {
        alert('✅ Cuenta registrada con éxito');
      }
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === this.authData.email) {
          const success = this.authService.login(this.authData.email, this.authData.password);
          if (success) {
            alert(`👋 Bienvenido de nuevo, ${user.email}`);
          } else {
            alert('❌ Correo o contraseña incorrectos');
          }
        } else {
          alert('❌ Correo o contraseña incorrectos');
        }
      } else {
        alert('⚠️ No existe ninguna cuenta registrada. Regístrate primero.');
        return;
      }
    }

    this.closeAuthModal();
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser = null;
    this.authService.logout();
    alert('👋 Sesión cerrada');
  }
}
