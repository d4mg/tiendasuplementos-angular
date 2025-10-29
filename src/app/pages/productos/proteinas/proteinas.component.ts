import { Component } from '@angular/core';
import { Producto } from '../../../models/producto.interface';
import { DecimalPipe, NgFor } from '@angular/common';
import { CarritoService } from '../../../services/carrito.service';

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
      nombre: 'Gold Standard 100% Whey Optimum Nutrition',
      descripcion: 'La proteína más vendida en el mundo, Gold Standard 100% Whey de Optimum Nutrition, ofrece 24 gramos de proteína por porción para apoyar el crecimiento muscular y la recuperación.',
      precio: 369000,
      imagen: '/assets/img/p1.png'
    },
    {
      id: 2,
      nombre: 'Proton Whey Smartmuscle',
      descripcion: 'Prueba Proton Whey Smartmuscle: proteína en polvo con 75% concentrado, 25% aislado y con probióticos. ¡Disfruta sus deliciosos sabores!',
      precio: 160000,
      imagen: '/assets/img/p2.png'
    },
    {
      id: 3,
      nombre: 'Prostar Whey Ultimate Nutrition',
      descripcion: 'Proteína en polvo Prostar Whey de Ultimate Nutrition, con 25 gramos de proteína por porción, ideal para el desarrollo muscular y la recuperación post-entrenamiento.  ',
      precio: 195000,
      imagen: '/assets/img/p3.png'
    },
    {
      id: 4,
      nombre: 'Isopure Zero Low Carb Isopure Company',
      descripcion: 'Aislado de proteína de suero de alta calidad, diseñado para maximizar tus resultados en el gimnasio sin añadir carbohidratos, grasas ni azúcares.',
      precio: 580000,
      imagen: '/assets/img/p4.png'
    },
    {
      id: 5,
      nombre: 'Whey Pure Smart Nutrition',
      descripcion: 'Proteína en polvo Whey Pure de Smart Nutrition, con 22 gramos de proteína por porción, ideal para apoyar el crecimiento muscular y la recuperación después del ejercicio.',
      precio: 140000,
      imagen: '/assets/img/p5.png'
    },
    {
      id: 6,
      nombre: 'ISO 100 Dymatize Nutrition',
      descripcion: 'Optimiza tu rendimiento con 25 g de proteína por porción, ideal para el crecimiento muscular y la recuperación. ¡Potencia tus entrenamientos ahora mismo!',
      precio: 457000,
      imagen: '/assets/img/p6.png'
    },
  ];
   constructor(private carritoService: CarritoService) {}

  agregarAlCarrito(producto: any) {
  this.carritoService.agregarProducto(producto);
  }

}

