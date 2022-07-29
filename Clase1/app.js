    // Frase insertada por el usuario
    var fraseUser = prompt("Escribe una frase y sabrás si es un Palindromo",);
    // Funcion de comparación
    function frasePalindromo(fraseUser){
      // Paso la fraseUser a minusculas y quito espacios
      fraseUser=fraseUser.toLowerCase().replace(/\s/g,"");
      /* Creo otra frase partiendo de la de userFrase pero
      la convierto en array, le doy la vuelta al array, lo paso a string*/
      fraserReverse=fraseUser.split("").reverse().toString();
      // Le quito las "," con un remplace dentro del for
      // Lo igualo a -1 ya que tiene una coma menos que el número total de letras
      for (var i = 0; i < ((fraserReverse.length)-1); i++) {
        fraserReverse=fraserReverse.replace(",","");
      };
      // Comparo las dos frases.
      if(fraseUser==fraserReverse){
        // Si el resultado es positivo
        resultado="es un Palindromo";
      }
      else{
        // Si el resultado es negativo
        resultado="no es un Palindromo";
      }
      // Muestro el el resultado
      document.write("Tu frase "+resultado);
    }
    // Llamo a la función comparación con el parámetro del user
    frasePalindromo(fraseUser);