import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Usuario } from '../../model/Usuario.model';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioLst: Usuario[] = [];

  isLoggedIn: boolean = false;
  email: string | null = '';


  usuarios: Usuario[] = [
          new Usuario(0,'wcmore.93@gmail.com','12345'),
          new Usuario(0,'analista@gmail.com','00000'),
          new Usuario(0,'lumape@gmail.com.pe','11111')

  ]

  constructor(private httpClient: HttpClient, private router:Router,
  ){}

  login(usuario:Usuario){
      //aquí se debe llamar a un servicio para verificar los datos del usuario en la BD
      const userFound = this.usuarios.find(user => user.email === usuario.email && user.password === usuario.password);
      //Aquí se puede aplicar la inserción de items en el sessionStorage, localStorage

      if(userFound){
        this.isLoggedIn = true;
        this.email = userFound?.email;
        this.router.navigate(['/vacio'])
        this.usuarioLst.push(usuario);
        console.log(this.usuarioLst);
        sessionStorage.setItem('mail', userFound?.email)
       console.log('session storage', sessionStorage.getItem('mail'));

      }else{
              // Usuario o contraseña incorrectos
      this.isLoggedIn = false;
      this.router.navigate(['/login'])

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Correo o password incorrectos",
      });
      }

      //this.isLoggedIn = true;
  }

  logout(){
      //Aquí se puede aplicar el borrado de items del sessionStorage, localStorage

      this.isLoggedIn = false;
      this.email = '';


  }

  isAuthenticated():boolean{
      return this.isLoggedIn;
  }


}
