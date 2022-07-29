// POO
class Alumno {
    constructor(nombre, apellido, califFinal, inscrito){
        this.nombre = nombre;
        this.apellido = apellido;
        this.califFinal = califFinal;
        this.inscrito = inscrito;
    }

    // Metodos dentro de la clase van con nombre y parentesis
    estarInscrito() {
        if(this.inscrito)
            return "El Alumno está inscrito"
        else
            return "El Alumno no está inscrito"
    }

}
let andres = new Alumno ("andres", "chavez", 8.0, true)