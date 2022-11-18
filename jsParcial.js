import { Aereo, Vehiculo, Terrestre } from "./Clases.js";
let url = "vehiculoAereoTerrestre.php";
////////////////////////////////////////////
////////////////CONFIG INICIAL//////////////
/////////////////////////////7//////////////
const form = document.getElementById("idFormulario");
const idSelec = document.getElementById("chid");
const nombreSelec = document.getElementById("chModelo");
const apellidoSelec = document.getElementById("chAniofab");
const edadSelec = document.getElementById("chVelMax");
const AltMaxSelec = document.getElementById("chAltMax");
const posicionSelec = document.getElementById("chAutonomia");
const AsesinatosSelec = document.getElementById("chCantPue");
const CantRueSelec = document.getElementById("chCantRue");

///aculta el formulario de ingreso.
document.getElementById("FormIngreso").style.display = "none";

// -----------------------------------------
// Obtener la cadena desde la api provista
// -----------------------------------------

let arrayVehiculos = [];
contenedor_loader.style.display = "none";

let consulta = fetch(url, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  // body: JSON.stringify(persona),
});
consulta
  .then((respuesta) => {
    console.log(respuesta);
    if (respuesta.status == 200) {
      respuesta
        .json()
        .then((datos) => {
          let miArray;
          console.log(datos);
          // miArray = JSON.parse(this.response);
          miArray = datos;
          GenerarArrayVehiculos(miArray);
        })
        .catch((e) => {
          console.log(e);
          contenedor_loader.style.display = "none";
        });
    } else {
      alert("ERROR: Conexion");
      contenedor_loader.style.display = "none";
    }
  })
  .catch((error) => {
    alert("ERROR: 200 ");
    contenedor_loader.style.display = "none";
  });

// console.log(miArray);
// function altaXML() {
//   let xhttp = new XMLHttpRequest();

//   xhttp.onreadystatechange = function () {
//     if (this.readyState == 4) {
//       if (this.status == 200) {
//         let miArray;
//         console.log(this.response);
//         // miArray = JSON.parse(this.response);
//         miArray = this.response;
//         GenerarArrayVehiculos(miArray);
//       } else {
//         alert("ERROR: no se puede cargar Lista");
//         generarTabla(arrayVehiculos);
//         // let spinner = document.getElementById("spinner");
//         spinner.style.display = "none";
//         Ordenar(arrayVehiculos);
//         Filtrar(arrayVehiculos);
//         Promedio(arrayVehiculos);
//       }
//     }
//   };
//   xhttp.open("GET", url, true);
//   xhttp.responseType = "json";
//   xhttp.send(null);
// }

//---------------------------------------------------------------------------------------------------------------------------
function GenerarArrayVehiculos(miArray) {
  // arrayVehiculos = miArray.filter((x) => {
  //   return x.id != 666;
  // });

  arrayVehiculos = miArray.map(function (x) {
    if (x.hasOwnProperty("altMax")) {
      return new Aereo(
        x.id,
        x.modelo,
        x.anoFab,
        x.velMax,
        x.altMax,
        x.autonomia
      );
    }
    if (x.hasOwnProperty("cantPue")) {
      return new Terrestre(
        x.id,
        x.modelo,
        x.anoFab,
        x.velMax,
        x.cantPue,
        x.cantRue
      );
    }
  });
  console.log(arrayVehiculos);
  generarTabla(arrayVehiculos);
  let spinner = document.getElementById("spinner");
  spinner.style.display = "none";
  Ordenar(arrayVehiculos);
  Filtrar(arrayVehiculos);
  Promedio(arrayVehiculos);
}

// -----------------------------------------
// GENERAR TABLA
// -----------------------------------------
function generarTabla(arrayVehiculos) {
  let selectTipo = document.getElementById("select");
  let cuerpoTabla = document.querySelector("#cuerpoTabla");

  if (!cuerpoTabla.childElementCount >= 0) {
    arrayVehiculos.forEach((persona) => {
      if (selectTipo.value == "Aereo" && persona instanceof Aereo) {
        cargarFilas(persona);
      } else if (
        selectTipo.value == "Terrestre" &&
        persona instanceof Terrestre
      ) {
        cargarFilas(persona);
      } else if (selectTipo.value == "todos") {
        cargarFilas(persona);
      }
    });
  }
}

