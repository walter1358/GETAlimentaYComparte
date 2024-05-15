import { Component, ViewChild, ElementRef, AfterViewInit , Inject, OnInit} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { Route } from '@angular/router';
import { Renderer2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalStorageService } from 'ngx-localstorage';
import { Usuario } from './model/Usuario.model';


 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  dato: string | null = '';
  //dato: string = localStorage.getItem('userType') || 'Usuario';
  correo: string | null = '';


  constructor(private renderer: Renderer2, private elementRef: ElementRef,
    @Inject (DOCUMENT) private document: Document,
  ) {
  }
 
  ngOnInit(): void {
    this.correo = sessionStorage.getItem('mail');
    this.dato = sessionStorage.getItem('tipo')
  }

isSidebarHidden: boolean = true; // O false dependiendo de tus necesidades

  ngAfterViewInit() {

    const button = this.document.getElementById('accordionSidebar');
    if (button) {
      this.renderer.setStyle(button, 'display', 'none');

    }
  } 
  
  menuDonante(){



    const itemdonmante = this.document.getElementById('item_donante');
    if(itemdonmante){
      this.renderer.setStyle(itemdonmante,'display','none')

    }

    const itemadmin = this.document.getElementById('item-adminstracion');
    if(itemadmin){
      this.renderer.setStyle(itemadmin,'display','none')
    }    

    
  }

  menuAnalista(){

    const itemdonacion = this.document.getElementById('item_donacion');
    if(itemdonacion){
      this.renderer.setStyle(itemdonacion,'display','none')
    }

  }

}
