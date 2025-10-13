import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  onSubmit() {
    alert('¡Tu mensaje ha sido enviado con éxito! 📩');
    // Aquí en un futuro puedes conectar con un backend o servicio de email
  }

}
