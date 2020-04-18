import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  errorFire:string;
  constructor(private authFire:AngularFireAuth,private route:Router) { }
  
  usuario = new Usuario();
  usuarioSelect = new Usuario();
  usuarios: Usuario[] = [
    { id: 0, nombre: 'admin', correo: 'admin@admin.com', clave: '111111' },
    { id: 1, nombre: 'invitado', correo: 'invitado@invitado.com', clave: '222222' },
    { id: 2, nombre: 'usuario', correo: 'usuario@usuario.com', clave: '333333' },
    { id: 3, nombre: 'anonimo', correo: 'anonimo@anonimo.com', clave: '444444' },
    { id: 4, nombre: 'tester', correo: 'tester@tester.com', clave: '555555' }
  ];
  async Login(usuario:Usuario){
    try {
      if(usuario.correo != undefined && usuario.clave != undefined){
        var result = await this.authFire.auth.signInWithEmailAndPassword(usuario.correo,usuario.clave);
      }else{
        this.errorFire = "Se debe ingresar el mail y el password";   
      }
          
      if(result){
        this.route.navigate(['home']);  
      }
        
    } catch (error) {
     this.errorFire =  error.message;
    }
  }

  userSeleccionado( id ) {
    this.usuarioSelect.correo = this.usuarios[id].correo;
    this.usuarioSelect.clave = this.usuarios[id].clave;
    this.Login(this.usuarioSelect);
  }
/*
  Register(){
    this.route.navigate(['register']);
  }
*/
  ngOnInit() {
  }

}
