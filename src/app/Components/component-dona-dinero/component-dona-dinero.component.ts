import { Component, Renderer2, Inject } from '@angular/core';
import { doesNotThrow } from 'assert';
import { AppComponent } from '../../app.component';
import { DOCUMENT } from "@angular/common";


@Component({
  selector: 'app-component-dona-dinero',
  templateUrl: './component-dona-dinero.component.html',
  styleUrl: './component-dona-dinero.component.css'
})
export class ComponentDonaDineroComponent {

  constructor(private renderer: Renderer2,
              private miComponente:AppComponent,
              @Inject (DOCUMENT) private _document: Document,

  ){}


  ngAfterViewInit() {
    const button = this._document.getElementById('accordionSidebar');
    if (button) {
      this.renderer.setStyle(button, 'display', 'block');
    }

    this.miComponente.menuDonante();

  
  } 


}