function cargarFilas(persona) {
  let cuerpoTabla = document.querySelector("#cuerpoTabla");
  let datos = [
    persona.Id,
    persona.Modelo,
    persona.AnoFab,
    persona.VelMax,
    persona.AltMax, //4-----------------------------------------------------------------
    persona.Autonomia,
    persona.CantPue, //6
    persona.CantRue,
  ];
  let btnEliminar = document.createElement("button");
  btnEliminar.className = "btn btn-light";
  btnEliminar.textContent = "Eliminar";
  btnEliminar.addEventListener("click", (event) => {
    // event.target.parentNode.parentNode.remove();
    let evento = event.target.parentNode.parentNode;
    abmTitulo.textContent = "ABM Eliminar";

    ocultarCargar();
    // EliminarPersona(evento.cells[0].innerHTML);
  });

  let btnModificar = document.createElement("button");
  btnModificar.className = "btn btn-light";
  btnModificar.textContent = "Modificar";
  btnModificar.addEventListener("click", (evento) => {
    abmTitulo.textContent = "ABM Modificar";
    ocultarCargar();
  });
  let tr = document.createElement("tr");
  // tr.addEventListener("dblclick", ocultarCargar);

  for (let i = 0; i < datos.length + 2; i++) {
    let td = document.createElement("td");
    // td.className = "columna" + i;
    td.textContent = datos[i];
    if (datos[i] == null && i != 9 && i != 8) td.textContent = "N/A";

    if (i == 9) {
      td.appendChild(btnEliminar);
      // td.className = "columna" + i;
      // td.textContent = "columna" + i;
    }
    if (i == 8) {
      td.appendChild(btnModificar);
      // td.className = "columna" + i;
      // td.textContent = "columna" + i;
    }

    tr.appendChild(td);
  }
  cuerpoTabla.appendChild(tr);
}

// -----------------------------------------
// CARGA EL FORMULARIO DE INGRESO CON LOS DATOS
// DE LA TABLA.
// -----------------------------------------
function cargarCampos() {
  // var tr = event.target.parentNode;
  var tr = event.target.parentNode.parentNode;

  document.getElementById("FormIngreso").style.display = "";
  document.getElementById("fID").value = tr.cells[0].innerHTML;
  document.getElementById("fModelo").value = tr.cells[1].innerHTML;
  document.getElementById("fAniofab").value = tr.cells[2].innerHTML;
  document.getElementById("fVelMax").value = tr.cells[3].innerHTML;

  if (tr.cells[4].innerHTML != "N/A" && tr.cells[5].innerHTML != "N/A") {
    document.getElementById("selectTipo").value = "Aereo";
    document.getElementById("input1").value = tr.cells[4].innerHTML;
    document.getElementById("input2").value = tr.cells[5].innerText;
  } else {
    document.getElementById("selectTipo").value = "Terrestre";
    document.getElementById("input1").value = tr.cells[6].innerHTML;
    document.getElementById("input2").value = tr.cells[7].innerText;
  }
}

// -----------------------------------------
// FILTRAR TABLA SELEC :Aereo/Terrestre
// -----------------------------------------
function Filtrar(arrayVehiculos) {
  let seleccion = document.getElementById("select");
  seleccion.addEventListener("change", select);
  function select() {
    let x = document.getElementById("select").value;
    limpiarTabla();
    generarTabla(arrayVehiculos);
  }
}
// -----------------------------------------
// LIMPIAR TABLA
// -----------------------------------------
function limpiarTabla() {
  const myNode = document.getElementById("cuerpoTabla");
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild);
  }
}

// -----------------------------------------
// SELECT TIPO Y CAMBIA EL PLACEHOLDER DE INPUT
// -----------------------------------------

let selector = document.getElementById("selectTipo");
selector.addEventListener("change", selectForm);

function selectForm() {
  if (document.getElementById("selectTipo").value == "Terrestre") {
    document.getElementsByName("input1")[0].placeholder = "cantP";
    document.getElementsByName("input2")[0].placeholder = "cantR";
  } else {
    document.getElementsByName("input1")[0].placeholder = "AltMax";
    document.getElementsByName("input2")[0].placeholder = "Autonomia";
  }
}

////-------------------------
//SACAR PROMEDIO
///------------------------

