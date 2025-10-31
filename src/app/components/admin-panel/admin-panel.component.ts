import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Producto } from '../../models/producto.interface';
import { ProductosService } from '../../services/productos.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  productos: Producto[] = [];
  productoForm: FormGroup;
  editando = false;
  productoEditandoId: number | null = null;
  isAdmin = false;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private authService: AuthService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      imagen: ['', [Validators.pattern('^https?://.*$')]],
      stock: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      if (!user?.isAdmin) {
        this.router.navigate(['/']);
        return;
      }
      this.isAdmin = true;
      this.cargarProductos();
    });
  }

  cargarProductos() {
    this.loading = true;
    this.error = '';
    this.productosService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los productos';
        this.loading = false;
        console.error('Error al cargar productos:', err);
      }
    });
  }

  onSubmit() {
    if (this.productoForm.valid && !this.loading) {
      this.loading = true;
      this.error = '';

      if (this.editando && this.productoEditandoId) {
        this.productosService.actualizarProducto(this.productoEditandoId, this.productoForm.value)
          .subscribe({
            next: () => {
              this.resetForm();
              this.cargarProductos();
              alert('Producto actualizado exitosamente');
            },
            error: (err) => {
              this.error = 'Error al actualizar el producto';
              this.loading = false;
              console.error('Error al actualizar producto:', err);
            }
          });
      } else {
        this.productosService.agregarProducto(this.productoForm.value)
          .subscribe({
            next: () => {
              this.resetForm();
              this.cargarProductos();
              alert('Producto agregado exitosamente');
            },
            error: (err) => {
              this.error = 'Error al agregar el producto';
              this.loading = false;
              console.error('Error al agregar producto:', err);
            }
          });
      }
    }
  }

  editarProducto(producto: Producto) {
    if (this.loading) return;
    
    this.editando = true;
    this.productoEditandoId = producto.id;
    this.productoForm.patchValue({
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      imagen: producto.imagen,
      stock: producto.stock,
      categoria: producto.categoria
    });

    // Scroll al formulario
    const formElement = document.querySelector('.producto-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  }

  eliminarProducto(id: number) {
    if (this.loading) return;

    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.loading = true;
      this.error = '';

      this.productosService.eliminarProducto(id).subscribe({
        next: () => {
          this.cargarProductos();
          alert('Producto eliminado exitosamente');
        },
        error: (err) => {
          this.error = 'Error al eliminar el producto';
          this.loading = false;
          console.error('Error al eliminar producto:', err);
        }
      });
    }
  }

  resetForm() {
    this.editando = false;
    this.productoEditandoId = null;
    this.productoForm.reset();
    this.error = '';
  }

  // Getters para validación de formulario
  get nombreInvalido() {
    const control = this.productoForm.get('nombre');
    return control?.invalid && control?.touched;
  }

  get descripcionInvalida() {
    const control = this.productoForm.get('descripcion');
    return control?.invalid && control?.touched;
  }

  get precioInvalido() {
    const control = this.productoForm.get('precio');
    return control?.invalid && control?.touched;
  }

  get imagenInvalida() {
    const control = this.productoForm.get('imagen');
    return control?.invalid && control?.touched;
  }

  get stockInvalido() {
    const control = this.productoForm.get('stock');
    return control?.invalid && control?.touched;
  }

  get categoriaInvalida() {
    const control = this.productoForm.get('categoria');
    return control?.invalid && control?.touched;
  }
}
