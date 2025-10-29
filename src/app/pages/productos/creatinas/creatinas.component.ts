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
          nombre: 'Creatine Monohydrate Healthy Sports',
          descripcion: 'Aumenta tu rendimiento con Creatine Monohydrate Healthy Sports. Mejora tu fuerza y recuperación con una creatina pura y efectiva para entrenamientos intensos.',
          precio: 125000,
          imagen: '/assets/img/c1.png'
        },
        {
          id: 2,
          nombre: 'Creatine Iron Smart Nutrition',
          descripcion: 'La ayuda ergogénica más efectiva para atletas o quienes practican su deporte favorito. Llévate una creatina con una fórmula pura y eficaz para un rendimiento óptimo.',
          precio: 130000,
          imagen: '/assets/img/c2.png'
        },
        {
          id: 3,
          nombre: 'Creatine Powder Micronized Optimum Nutrition',
          descripcion: 'creatina micronizada de alta calidad que mejora la absorción y eficacia. Ideal para aumentar la fuerza y resistencia durante tus entrenamientos.',
          precio: 170000,
          imagen: '/assets/img/c3.png'
        },
        {
          id: 4,
          nombre: 'Legacy Proscience',
          descripcion: 'Creatina HCL para mejorar fuerza, masa muscular y recuperación. Disponible en sabores deliciosos para optimizar tu rendimiento.',
          precio: 85000,
          imagen: '/assets/img/c4.png'
        },
        {
          id: 5,
          nombre: 'Crea Stack Megaplex',
          descripcion: 'Suplemento con creatina, HMB, ácido alfa lipoico y sulfato de vanadio. Mejora fuerza y recuperación. En presentación de 1,3 libras y sobres.',
          precio: 149990,
          imagen: '/assets/img/c5.png'
        },
        {
          id: 6,
          nombre: 'Legend Fitmafia',
          descripcion: 'La creatina en polvo con 12 g de energía y enfoque. Fórmula con Creapure®, ideal para mejorar tu rendimiento en entrenamientos intensos.',
          precio: 79900,
          imagen: '/assets/img/c6.png'
        },
      ];

       constructor(private carritoService: CarritoService) {}

          agregarAlCarrito(producto: any) {
          this.carritoService.agregarProducto(producto);
          }
}
