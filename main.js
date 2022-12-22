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

  $("#div").append(`<h2>Aqui debajo, el monto a devolver: </h2>
                    El monto a pagar una vez finalizadas las cuotas seleccionadas es de : $${
                      parseInt(monto.value) + interes() - descuento()
                    }<br>`);
});

//Borrar devolucion:
$("#btnBorrar2").click(function () {
  $("#div").fadeOut();
});

class usuario {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
}
let usuarioRegistrado = [];

let registro = $("#registrarse").on("click", function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let nuevoUsuario = new usuario(email, password);
  usuarioRegistrado.push(nuevoUsuario);

  ususarioJSON = JSON.stringify(usuarioRegistrado);
  localStorage.setItem("1", ususarioJSON);
});

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
