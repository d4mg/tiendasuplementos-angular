import { Component } from '@angular/core';
import { Producto } from '../../../models/producto.interface';
import { DecimalPipe, NgFor } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-creatinas',
  imports: [NgFor, DecimalPipe],
  templateUrl: './creatinas.component.html',
  styleUrl: './creatinas.component.css',
})
export class CreatinasComponent {
  productos: Producto[] = [
        {
          id: 1,
          nombre: 'Crea Stack',
          descripcion: 'Proteína de suero de leche ideal para recuperación muscular.',
          precio: 120000,
          imagen: '/assets/img/proteina1.png'
        },
        {
          id: 2,
          nombre: 'MuscleTech Creatina Platinum',
          descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
          precio: 95000,
          imagen: '/assets/img/proteina2.png'
        },
        {
          id: 3,
          nombre: 'Healthy Sports Creatina Monohidratada',
          descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
          precio: 95000,
          imagen: '/assets/img/proteina2.png'
        },
        {
          id: 4,
          nombre: 'Creatine Powder ON',
          descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
          precio: 95000,
          imagen: '/assets/img/proteina2.png'
        },
        {
          id: 5,
          nombre: 'Legacy Proscience',
          descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
          precio: 95000,
          imagen: '/assets/img/proteina2.png'
        },
        {
          id: 6,
          nombre: 'Creatina Monohidratada',
          descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
          precio: 95000,
          imagen: '/assets/img/proteina2.png'
        },
      ];

       constructor(private carritoService: CarritoService) {}

            agregarAlCarrito(producto: Producto) {
              this.carritoService.agregarProducto(producto);
            }
}
