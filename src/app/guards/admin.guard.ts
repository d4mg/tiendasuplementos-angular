import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate() {
    return this.authService.user$.pipe(
      map(user => {
        if (user?.isAdmin) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}