function Promedio(arrayVehiculos) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let contador = 0;
    let acumulador = 0;
    let promedio = 0;
    let selectTipo = document.getElementById("select");
    let cuerpoTabla = document.querySelector("#cuerpoTabla");
    if (!cuerpoTabla.childElementCount >= 0) {
      arrayVehiculos.forEach((persona) => {
        // console.log(persona.VelMax);

        if (selectTipo.value == "Aereo" && persona instanceof Aereo) {
          contador++;
          acumulador += persona.VelMax;
        } else {
          if (selectTipo.value == "Terrestre" && persona instanceof Terrestre) {
            contador++;
            acumulador += persona.VelMax;
          } else {
            if (selectTipo.value == "todos") {
              contador++;
              acumulador += persona.VelMax;
            }
          }
        }
      });

      promedio = acumulador / contador;

      document.getElementById("calcular").value = promedio.toFixed(2);
    }
  });
}

// -----------------------------------------
// AGREGAR, OCULTAR O MOSTRAR
// -----------------------------------------
let agregar = document.getElementById("agregar");
agregar.addEventListener("click", (evento) => {
  abmTitulo.textContent = "ABM Alta";
  selectTipo.value = "Aereo";
  visibilidad();
});

function ocultarCargar() {
  visibilidad();
  cargarCampos();
}

function visibilidad() {
  if (document.getElementById("FormIngreso").style.display == "") {
    document.getElementById("FormIngreso").style.display = "none";
    document.getElementById("formDatos").style.display = "";
  } else {
    document.getElementById("formDatos").style.display = "none";
    document.getElementById("FormIngreso").style.display = "";
  }
  //limpiarCampos();
}

// -----------------------------------------
// ALTA DE PERSONA
// -----------------------------------------
// let alta = document.getElementById("alta");
// alta.addEventListener("click", agregarPersona);

function insertarNuevo() {
  let indice = arrayVehiculos.length - 1;
  let newPersona = arrayVehiculos[indice];
  cargarFilas(newPersona);
}
// -----------------------------------------
// FORMULARIO
// ALTA PERSONA
// -----------------------------------------

// let altas = document.getElementById("alta");
// altas.addEventListener("click", agregarPersona);-----------------------------------------------------------Modificar
let altas = document.getElementById("AMBaceptar");
altas.addEventListener("click", Agregar_Modificar);

function Agregar_Modificar() {
  if (abmTitulo.textContent == "ABM Alta") {
    agregarPersona();
  } else if (abmTitulo.textContent == "ABM Modificar") {
    modificarPersona();
  } else {
    EliminarPersona();
  }
}

function agregarPersona() {
  contenedor_loader.style.display = "block";
  let persona = null;
  // let imput1 = document.getElementById("inpu1");

  // console.log(imput1);

  if (
    fModelo.value != "" &&
    fAniofab.value != "" &&
    fVelMax.value != "" &&
    fModelo.value != null &&
    fAniofab.value != null &&
    fAniofab.value > 1885 &&
    fVelMax.value > 0 &&
    fVelMax.value != null
  ) {
    if (document.getElementById("selectTipo").value == "Terrestre") {
      if (
        input1.value != null &&
        input2.value != null &&
        input1.value > -1 &&
        input2.value > 0
      ) {
        persona = new Terrestre(
          "",
          fModelo.value,
          fAniofab.value,
          fVelMax.value,
          input1.value,
          input2.value
        );
      }
    } else {
      if (
        input1.value != null &&
        input2.value != null &&
        input1.value > 0 &&
        input2.value > 0
      ) {
        persona = new Aereo(
          "",
          fModelo.value,
          fAniofab.value,
          fVelMax.value,
          input1.value,
          input2.value
        );
      }
    }
    if (persona != null) {
      altaXML(persona);

      // console.log(JSON.stringify(persona));---------------------------------------------------

      //  fetch("personasAereosTerrestres.php", {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(persona),
      //   })
      //     .then((respuesta) => respuesta.json())
      //     .then((datos) => {
      //       contenedor_loader.style.display = "none";
      //       console.log(datos);
      //       persona.id = datos.id;
      //       arrayVehiculos.push(persona);
      //       insertarNuevo();
      //       visibilidad();
      //       limpiarCampos();
      //     });
    } else {
      alert("ERROR: Complete Correctamente los Campos");
      contenedor_loader.style.display = "none";
    }
  } else {
    alert("ERROR: Complete Correctamente los Campos");
    contenedor_loader.style.display = "none";
  }
}
function altaXML(persona) {
  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log(this.response);
        contenedor_loader.style.display = "none";
        persona.id = this.response.id;
        arrayVehiculos.push(persona);
        insertarNuevo();
        visibilidad();
        limpiarCampos();
      } else {
        alert("ERROR: no se puede cargar Lista");
        visibilidad();
        limpiarCampos();
      }
    }
  };
  xhttp.open("PUT", url, true);

  xhttp.responseType = "json";
  console.log(persona);
  xhttp.send(JSON.stringify(persona));
}
//------------------------------------------------------------------------------------------//

