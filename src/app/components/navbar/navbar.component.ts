import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service'; // ✅ Importa el servicio del modal

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isDropdownOpen = false;
  isLoggedIn = false;
  isAdmin = false;
  userEmail: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    // suscripción al estado de autenticación
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
      this.userEmail = user?.email || null;
      this.isAdmin = user?.isAdmin || false;
    });

    this.authService.user$.subscribe(user => {
      this.userEmail = user?.email || null;
    });
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // opcional: redirigir al inicio
  }

  // ✅ Método limpio para abrir el modal del HomeComponent
  openAuthModal() {
    this.modalService.openAuthModal(); // 🚀 Activa el modal desde el servicio
  }
}
