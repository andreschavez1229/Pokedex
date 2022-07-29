class Bebida {
    constructor (CantidadMl = 1000) {
        this.CantidadMl = CantidadMl  
    }

    
}

class Cerveza extends Bebida{//subclase o clase hijo
    constructor(porcentajeAlcohol = 10){
        super("Cerveza")
        this.CantidadMl = 10
        this.porcentajeAlcohol = porcentajeAlcohol
        }
    }

class Refresco extends Bebida{//subclase o clase hijo
    constructor(azucar = 15){
        super("Refresco")
        this.azucar = azucar
        }

    }
    


let RefrescoManzana = new Refresco (1000, 25)
let CervezaOscura = new Cerveza (1000, 10)
console.log("Tu refresco contiene " + this.azucar + "gramos de azúcar")
console.log("Tu cerveza contiene " + this.porcentajeAlcohol + "en porcentaje de alcohol")
