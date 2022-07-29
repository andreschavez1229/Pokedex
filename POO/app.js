function Persona(nombre, edad){
    // Variable o propiedad publica
    this.nombre = nombre; 
    this.edad = edad;
    // Variable o propiedad privada
    let dni = "12345"

    // Metodos o funciones de una clase
    this.getDni = function(){
        return dni;
    }
    
    this.saludar = function(){
        console.log("Hola, soy " + nombre+ " tengo " + edad + " años, mi dni es " + this.getDni() )
        ;
    }
}
// // Metodos por prototipos y por fuera de la clase
// Persona.prototype.saludar = function () {
//     console.log("Hola, soy " + this.nombre+ " tengo " + this.edad + " años, mi dni es " + this.getDni() )

// }

let objetoPersona = new Persona("Andres Chavez ", 20);
let objPersona = new Persona("Kim Dahyun ", 25);

objetoPersona.saludar();
objPersona.saludar();