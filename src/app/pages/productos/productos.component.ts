import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements AfterViewInit, OnDestroy {
  @ViewChild('carousel', { static: true }) carousel!: ElementRef<HTMLDivElement>;

  productosDestacados = [
    { nombre: 'Whey Protein Gold', descripcion: 'Proteína de alta calidad para recuperación muscular.', imagen: 'assets/img/proteina.png' },
    { nombre: 'Creatina Monohidratada', descripcion: 'Aumenta la fuerza y el rendimiento.', imagen: 'assets/img/creatina.png' },
    { nombre: 'BCAA Aminoacidos', descripcion: 'Aminoácidos esenciales para prevenir el catabolismo.', imagen: 'assets/img/aminoacido.png' },
    { nombre: 'Creatina ON', descripcion: 'Aumenta la fuerza y el rendimiento en cada entrenamiento.', imagen: 'assets/img/creatina2.png' },
    { nombre: 'Burner Stack', descripcion: 'Burner Stack, bebida energizante que contiene 15mg de extracto de naranja amarga, 100mg de cafeina. Sabor a uva.', imagen: 'assets/img/quemador1.png' },
    { nombre: 'L-Carnitine Healthy Sports', descripcion: ' la piridoxina (vitamina b6) acompañada de una dieta balanceada, ayuda al metabolismo normal de proteínas y carbohídratos.', imagen: 'assets/img/quemador2.png' },
  ];

  private isDown = false;
  private startX = 0;
  private scrollLeft = 0;
  private autoScrollInterval: any = null;
  private resumeTimeout: any = null;
  private AUTO_SCROLL_MS = 3000;
  private AUTO_STEP_PX = 300;

  ngAfterViewInit() {
     console.log('Carrusel inicializado');
    const el = this.carousel.nativeElement;

    el.addEventListener('pointerdown', this.onPointerDown, { passive: false });
    el.addEventListener('pointermove', this.onPointerMove, { passive: false });
    el.addEventListener('pointerleave', this.onPointerLeave);
    window.addEventListener('pointerup', this.onPointerUp);
    el.addEventListener('dragstart', (e) => e.preventDefault());

    this.startAutoScroll();
  }

  ngOnDestroy() {
    const el = this.carousel?.nativeElement;
    if (el) {
      el.removeEventListener('pointerdown', this.onPointerDown as EventListener);
      el.removeEventListener('pointermove', this.onPointerMove as EventListener);
      el.removeEventListener('pointerleave', this.onPointerLeave as EventListener);
    }
    window.removeEventListener('pointerup', this.onPointerUp as EventListener);
    this.stopAutoScroll();
    if (this.resumeTimeout) clearTimeout(this.resumeTimeout);
  }

  private onPointerDown = (e: PointerEvent) => {
    const el = this.carousel.nativeElement;
    this.isDown = true;
    el.classList.add('active');
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
    this.pauseAutoScroll();
  };

  private onPointerMove = (e: PointerEvent) => {
    if (!this.isDown) return;
    const el = this.carousel.nativeElement;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - this.startX) * 1.2;
    el.scrollLeft = this.scrollLeft - walk;
  };

  private onPointerUp = (e: PointerEvent) => {
    if (!this.isDown) return;
    const el = this.carousel.nativeElement;
    this.isDown = false;
    el.classList.remove('active');
    try { el.releasePointerCapture(e.pointerId); } catch {}
    this.scheduleResumeAutoScroll();
  };

  private onPointerLeave = () => {
    if (!this.isDown) return;
    this.isDown = false;
    const el = this.carousel.nativeElement;
    el.classList.remove('active');
    this.scheduleResumeAutoScroll();
  };

  private startAutoScroll() {
    this.stopAutoScroll();
    this.autoScrollInterval = setInterval(() => {
      const el = this.carousel.nativeElement;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + this.AUTO_STEP_PX;
      if (next >= maxScrollLeft - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollTo({ left: next, behavior: 'smooth' });
      }
    }, this.AUTO_SCROLL_MS);
  }

  private stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
      this.autoScrollInterval = null;
    }
  }

  private pauseAutoScroll() {
    this.stopAutoScroll();
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
      this.resumeTimeout = null;
    }
  }

  private scheduleResumeAutoScroll(delay = 2000) {
    if (this.resumeTimeout) clearTimeout(this.resumeTimeout);
    this.resumeTimeout = setTimeout(() => this.startAutoScroll(), delay);
  }
}
