import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Producto } from '../../models/producto.interface';

@Component({
  selector: 'app-carrito',
  imports: [DecimalPipe, NgFor, NgIf],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  mostrarCarrito = false;
  productos: Producto[] = [];
  total = 0;
  cantidadTotal = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carritoService.carrito$.subscribe(carrito => {
      this.productos = carrito;
      this.total = this.carritoService.obtenerTotal();
      this.cantidadTotal = this.carritoService.obtenerCantidad();
    });
  }

  toggleCarrito() {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  cerrarCarrito() {
    this.mostrarCarrito = false;
  }

  eliminar(id: number) {
    this.carritoService.eliminarProducto(id);
  }

  vaciar() {
    this.carritoService.limpiarCarrito();
  }
}
