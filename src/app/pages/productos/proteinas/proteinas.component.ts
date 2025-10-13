import { Component } from '@angular/core';
import { Producto } from '../../../models/producto.interface';
import { DecimalPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-proteinas',
  imports: [NgFor, DecimalPipe],
  templateUrl: './proteinas.component.html',
  styleUrls: ['./proteinas.component.css']
})
export class ProteinasComponent {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Proteína Whey',
      descripcion: 'Proteína de suero de leche ideal para recuperación muscular.',
      precio: 120000,
      imagen: '/assets/img/proteina1.png'
    },
    {
      id: 2,
      nombre: 'Proteína Whey',
      descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
      precio: 95000,
      imagen: '/assets/img/proteina2.png'
    },
    {
      id: 3,
      nombre: 'Proteína Vegana',
      descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
      precio: 95000,
      imagen: '/assets/img/proteina2.png'
    },
    {
      id: 4,
      nombre: 'Proteína Vegana',
      descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
      precio: 95000,
      imagen: '/assets/img/proteina2.png'
    },
    {
      id: 5,
      nombre: 'Proteína Vegana',
      descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
      precio: 95000,
      imagen: '/assets/img/proteina2.png'
    },
    {
      id: 6,
      nombre: 'Proteína Vegana',
      descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
      precio: 95000,
      imagen: '/assets/img/proteina2.png'
    },

  ];
}
