import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Route } from '@angular/router';
import { Renderer2 } from '@angular/core';





@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  constructor(private renderer: Renderer2) { }

  isSidebarHidden: boolean = true; // O false dependiendo de tus necesidades


  ngAfterViewInit() {
    const button = document.getElementById('accordionSidebar');
    if (button) {
      this.renderer.setStyle(button, 'display', 'none');
    }
  } 
  

}
