import { Component, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { Usuario } from '../../model/Usuario.model';
import { AuthService } from '../../Service/auth/auth.service';
import { Router } from "@angular/router";
import { ContentObserver } from '@angular/cdk/observers';
import { Console } from 'console';
import { ControlContainer } from '@angular/forms';
import { AppComponent } from '../../app.component';







@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
 // usuario = new Usuario('wcmore.93@gmail.com','12345');

 mailInput: string = '';
 passInput: string = '';
 //usuario = new Usuario('wcmore.93@gmail.com','12345');
 usuario: Usuario; // Declaración del objeto usuario sin inicializar



  constructor(private authService:AuthService,
              private miComponente: AppComponent,
              private router:Router ) { 
                this.usuario = new Usuario(0,'', '')
              }
 

    //ngOnInit(){
      onSubmit(){
        console.log('onSubmit Logueo de usuario')
        console.log('Correo electrónico:', this.usuario.email);
        console.log('Contraseña:', this.usuario.password);


        
        // Llama al método login del servicio AuthService y pasa el usuario
        this.authService.login(this.usuario);
      //  this.router.navigate(['/vacio']);

        /*
            .subscribe({
              next: (data) => {
                console.log('resultado login', data);
                this.router.navigate(['/clientes']);
              },
              error: (error) => {
                //console.log('error ==>', error);
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Error de autenticación!",
                  text: "Las credenciales ingresadas son incorrectas",
                  showConfirmButton: false,
                  showCloseButton:true,
                  timer: 5000 //milisegundos
                });
              },
              complete: () => {}
            })
        */
            //this.router.navigate(['/vacio'])
      }              

      volver(){

        this.router.navigate([''])


      }


}
