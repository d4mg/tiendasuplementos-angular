import { Producto } from './producto.interface';

export interface ProductoCarrito extends Omit<Producto, 'descripcion' | 'categoria' | 'stock'> {
  cantidad: number;
}