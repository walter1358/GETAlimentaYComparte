import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Renderer2, Inject, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DOCUMENT } from "@angular/common";



@Component({
  selector: 'app-vacio',
  templateUrl: './vacio.component.html',
  styleUrl: './vacio.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class VacioComponent implements OnInit {

  constructor(private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private miComponente: AppComponent,
    @Inject (DOCUMENT) private _document: Document
  ){}

  ngOnInit(): void {
    this.miComponente.correo = sessionStorage.getItem('mail');
    this.miComponente.dato = sessionStorage.getItem('tipo');

  }



  ngAfterViewInit() {
    const button = this._document.getElementById('accordionSidebar');
    if (button) {
      this.renderer.setStyle(button, 'display', 'block');
    }
  }
  
  if (miComponente = 'Donante') {
      this.miComponente.menuDonante();
  }
  
}
