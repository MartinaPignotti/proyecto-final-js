//Función descuento a jubilados.
let descuentoJubilado = () => {
  if (jubilado.value == 1) {
    return true;
  } else {
    return false;
  }
};

//Evento simular prestamo.
  let simular = $("#simular").on("click", function () {
  let monto = $("#monto");
  let cuotas = $("#cuotas");
  /*
        let jubilado = document.getElementById("jubilado");
        let mensaje = document.getElementById("mensaje");
        */
  $("#lista").append(`<h2>Aqui debajo, el resumen de tu prestamo:</h2>
                      El monto a prestar es : ${monto.val()}<br>
                      La opcion de cantidad de cuotas elegida es la : ${cuotas.val()} `);

  if (jubilado.value == true) {
    $("#mensaje").append("<p>Usted cuenta con descuento por jubilado</p>");
  } else {
    $("#mensaje").append("<p>Usted NO cuenta con descuento por jubilado</p>");
  }
  localStorage.setItem("monto",monto.val());
  localStorage.setItem("cuotas",cuotas.val());
});


//Boton borrar simulacion

$("#btnBorrar").click(function () {
  $("#lista").fadeOut();
  $("#mensaje").fadeOut();
});

//Evento simular devolución.

let devolucion = $("#devolucion").on("click", function () {
  let interes = () => {
    if (cuotas.value == 1) {
      return monto.value * 0.25;
    } else if (cuotas.value == 2) {
      return monto.value * 0.45;
    } else if (cuotas.value == 3) {
      return monto.value * 0.65;
    } else if (cuotas.value == 4) {
      return monto.value * 0.9;
    }
  };
  let descuento = () => {
    if (descuentoJubilado() == true) {
      return monto.value * 0.1;
    } else {
      return 0;
    }
  };

  let montoTotal = parseInt(monto.value) + interes() - descuento() 
  $("#div").append(`<h2>Aqui debajo, el monto a devolver: </h2>
                    El monto a pagar una vez finalizadas las cuotas seleccionadas es de : $${
                      montoTotal
                    }<br>`);
  localStorage.setItem("devolucion",montoTotal)

                            
  });

//Borrar devolucion:
$("#btnBorrar2").click(function () {
  $("#div").fadeOut();
});

// class usuario {
//   constructor(email, password) {
//     this.email = email;
//     this.password = password;
//   }
// }
// let usuarioRegistrado = [];

// let registro = $("#registrarse").on("click", function (e) {
//   e.preventDefault()
//   let email = document.getElementById("email").value;
//   let password = document.getElementById("password").value;

//   let nuevoUsuario = new usuario(email, password);
//   usuarioRegistrado.push(nuevoUsuario);

//   ususarioJSON = JSON.stringify(usuarioRegistrado);
//   localStorage.setItem("1", ususarioJSON);
// });

/*GEOLOCATION*/
let ubicacion = navigator.geolocation.getCurrentPosition(mostrarUbicacion);

function mostrarUbicacion(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let clima = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=f4b9fc257be5d1f6e38ddb93d1edfb3f&lang=es`;
  let startClima = false;
  $("#btnClima").click(function () {
    if (!startClima) {
      $.get(clima, function (datos) {
        console.log(datos);

        let resultado = `<div>
                          <h2>${datos.name}</h2>
                          <h2>Estado del clima: ${datos.weather[0].description}</h2>
                          <h2>Temperatura: ${datos.main.temp}</h2>
                          <h2>Humedad: ${datos.main.humidity}%</h2>
                        </div>`;

        $("#informacionClima").append(resultado);
      });
      startClima = true;
    }
  });
}

// Registrarse 

function addData(){
   let email = document.getElementById('newEmail').value;
   let password = document.getElementById('newPassword').value;

   localStorage.setItem('userEmail',email);
   localStorage.setItem('userPassword',password);

   let loggedEmail = localStorage.getItem('userEmail')

   document.getElementById("mostrarUsuario").innerHTML = `Hemos enviado un mail con los pasos a seguir a :<br>
   <span style="color:white; font-size:40px"> ${loggedEmail}</span>
   <br>
   <br>
    Muchas gracias !
   `;
   
}


function showData () {
  let getMonto = localStorage.getItem('monto');
  let getCuotas = localStorage.getItem('cuotas');
  let getDevolucion = localStorage.getItem('devolucion');

  document.getElementById("mostrarResumen").innerHTML = `El monto a recibir en modo de prestamo es :<span style="color:white; font-size:30px"> $${getMonto}</span>
  <br> la opción de cantidad de cuotas es la :<span style="color:white; font-size:30px"> ${getCuotas}</span>
  <br> El monto total a devolver una vez finalizado el préstamo sera de : <span style="color:white; font-size:30px"> $${getDevolucion}</span>

  `

}


  // let getEmail = localstorage.getItem('userEmail').value
  // if (getEmail.value == true) {
  //   $("#inicioExitoso").append("<p>Usted cuenta con descuento por jubilado</p>");
  // } else {
  //   $("#inicioExitoso").append("<p>Usted NO cuenta con descuento por jubilado</p>");
  // }




function checkData(e){

  let enterEmail = document.getElementById('email').value;
  let enterPassword = document.getElementById('password').value;

  let getEmail = localStorage.getItem('userEmail');
  let getPassword = localStorage.getItem('userPassword');

  if(enterEmail == getEmail)
  {
    if(enterPassword == getPassword){
      let newh3 = document.createElement("h3")
      let newMessage = document.createTextNode("Inicio de sesión exitoso! Bienvenido!");
      newh3.appendChild(newMessage)
      const currentDiv = document.getElementById("InicioExitoso");
      document.body.insertBefore(newh3, currentDiv);


      let user = document.createElement("h3")
      let userLogged = document.createTextNode(`Usuario activo : ${getEmail}`);
      user.appendChild(userLogged)
      const currentUser = document.getElementById("InicioExitoso");
      document.body.insertBefore(user, currentUser);
    }
    else{
      alert("Contraseña incorrecta")
    }
  }
  else{
    alert("Datos invalidos")
  }

}
