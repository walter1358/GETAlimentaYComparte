export class Donante{
    //Sintaxis tradicional
    /*
    private nombre: string = '';    
    apellido: string = '';
    dni: string = '';
    
    constructor(nombre:string, apellido:string, dni:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
    }
    getNombre(){
        return this.nombre;
    }
    setNombre(nombre: string){
        this.nombre = nombre;
    }
    */
    //Sintaxis simplificada
    constructor(public donante_id:number, public tipo_donante:number, public tipo_documento:number ,public nro_documento:string,public nombre:string, public direccion:string, public telefono:string, public email:string){        
    }
}