// // -----------------------------------------
// // FORMULARIO
// // ELIMINAR PERSONA
// // -----------------------------------------
// let eliminar = document.getElementById("eliminar");
// eliminar.addEventListener("click", EliminarPersona);.-------------------------------------------------------------Modificar

function EliminarPersona() {
  let id = parseInt(document.getElementById("fID").value);
  contenedor_loader.style.display = "block";

  console.log(id);

  let persona = arrayVehiculos.find((per) => per.Id == id);

  deleteFetch(persona);
}

async function deleteFetch(persona) {
  let respuesta = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(persona),
  });
  let texto = await respuesta.text();

  console.log(respuesta);
  if (respuesta.status == 200) {
    let indexPersona = arrayVehiculos.findIndex((per) => per.Id == persona.id);

    arrayVehiculos.splice(indexPersona, 1);

    // console.log(arrayVehiculos);
    if (!isNaN(persona.id)) {
      visibilidad();
    }
    limpiarCampos();
    limpiarTabla();
    generarTabla(arrayVehiculos);
    contenedor_loader.style.display = "none";
  } else {
    visibilidad();
    limpiarCampos();
    contenedor_loader.style.display = "none";
    alert("ERROR: Algo salio mal");
  }
}
// // -----------------------------------------
// // FORMULARIO
// // MODIFICAR PERSONA
// // -----------------------------------------
// let modificar = document.getElementById("modificar");--------------------------------------------------------------MODIFICAR
// modificar.addEventListener("click", modificarPersona);

function modificarPersona() {
  contenedor_loader.style.display = "block";
  let id = parseInt(document.getElementById("fID").value);
  // let personaa = arrayVehiculos.find((per) => per.Id == id);
  let indexPersona = arrayVehiculos.findIndex((per) => per.Id == id);
  let persona = null;
  let apellido = document.getElementById("fAniofab").value;
  let nombre = document.getElementById("fModelo").value;
  let edad = parseInt(document.getElementById("fVelMax").value);
  let inpu1 = document.getElementById("input1").value;
  let inpu2 = document.getElementById("input2").value;

  if (
    fModelo.value != "" &&
    fAniofab.value != "" &&
    fVelMax.value != "" &&
    fModelo.value != null &&
    fAniofab.value != null &&
    fAniofab.value > 1885 &&
    fVelMax.value > 0 &&
    fVelMax.value != null
  ) {
    if (document.getElementById("selectTipo").value == "Aereo") {
      if (
        input1.value != null &&
        input2.value != null &&
        input1.value > 0 &&
        input2.value > 0
      ) {
        persona = new Aereo(
          id,
          fModelo.value,
          fAniofab.value,
          fVelMax.value,
          input1.value,
          input2.value
        );
      }
    } else {
      if (
        input1.value != null &&
        input2.value != null &&
        input1.value > -1 &&
        input2.value > 0
      ) {
        persona = new Terrestre(
          id,
          fModelo.value,
          fAniofab.value,
          fVelMax.value,
          input1.value,
          input2.value
        );
      }
    }

    if (persona != null) {
      postFetch(persona, indexPersona);
    } else {
      contenedor_loader.style.display = "none";
      alert("ERROR: Complete Correctamente los Campos");
    }

    // arrayVehiculos[indexPersona] = personaa;

    // visibilidad();
    // limpiarCampos();
    // limpiarTabla();
    // generarTabla(arrayVehiculos);
  } else {
    alert("Completar el formulario con datos correctos");
    contenedor_loader.style.display = "none";
  }
}
async function postFetch(persona, indexPersona) {
  let respuesta = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(persona),
  });
  console.log(respuesta);
  let texto = await respuesta.text();

  console.log(texto);
  if (texto == "Exito") {
    contenedor_loader.style.display = "none";
    arrayVehiculos[indexPersona] = persona;
    visibilidad();
    limpiarCampos();
    limpiarTabla();
    generarTabla(arrayVehiculos);
  } else {
    contenedor_loader.style.display = "none";
    visibilidad();
    limpiarCampos();
    alert("ERROR: Algo salio mal");
  }
}

