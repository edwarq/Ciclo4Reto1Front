
function activaNuevo(){
  $("#username").focus();
}
activaNuevo();
const formulario = document.getElementById("login-form");
const inputs = document.querySelectorAll("#login-form input");
const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

let campos = {
  nombre: false,
  password: false,
  correo: false,
};
const validarFormulario = (e) => {
  switch (e.target.name) {
    case "username":
      if (expresiones.nombre.test(e.target.value)) {
        document.getElementById("username").classList.remove("incorrecto");
        document.getElementById("username").classList.add("correcto");
        document.querySelector("#group1 .formulario__input-error").classList.remove("formulario__input-error-activo");
        campos.nombre = true;
        console.log(campos.nombre);
      } else {
        document.querySelector("#group1 .formulario__input-error").classList.add("formulario__input-error-activo");
        document.getElementById("username").classList.add("incorrecto");
      }
      break;
    case "useremail":
      if (expresiones.correo.test(e.target.value)) {
        document.getElementById("useremail").classList.remove("incorrecto");
        document.getElementById("useremail").classList.add("correcto");
        document.querySelector("#group2 .formulario__input-error").classList.remove("formulario__input-error-activo");
        campos.correo = true;
        console.log(campos.correo);
      } else {
        document.querySelector("#group2 .formulario__input-error").classList.add("formulario__input-error-activo");
        document.getElementById("useremail").classList.add("incorrecto");
      }
      break;
    case "password":
      if (expresiones.password.test(e.target.value)) {
        document.getElementById("password").classList.remove("incorrecto");
        document.getElementById("password").classList.add("correcto");
        document.querySelector("#group3 .formulario__input-error").classList.remove("formulario__input-error-activo");
      } else {
        document.querySelector("#group3 .formulario__input-error").classList.add("formulario__input-error-activo");
        document.getElementById("password").classList.add("incorrecto");
      }
      break;
    case "passwordrepeat":
      validarPassword2();
      break;
  }
};

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("passwordrepeat");
  if (inputPassword1.value !== inputPassword2.value) {
    document
      .querySelector("#group4 .formulario__input-error")
      .classList.add("formulario__input-error-activo");
    document.getElementById("passwordrepeat").classList.add("incorrecto");
  } else {
    document
      .querySelector("#group4 .formulario__input-error")
      .classList.remove("formulario__input-error-activo");
    document.getElementById("passwordrepeat").classList.remove("incorrecto");
    document.getElementById("passwordrepeat").classList.add("correcto");
    campos.password = true;
    console.log(campos.password);
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submit");
  emailValidation(campos.nombre, campos.correo, campos.password);
});

async function emailValidation(nombre, correo, password) {
  const email = document.getElementById("useremail").value;
  const reponse = await fetch("http://152.70.124.82:8081/api/user/" + email);
  const reponseJsonFormat = await reponse.json();
  console.log(reponseJsonFormat);

  const pass1 = document.getElementById("password").value;
  const pass2 = document.getElementById("passwordrepeat").value;

  if (!reponseJsonFormat) {
    if (expresiones.correo.test(email)) {
      if (pass1 == pass2) {
        if (nombre && correo && password) {
          let NuevoRegistro = {
            email: document.getElementById("useremail").value,
            password: document.getElementById("password").value,
            name: document.getElementById("username").value,
          };

          let datosPeticion = JSON.stringify(NuevoRegistro);

          $.ajax({
            // la URL para la petición (url: "url al recurso o endpoint")
            url: "http://152.70.124.82:8081/api/user/new",
            data: datosPeticion,
            type: "POST",
            contentType: "application/JSON",
            success: function (respuesta) {
              console.log(respuesta);
            },

            error: function (xhr, status) {
              $("#mensajes").html(
                "Ocurrio un problema al ejecutar la petición..." + status
              );
            },
            // código a ejecutar sin importar si la petición falló o no
            complete: function (xhr, status) {},
          });
          formulario.reset();
          alert("Se ha registrado correctamente! ");
          document.getElementById("username").classList.remove("correcto");
          document.getElementById("useremail").classList.remove("correcto");
          document.getElementById("password").classList.remove("correcto");
          document.getElementById("passwordrepeat").classList.remove("correcto");
          //document.getElementsByTagName('input').classList.remove('incorrecto')
        }
      } else {
        alert("Las contraseñas no coinciden.");
      }
    } else {
      alert("EL formato del email es incorrecto, intentelo nuevamente.");
    }
  } else {
    alert("Esta cuenta de correo ya se encuentra registrada.");
    $("#username").val("");
    $("#useremail").val("");
    $("#password").val("");
    $("#password").val("");
    $("#passwordrepeat").val("");
    $("#username").focus();
  }
}
