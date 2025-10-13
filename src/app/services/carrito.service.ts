import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/producto.interface'; // ✅ solo importado, no definido aquí

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Producto[] = [];
  private carritoSubject = new BehaviorSubject<Producto[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito = JSON.parse(carritoGuardado);
      this.carritoSubject.next(this.carrito);
    }
  }

  agregarProducto(producto: Producto) {
    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad = (existente.cantidad || 0) + 1;
    } else {
      this.carrito.push({ ...producto, cantidad: 1 });
    }
    this.actualizarCarrito();
  }

  eliminarProducto(id: number) {
    this.carrito = this.carrito.filter(p => p.id !== id);
    this.actualizarCarrito();
  }

  limpiarCarrito() {
    this.carrito = [];
    this.actualizarCarrito();
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, p) => total + (p.precio * (p.cantidad || 0)), 0);
  }

  obtenerCantidad(): number {
    return this.carrito.reduce((acc, p) => acc + (p.cantidad || 0), 0);
  }

  private actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.carritoSubject.next(this.carrito);
  }
}
