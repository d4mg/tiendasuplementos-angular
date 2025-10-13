export interface Producto {
  id: number;              // Identificador único
  nombre: string;          // Nombre del producto
  descripcion: string;     // Descripción breve
  precio: number;          // Precio
  imagen: string;          // URL de la imagen
  cantidad?: number;      // Cantidad (opcional)
}
