import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service'; // ✅ Importa el nuevo servicio

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

  authData = { email: '', password: '' };
  currentUser: { email: string; password: string } | null = null;

  constructor(
    private authService: AuthService,
    private modalService: ModalService // ✅ Inyectamos el servicio
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.authService.restoreSession(this.currentUser?.email || '');
    }

    // 🔥 Suscribirse al estado del modal
    this.modalService.authModalVisible$.subscribe((isVisible: boolean) => {
      this.showAuthModal = isVisible;
    });
  }

  // Abrir modal desde el mismo Home
  openAuthModal() {
    this.modalService.openAuthModal();
  }

  // Cerrar modal
  closeAuthModal() {
    this.modalService.openAuthModal();
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
      localStorage.setItem('user', JSON.stringify(this.authData));
      this.currentUser = { ...this.authData };
      this.authService.login(this.authData.email);
      alert('✅ Cuenta registrada con éxito');
    } else {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.email === this.authData.email && user.password === this.authData.password) {
          this.currentUser = user;
          this.authService.login(user.email);
          alert(`👋 Bienvenido de nuevo, ${user.email}`);
        } else {
          alert('❌ Correo o contraseña incorrectos');
          return;
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
