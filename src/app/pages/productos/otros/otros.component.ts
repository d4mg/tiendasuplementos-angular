import { Component } from '@angular/core';
import { Producto } from '../../../models/producto.interface';
import { DecimalPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-otros',
  imports: [NgFor, DecimalPipe],
  templateUrl: './otros.component.html',
  styleUrl: './otros.component.css',
})
export class OtrosComponent {
  productos: Producto[] = [
      {
        id: 1,
        nombre: 'Barra de Proteína',
        descripcion: 'Proteína de suero de leche ideal para recuperación muscular.',
        precio: 120000,
        imagen: '/assets/img/proteina1.png'
      },
      {
        id: 2,
        nombre: 'Omega 3',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },
      {
        id: 3,
        nombre: 'Multivitamínico',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },
      {
        id: 4,
        nombre: 'Pre-Enteno',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },
      {
        id: 5,
        nombre: 'Quemador de Grasa',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },
      {
        id: 6,
        nombre: 'Shaker de Proteína',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },

    ];
 }
