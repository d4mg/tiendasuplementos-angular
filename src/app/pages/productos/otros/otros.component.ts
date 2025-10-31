import { Component } from '@angular/core';
import { Producto } from '../../../models/producto.interface';
import { DecimalPipe, NgFor } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';

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
        nombre: 'Smart Bar Smart Nutrition',
        descripcion: 'Deliciosa barra proteica con 21g de proteína, ideal para mantener y desarrollar masa muscular.',
        precio: 8500,
        imagen: '/assets/img/o2.png',
        categoria: 'otros',
        stock: 50
      },
      {
        id: 2,
        nombre: 'Triple Omega 3-6-9 Healthy America',
        descripcion: 'Potencia tu bienestar con el Triple Omega 3-6-9 Healthy America, contiene 1.200 mg de ácidos grasos esenciales para la salud cardiovascular y cognitiva.',
        precio: 96000,
        imagen: '/assets/img/o1.png',
        categoria: 'otros',
        stock: 35
      },
      {
        id: 3,
        nombre: 'Multivitamínico The One Proscience',
        descripcion: 'Un solo producto te aporta más de 20 vitaminas y minerales esenciales. Con antioxidantes, sin azúcares añadidos y fácil de preparar para una salud óptima.',
        precio: 90000,
        imagen: '/assets/img/o5.png',
        categoria: 'otros',
        stock: 40
      },
      {
        id: 4,
        nombre: 'Intenze Proscience',
        descripcion: 'Pre-entrenamiento diseñado para maximizar tu energía, enfoque y resistencia durante los entrenamientos más intensos.',
        precio: 145000,
        imagen: '/assets/img/o4.png',
        categoria: 'otros',
        stock: 25
      },
      {
        id: 5,
        nombre: 'L-Carnitine Plus Spartan',
        descripcion: 'Suplemento que ayuda a convertir la grasa en energía, ideal para mejorar el rendimiento físico y apoyar la pérdida de peso.',
        precio: 65000,
        imagen: '/assets/img/o3.png',
        categoria: 'otros',
        stock: 30
      },
      {
        id: 6,
        nombre: 'Shaker + Sobres Pase Fitmafia',
        descripcion: 'Shaker util para preparar tus batidos de proteina + 5 sobres pase fitmafia.',
        precio: 60000,
        imagen: '/assets/img/o6.png',
        categoria: 'otros',
        stock: 45
      },
    ];

     constructor(private carritoService: CarritoService) {}

         agregarAlCarrito(producto: any) {
         this.carritoService.agregarProducto(producto);
        }
 }
