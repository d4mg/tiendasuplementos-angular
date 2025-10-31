import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../services/carrito.service';
import { ProductoCarrito } from '../../models/producto-carrito.interface';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';

@Component({
  imports: [NgIf, NgFor, CurrencyPipe],
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true
})
export class CarritoComponent implements OnInit {
  productos: ProductoCarrito[] = [];
  total: number = 0;
  mostrarCarrito: boolean = false;
  cantidadTotal: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    // Escuchar los cambios del carrito en tiempo real
    this.carritoService.carrito$.subscribe(productos => {
      this.productos = productos;
      this.total = this.carritoService.obtenerTotal();
      this.cantidadTotal = this.carritoService.obtenerCantidadTotal();
    });
  }

  eliminarProducto(id: number): void {
    this.carritoService.eliminarProducto(id);
  }

  vaciarCarrito(): void {
    this.carritoService.vaciarCarrito();
  }

  toggleCarrito(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  cerrarCarrito(): void {
    this.mostrarCarrito = false;
  }

  incrementarCantidad(id: number): void {
    this.carritoService.incrementarCantidad(id);
  }

  decrementarCantidad(id: number): void {
    this.carritoService.decrementarCantidad(id);
  }

  procesandoCompra: boolean = false;
  compraExitosa: boolean = false;

  async realizarCompra(): Promise<void> {
    if (this.productos.length === 0) return;
    
    this.procesandoCompra = true;
    try {
      await this.carritoService.completarCompra();
      this.compraExitosa = true;
      setTimeout(() => {
        this.compraExitosa = false;
        this.cerrarCarrito();
      }, 2000);
    } catch (error) {
      console.error('Error al procesar la compra:', error);
    } finally {
      this.procesandoCompra = false;
    }
  }
}
