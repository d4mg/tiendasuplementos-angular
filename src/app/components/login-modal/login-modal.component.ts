import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent {
  showAuthModal = false;
  isRegisterMode = false;

  authData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {
    // Escuchar cambios desde el servicio
    this.modalService.authModalVisible$.subscribe((visible: boolean) => {
      this.showAuthModal = visible;
    });
  }

  toggleMode(event: Event) {
    event.preventDefault();
    this.isRegisterMode = !this.isRegisterMode;
  }

  closeAuthModal() {
    this.modalService.closeAuthModal();
  }

  onSubmit() {
    const { email, password } = this.authData;

    if (this.isRegisterMode) {
      // Simulación de registro
      const success = this.authService.login(email, password);
      if (success) {
        alert('Cuenta creada correctamente ✅');
        this.closeAuthModal();
      }
    } else {
      // Intento de inicio de sesión
      const success = this.authService.login(email, password);
      if (success) {
        this.closeAuthModal();
      } else {
        alert('Error al iniciar sesión ❌');
      }
    }
  }
}
