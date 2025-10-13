import { Component } from '@angular/core';
import { Producto } from '../../../models/producto.interface';
import { DecimalPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-aminoacidos',
  imports: [NgFor,DecimalPipe],
  templateUrl: './aminoacidos.component.html',
  styleUrl: './aminoacidos.component.css',
})
export class AminoacidosComponent {
  productos: Producto[] = [
      {
        id: 1,
        nombre: 'Amino x',
        descripcion: 'Proteína de suero de leche ideal para recuperación muscular.',
        precio: 120000,
        imagen: '/assets/img/proteina1.png'
      },
      {
        id: 2,
        nombre: 'Amino Energy',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },
      {
        id: 3,
        nombre: 'Army BCAA',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },
      {
        id: 4,
        nombre: 'Nitro Shock',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },
      {
        id: 5,
        nombre: 'Amino Powder',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },
      {
        id: 6,
        nombre: 'Bcaas Aminoacidos',
        descripcion: 'Proteína a base de plantas, perfecta para dietas veganas.',
        precio: 95000,
        imagen: '/assets/img/proteina2.png'
      },
    ];
}
