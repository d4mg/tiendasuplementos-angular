import { Component } from '@angular/core';
import { Producto } from '../../../models/producto.interface';
import { DecimalPipe, NgFor } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';

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
        nombre: 'Amino X BSN',
        descripcion: 'Amino X contiene una mezcla cuidadosamente seleccionada de aminoácidos esenciales y no esenciales, incluyendo BCAA.',
        precio: 210000,
        imagen: '/assets/img/a1.png'
      },
      {
        id: 2,
        nombre: 'Amino Energy Optimum Nutrition',
        descripcion: 'Contiene una mezcla equilibrada de aminoácidos clave para apoyar la síntesis proteica y contribuir a una recuperación óptima.',
        precio: 125000,
        imagen: '/assets/img/a2.png'
      },
      {
        id: 3,
        nombre: 'Army BCAA Proscience',
        descripcion: 'Potencia tu rendimiento con 9 g de EAAs y 7 g de BCAAs por scoop. Sin azúcar añadido, con glutamina y disponible en 3 sabores refrescantes.',
        precio: 115000,
        imagen: '/assets/img/a3.png'
      },
      {
        id: 4,
        nombre: 'Alpha BCAA Smartmuscle',
        descripcion: 'Mezcla de aminoácidos esenciales y no esenciales, incluyendo BCAA, diseñada para optimizar la recuperación muscular y el rendimiento físico.',
        precio: 120000,
        imagen: '/assets/img/a5.png'
      },
      {
        id: 5,
        nombre: 'Amino Powder GMN',
        descripcion: 'Suplemento diseñado para optimizar tu rendimiento físico y mental. Alimento en polvo para preparar bebida con isoleucina, leucina y valina, ¡llévatelo en tu sabor favorito!',
        precio: 54900,
        imagen: '/assets/img/a4.png'
      },
      {
        id: 6,
        nombre: 'BCAA’s Healthy Sports',
        descripcion: 'Optimiza tu rendimiento con BCAA’s Healthy Sports. Protege tus músculos y acelera tu recuperación. Ideal para entrenamientos intensos y efectivos.',
        precio: 88000,
        imagen: '/assets/img/a6.png'
      },
    ];

    constructor(private carritoService: CarritoService) {}

     agregarAlCarrito(producto: any) {
     this.carritoService.agregarProducto(producto);
    }

}
