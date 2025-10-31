import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from '../models/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private productos: Producto[] = [];
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  public productos$ = this.productosSubject.asObservable();

  constructor() {
    this.cargarProductos();
  }

  private cargarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
      this.productos = JSON.parse(productosGuardados);
      this.productosSubject.next([...this.productos]);
    }
  }

  private guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(this.productos));
    this.productosSubject.next([...this.productos]);
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.productos$;
  }

  obtenerProductoPorId(id: number): Producto | undefined {
    return this.productos.find(p => p.id === id);
  }

  obtenerProductosPorCategoria(categoria: string): Producto[] {
    return this.productos.filter(p => p.categoria === categoria);
  }

  agregarProducto(producto: Omit<Producto, 'id'>): Observable<void> {
    return new Observable(subscriber => {
      const nuevoId = this.productos.length > 0 
        ? Math.max(...this.productos.map(p => p.id)) + 1 
        : 1;

      const nuevoProducto: Producto = {
        ...producto,
        id: nuevoId
      };

      this.productos.push(nuevoProducto);
      this.guardarProductos();
      subscriber.next();
      subscriber.complete();
    });
  }

  actualizarProducto(id: number, producto: Partial<Producto>): Observable<void> {
    return new Observable(subscriber => {
      const index = this.productos.findIndex(p => p.id === id);
      if (index !== -1) {
        this.productos[index] = { ...this.productos[index], ...producto };
        this.guardarProductos();
        subscriber.next();
      } else {
        subscriber.error('Producto no encontrado');
      }
      subscriber.complete();
    });
  }

  eliminarProducto(id: number): Observable<void> {
    return new Observable(subscriber => {
      const index = this.productos.findIndex(p => p.id === id);
      if (index !== -1) {
        this.productos.splice(index, 1);
        this.guardarProductos();
        subscriber.next();
      } else {
        subscriber.error('Producto no encontrado');
      }
      subscriber.complete();
    });
  }

  actualizarStock(id: number, cantidad: number): Observable<void> {
    return new Observable(subscriber => {
      const producto = this.productos.find(p => p.id === id);
      if (producto) {
        producto.stock += cantidad;
        this.guardarProductos();
        subscriber.next();
      } else {
        subscriber.error('Producto no encontrado');
      }
      subscriber.complete();
    });
  }
}