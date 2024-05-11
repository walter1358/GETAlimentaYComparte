import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Route } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent  implements AfterViewInit{
  isSidebarHidden: boolean = true; // O false dependiendo de tus necesidades


 // isAuthenticated: boolean = true;
 @ViewChild('btnprueba', { static: true }) btnPrueba!: ElementRef;

 ngAfterViewInit() {
   this.ocultarBoton();
 }

 ocultarBoton() { 
   // Oculta el botón
   this.btnPrueba.nativeElement.style.display = 'none';
 }



}
