import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private authModalVisible = new BehaviorSubject<boolean>(false);
  authModalVisible$ = this.authModalVisible.asObservable();

  openAuthModal() {
    this.authModalVisible.next(true);
  }

  closeAuthModal() {
    this.authModalVisible.next(false);
  }
}
