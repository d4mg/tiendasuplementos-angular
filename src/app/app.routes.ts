import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProteinasComponent } from './pages/productos/proteinas/proteinas.component';
import { AminoacidosComponent } from './pages/productos/aminoacidos/aminoacidos.component';
import { CreatinasComponent } from './pages/productos/creatinas/creatinas.component';
import { OtrosComponent } from './pages/productos/otros/otros.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/proteinas', component: ProteinasComponent },
  { path: 'productos/aminoacidos', component: AminoacidosComponent },
  { path: 'productos/creatinas', component: CreatinasComponent },
  { path: 'productos/otros', component: OtrosComponent },
  { path: 'contacto', component: ContactComponent },
  { 
    path: 'admin', 
    component: AdminPanelComponent,
    canActivate: [AdminGuard]
  },
  { path: '**', redirectTo: '' } // redirección en caso de ruta no encontrada
];