///------------------------------
// BOTON CANCELAR
//---------------------------
let cancelar = document.getElementById("cancelar");
cancelar.addEventListener("click", visibilidad);

//Function ORdenar
// ///--------------------------------------------------------------

function Ordenar(arrayVehiculos) {
  let Id = document.getElementById("inputId");
  let Modelo = document.getElementById("inpModelo");
  let Aniofab = document.getElementById("inpAniofab");
  let VelMax = document.getElementById("inpVelMax");
  let alterego = document.getElementById("inpAltMax");

  let CantRue = document.getElementById("inpCantRue");
  let ciudad = document.getElementById("inpAutonomia");
  let CantPue = document.getElementById("inpCantPue");

  // console.log(arrayVehiculos);

  Id.addEventListener("click", function () {
    arrayVehiculos.sort((a, b) => {
      {
        if (a.Id > b.Id) {
          return 1;
        } else if (a.Id == b.Id) {
          return 0;
        } else {
          return -1;
        }
      }
    });
    limpiarTabla();
    generarTabla(arrayVehiculos);
  });

  Modelo.addEventListener("click", function () {
    arrayVehiculos.sort((a, b) => {
      {
        if (a.Modelo.toLowerCase() > b.Modelo.toLowerCase()) {
          return 1;
        } else if (a.Modelo.toLowerCase() == b.Modelo.toLowerCase()) {
          return 0;
        } else {
          return -1;
        }
      }
    });
    limpiarTabla();
    generarTabla(arrayVehiculos);
  });
  Aniofab.addEventListener("click", function () {
    arrayVehiculos.sort((a, b) => {
      {
        if (a.Aniofab > b.Aniofab) {
          return 1;
        } else if (a.Aniofab == b.Aniofab) {
          return 0;
        } else {
          return -1;
        }
      }
    });
    limpiarTabla();
    generarTabla(arrayVehiculos);
  });
  VelMax.addEventListener("click", function () {
    arrayVehiculos.sort((a, b) => {
      {
        if (a.VelMax > b.VelMax) {
          return 1;
        } else if (a.VelMax == b.VelMax) {
          return 0;
        } else {
          return -1;
        }
      }
    });
    limpiarTabla();
    generarTabla(arrayVehiculos);
  });
  alterego.addEventListener("click", function () {
    arrayVehiculos.sort((a, b) => {
      {
        if (a.AltMax > b.AltMax) {
          return 1;
        } else if (a.AltMax == b.AltMax) {
          return 0;
        } else {
          return -1;
        }
      }
    });
    limpiarTabla();
    generarTabla(arrayVehiculos);
  });

  ciudad.addEventListener("click", function () {
    arrayVehiculos.sort((a, b) => {
      {
        if (a.Autonomia > b.Autonomia) {
          return 1;
        } else if (a.Autonomia == b.Autonomia) {
          return 0;
        } else {
          return -1;
        }
      }
    });
    limpiarTabla();
    generarTabla(arrayVehiculos);
  });
  CantPue.addEventListener("click", function () {
    arrayVehiculos.sort((a, b) => {
      {
        if (a.CantPue > b.CantPue) {
          return 1;
        } else if (a.CantPue == b.CantPue) {
          return 0;
        } else {
          return -1;
        }
      }
    });
    limpiarTabla();
    generarTabla(arrayVehiculos);
  });

  CantRue.addEventListener("click", function () {
    arrayVehiculos.sort((a, b) => {
      {
        console.log(a.Enemigo);
        if (a.Enemigo > b.Enemigo) {
          return 1;
        } else if (a.Enemigo == b.Enemigo) {
          return 0;
        } else {
          return -1;
        }
      }
    });
    limpiarTabla();
    generarTabla(arrayVehiculos);
  });
}

///------------------------------
//NUMERO RANDOM
//-------------------------------
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// -----------------------------------------
// FORMULARIO
// LIMPIAR CAMPOS!
// -----------------------------------------
function limpiarCampos() {
  document.getElementById("fID").value = "";
  document.getElementById("fAniofab").value = "";
  document.getElementById("fModelo").value = "";
  document.getElementById("fVelMax").value = "";
  document.getElementById("input1").value = "";
  document.getElementById("input2").value = "";
}
// -----------------------------------------
// BUscarId
// -----------------------------------------
function existeId(id) {
  let existe = false;
  arrayVehiculos.forEach((newPersona) => {
    if (newPersona.Id == id) {
      existe = true;
    }
  });
  return existe;
}
