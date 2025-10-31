import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../models/producto.interface';
import { ProductoCarrito } from '../models/producto-carrito.interface';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: ProductoCarrito[] = [];
  private carritoSubject = new BehaviorSubject<ProductoCarrito[]>([]);
  public carrito$: Observable<ProductoCarrito[]> = this.carritoSubject.asObservable();

  constructor() {
    this.cargarCarrito();
  }

  private cargarCarrito(): void {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      try {
        this.carrito = JSON.parse(carritoGuardado);
        this.actualizarCarrito();
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        localStorage.removeItem('carrito');
        this.carrito = [];
        this.actualizarCarrito();
      }
    }
  }

  obtenerCarrito(): ProductoCarrito[] {
    return [...this.carrito];
  }

  agregarProducto(producto: Producto): void {
    const productoExistente = this.carrito.find(p => p.id === producto.id);
    
    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      const { descripcion, categoria, stock, ...productoCarrito } = producto;
      this.carrito.push({ ...productoCarrito, cantidad: 1 });
    }
    
    this.actualizarCarrito();
  }

  eliminarProducto(id: number): void {
    this.carrito = this.carrito.filter(p => p.id !== id);
    this.actualizarCarrito();
  }

  vaciarCarrito(): void {
    this.carrito = [];
    this.actualizarCarrito();
  }

  private actualizarCarrito(): void {
    this.carritoSubject.next([...this.carrito]);
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  obtenerTotal(): number {
    return this.carrito.reduce((total, producto) => 
      total + (producto.precio * producto.cantidad), 0);
  }

  obtenerCantidadTotal(): number {
    return this.carrito.reduce((total, producto) => 
      total + producto.cantidad, 0);
  }

  decrementarCantidad(id: number): void {
    const productoIndex = this.carrito.findIndex(p => p.id === id);
    if (productoIndex !== -1) {
      if (this.carrito[productoIndex].cantidad > 1) {
        this.carrito[productoIndex].cantidad--;
      } else {
        this.carrito.splice(productoIndex, 1);
      }
      this.actualizarCarrito();
    }
  }

  incrementarCantidad(id: number): void {
    const producto = this.carrito.find(p => p.id === id);
    if (producto) {
      producto.cantidad++;
      this.actualizarCarrito();
    }
  }

  completarCompra(): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulamos un tiempo de procesamiento
      setTimeout(() => {
        this.vaciarCarrito();
        resolve(true);
      }, 1500);
    });
  }
}
