export class Donacion{
        //Sintaxis simplificada
    constructor(
        public donacion_id:number,
        public tipo:number, 
        public cantidad:number, 
        public moneda:string, 
        public banco_origen:string, 
        public fecha_entrega:Date, 
        public estado:number, 
        public comprobante:string, 
        public donante_id:number){        
    }
}



