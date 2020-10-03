/*
  Curso: Javascript
  Estudiante: José Miguel Molina Rondón
  ENTREGA FINAL | 02-10-2020

  - SE AGREGA SPA SINGLE PAGE APPLICATION AL PROYECTO
  - LAS 3 URLs SON /solicitudes, /testimonios, y / AL HACER CLIC SOBRE EL LOGO SUPERIOR
  - LA URL /testimonios CARGA SUS DATOS LEYENDO TESTIMONIOS.JSON
  - LA URL /solicitudes CARGA EL HTML DE SOLICITUDES.JS Y PERMITE HACER LAS COTIZACIONES
  - EN SOLICITUDES SE REALIZAN EVENTOS DE DESAPARICIÓN Y CREACIÓN DE ELEMENTOS DEL DOM
  - TODOS LOS EVENTOS FUERON PASADOS A JQUERY
  - SE TUVO QUE USAR SELECTORES AVANZADOS EN JQUERY DEBIDO A QUE SE CARGA EL HTML DE UN STRING LUEGO DE INGRESAR A "SOLICITUDES"
  - MEJORAS EN CSS
  - SE MANTIENE TODO LO DE LA 1ERA, 2DA Y 3ERA ENTREGA

*/

//VARIABLES GLOBALES
var logo = 0;
var papeleria = 0;
var empaque = 0;
var branding = 0;
var tipo = "";
var resultadoLogos = 0;
var resultadoPapeleria = 0;
var resultadoEmpaque = 0;
var resultadoBranding = 0;
var total = 0;
var d = document;
var presupuesto;
var nombre;
var email;

//Precio del Logo como constante - los demás se toman de db.js
const precioLogo = 30000;
//Solo para inicializar la variabla precioPapeleria - el precio real lo tomo de db.js
var precioPapeleria = 0;
//Solo para inicializar la variabla precioEmpaque - el precio real lo tomo de db.js
var precioEmpaque = 0;
//Solo para inicializar la variabla precioBranding - el precio real lo tomo de db.js
var precioBranding = 0;
//Descuento del 10%
const descuento = 0.90;
//Impuesto 19%
const iva = 0.19;

//VARIABLE PARA JSON
//var solicitanteJSON = { "nombre": "", "email": "", "total": null };
var solicitanteJSON = {
    "nombre": "", "email": "", "total": null, "logotipo": "", "papeleria": "",
    "empaque": "", "branding": "", "tituloLogotipo": null, "tituloPapeleria": "", "tituloEmpaque": "",
    "tituloBranding": "", "cotizar": "", "info": ""
};

// Constantes Para el manejo de eventos en JAVASCRIPT puro 

// const inputNombre = d.getElementById("nombre");
// const inputEmail = d.getElementById("email");
// const inputLogo = d.getElementById("logotipo");
// const inputPapeleria = d.getElementById("papeleria");
// const inputEmpaque = d.getElementById("empaque");
// const inputBranding = d.getElementById("branding");
// const labelLogo = d.getElementById("tituloLogotipo");
// const labelPapeleria = d.getElementById("tituloPapeleria");
// const labelEmpaque = d.getElementById("tituloEmpaque");
// const labelBranding = d.getElementById("tituloBranding");
// const buttonCotizar = d.getElementById("cotizar");
// const legendInfo = d.getElementById("info");

//FUNCION PARA SOLICITAR LOGOTIPO
function solicitarLogo() {
    tipo = "LOGOTIPO";
    logo = d.getElementById("logotipo").value;
    //noEsNumero(logo,tipo);
    resultadoLogos = calculos(logo, tipo, precioLogo);
    return resultadoLogos;
}

//FUNCION PARA SOLICITAR PAPELERIA
function solicitarPapeleria() {
    tipo = "Combos de PAPELERÍA";
    //papeleria = d.getElementById("papeleria").value;
    //noEsNumero(papeleria,tipo);

    papeleria = document.querySelector('#papeleria').value;

    //Recupero el precio del db.js
    filtroPrecioPapeleria = productosPapeleria.find(elem => elem.seleccion.toUpperCase() == papeleria);
    if (filtroPrecioPapeleria) {
        console.log("Combo Papelería seleccionado: " + papeleria + " | Precio:  " + filtroPrecioPapeleria.precio);
        precioPapeleria = parseInt(filtroPrecioPapeleria.precio);
        cantidad = 1;
    } else {
        console.log("No seleccionó Papelería: " + papeleria);
        cantidad = 0;
    }

    // resultadoPapeleria = calculos(papeleria, tipo, precioPapeleria, resultadoPapeleria);
    //Debo agregar otro input para agregar la cantidad de papelería y que no sea siempre 1 cantidad por combo
    resultadoPapeleria = calculos(cantidad, tipo, precioPapeleria);

    return resultadoPapeleria;
}

//FUNCION PARA SOLICITAR EMPAQUE
function solicitarEmpaque() {
    tipo = "Combos de EMPAQUE";
    //empaque = d.getElementById("empaque").value;
    //noEsNumero(empaque,tipo);

    empaque = document.querySelector('#empaque').value;

    //Recupero el precio del db.js
    filtroPrecioEmpaque = productosEmpaque.find(elem => elem.seleccion.toUpperCase() == empaque);
    if (filtroPrecioEmpaque) {
        console.log("Combo Empaque seleccionado: " + empaque + " | Precio:  " + filtroPrecioEmpaque.precio);
        precioEmpaque = parseInt(filtroPrecioEmpaque.precio);
        cantidad = 1;
    } else {
        console.log("No seleccionó Empaque: " + empaque);
        cantidad = 0;
    }


    //resultadoEmpaque = calculos(empaque, tipo, precioEmpaque, resultadoEmpaque);
    //Debo agregar otro input para agregar la cantidad de empaques y que no sea siempre 1 una cantidad por combo
    resultadoEmpaque = calculos(cantidad, tipo, precioEmpaque);
    return resultadoEmpaque;
}

//FUNCION PARA SOLICITAR BRANDING
function solicitarBranding() {
    tipo = "Combos de Branding";
    //branding = d.getElementById("branding").value;
    //noEsNumero(branding,tipo);

    branding = document.querySelector('#branding').value;

    //Recupero el precio del db.js
    filtroPrecioBranding = productosBranding.find(elem => elem.seleccion.toUpperCase() == branding);
    if (filtroPrecioBranding) {
        console.log("Combo Branding seleccionado: " + branding + " | Precio:  " + filtroPrecioBranding.precio);
        precioBranding = parseInt(filtroPrecioBranding.precio);
        cantidad = 1;
    } else {
        console.log("No seleccionó Branding: " + branding);
        cantidad = 0;
    }

    //resultadoBranding = calculos(branding, tipo, precioBranding, resultadoBranding);
    //Debo agregar otro input para agregar la cantidad de branding y que no sea siempre 1 cantidad por combo
    resultadoBranding = calculos(cantidad, tipo, precioBranding);
    return resultadoBranding;
}

//OBJETO COTIZACION
function Cotizacion(cantLogo, cantPapeleria, cantEmpaque, cantBranding) {
    this.cantLogo = cantLogo;
    this.cantPapeleria = cantPapeleria;
    this.cantEmpaque = cantEmpaque;
    this.cantBranding = cantBranding;


    //COMPONENTES DEL OBJETO COTIZACION
    this.composicion = function () {
        console.log("\n\nMi cotización finalmente se compuso de: " +
            "\n\n" + cantLogo + " logotipos" +
            "\n" + cantPapeleria + " Combos de papelería" +
            "\n" + cantEmpaque + " Combos de empaque" +
            "\n" + cantBranding + " Combos de branding");
    }

    //METODO PERTENECIENTE AL OBJETO PARA CALCULAR EL VALOR DE LA COTIZACION
    //Se invoca al hacer clic en el boton Cotizar del index.html
    //Utiliza componentes del mismo objeto y datos de las otras funciones
    //como los resultados de cada solicitud por ejemplo
    this.cotizar = function () {

        total = resultadoLogos + resultadoPapeleria + resultadoEmpaque + resultadoBranding;
        totalIva = total + (total * iva);


        console.log("\n\nCOTIZACIÓN FINAL\n\nLOGOS | Cantidad: " + cantLogo + " / Subtotal: " + resultadoLogos + " CLP" +
            "\nCOMBOS DE PAPELERÍA | Cantidad: " + cantPapeleria + " / Subtotal: " + resultadoPapeleria + " CLP" +
            "\nCOMBOS DE EMPAQUE | Cantidad: " + cantEmpaque + " / Subtotal: " + resultadoEmpaque + " CLP" +
            "\nCOMBOS DE BRANDING | Cantidad: " + cantBranding + " / Subtotal: " + resultadoBranding + " CLP" +
            "\n\nTOTAL: " + total + " CLP" +
            "\nTOTAL + IVA (19%): " + totalIva + " CLP"); //+
        //"\n\nARREGLO RESUMEN DE CANTIDADES: " + arregloResumenCantidades());

    }
}


//LIMPIA EL FORMULARIO llamado desde el Boton LIMPIAR del DOM
function remover() {
    $("#formulario")[0].reset();
    console.log("JQUERY - Se reinicia el formulario")
}

//FUNCION QUE INSTANCIA AL OBJETO Y CALCULA EN ÉL LA COTIZACION FINAL
//Es llamado en el botón Cotizar del HTML
function totalCotizacion() {

    if (($('#nombre').val().length > 0 && $('#email').val().length > 0 && $('#logotipo').val().length > 0) && validarEmail($('#email').val()) == true) {
        //if ((inputNombre.value.length > 0 && inputEmail.value.length > 0 && inputLogo.value.length > 0) && validarEmail(inputEmail.value) == true) {

        solicitarLogo();
        solicitarPapeleria();
        solicitarEmpaque();
        solicitarBranding();

        //INSTANCIA DEL OBJETO COTIZACION
        //Se utiliza para invocar el método cotizar() del Objeto en el botón Cotizar del index.html
        var miCotizacion = new Cotizacion(logo, papeleria, empaque, branding);
        miCotizacion.cotizar();
        //miCotizacion.composicion();

        //JSON Y SESSIONSTORAGE
        guardarJSON(totalIva);
        mostrarSTORAGE();
        recuperarJSON();

        //Verifico si hay resultados anteriores en el div de resultados de cotización
        const mostrarTodo = document.querySelector('#presupuesto div')
        if (mostrarTodo != null) {
            mostrarTodo.remove();
        }

        //Agregar elementos al HTML
        agregar();

        //para usar en el JQUERY
        return true;
        //

    } else {


        if (!$('#nombre').val().length) {
            //if (!inputNombre.value.length) {
            alert("Ingresa tu nombre");
            $('#nombre').focus();
            //inputNombre.focus();
        } else {
            if (!$('#email').val().length) {
                //if (!inputEmail.value.length) {
                alert("Ingresa tu correo electrónico");
                $('#email').focus();
                //inputEmail.focus();
            } else {
                if (!$('#logotipo').val().length && $('#componentes').css('display') == 'none') { // el OR para que no pida logo si está aún oculto
                    //if (!inputLogo.value.length) {
                    alert('Debes hacer clic en "Siguiente"');
                    $('#logotipo').focus();
                    //inputLogo.focus();

                } else {
                    if (!$('#logotipo').val().length) {
                        //if (!inputLogo.value.length) {
                        alert("Ingresa al menos la cantidad de logotipos");
                        $('#logotipo').focus();
                        //inputLogo.focus();

                    }
                }
            }
        }

        //para usar en el JQUERY
        return false;
        //
    }
}


//FUNCIONES JSON Y LOCALSTORAGE
//Asignando valores de elementos HTML al JSON declarado como String al inicio
function guardarJSON(total) {

    solicitanteJSON.nombre = d.getElementById('nombre').value;
    solicitanteJSON.email = d.getElementById('email').value;
    solicitanteJSON.total = total;

    solicitanteJSON.logotipo = d.getElementById("logotipo").value;
    solicitanteJSON.papeleria = d.getElementById("papeleria").value;
    solicitanteJSON.empaque = d.getElementById("empaque").value;
    solicitanteJSON.branding = d.getElementById("branding").value;
    solicitanteJSON.tituloLogotipo = d.getElementById("tituloLogotipo").value;
    solicitanteJSON.tituloPapeleria = d.getElementById("tituloPapeleria").value;
    solicitanteJSON.tituloEmpaque = d.getElementById("tituloEmpaque").value;
    solicitanteJSON.tituloBranding = d.getElementById("tituloBranding").value;
    solicitanteJSON.cotizar = d.getElementById("cotizar").value;
    solicitanteJSON.info = d.getElementById("info").value;

    //Creando el sessionStorage codificando los datos del JSON
    sessionStorage.setItem('DatosPersonales', btoa(JSON.stringify(solicitanteJSON)));
}

//Obteniendo los valores para reasignarlos en el HTML desde el JSON
function recuperarJSON() {

    //Decodificando y asignando los valores al JSON desde el sessionStorage
    solicitanteJSON = JSON.parse(atob(sessionStorage.getItem('DatosPersonales')));

    //Asignando los valores del JSON al HTML convertido el nombre en MAYUSCULA
    d.getElementById('nombre').value = solicitanteJSON.nombre.toUpperCase();
    d.getElementById('email').value = solicitanteJSON.email;

    //Mostrando los datos del solicitante en sesón mediante los valores del JSON
    console.log("\n\nSOLICITANTE EN SESIÓN:");
    console.log("\n\Nombre: " + solicitanteJSON["nombre"] +
        "\nCorreo electrónico: " + solicitanteJSON["email"] +
        "\nTotal + IVA: " + solicitanteJSON["total"] + " CLP\n");
}

//Mostrando un console con el sessionStorage codificado
function mostrarSTORAGE() {
    console.log("\n\nMostrando eL sessionStorage codificado:\n\n" + sessionStorage.getItem('DatosPersonales'));
}


//FUNCIÓN QUE AGREGA AL HTML ELEMENTOS CON LOS DATOS DE LA COTIIZACIÓN
function agregar() {

    var elementoCotizacion; var elementoNombre; var elementoEmail;
    var elementoLogo; var elementoPapeleria; var elementoEmpaque;
    var elementoBranding; var elementoTotal; var elementoTotalIva;
    var espacioBr; var separadorHr;

    presupuesto = d.getElementById("presupuesto");
    nombre = d.getElementById("nombre");
    email = d.getElementById("email");

    // Elementos que serán creados en el HTML
    elementoCotizacion = d.createElement("h1")
    elementoNombre = d.createElement("p");
    elementoEmail = d.createElement("p");
    elementoLogo = d.createElement("p");
    elementoPapeleria = d.createElement("p");
    elementoEmpaque = d.createElement("p");
    elementoBranding = d.createElement("p");
    elementoTotal = d.createElement("h2");
    elementoTotalIva = d.createElement("h2");
    espacioBr = d.createElement("br");
    //separadorHra = d.createElement("hr");
    //separadorHrb = d.createElement("hr");

    elementoCotizacion.id = "tituloPresupuesto";
    elementoNombre.id = "nombrePresupuesto";
    elementoEmail.id = "emailPresupuesto";
    elementoLogo.id = "logoPresupuesto";
    elementoPapeleria.id = "papeleriaPresupuesto";
    elementoEmpaque.id = "empaquePresupuesto";
    elementoBranding.id = "brandingPresupuesto";
    elementoTotal.id = "totalPresupuesto";
    elementoTotalIva.id = "totalIvaPresupuesto";

    elementoCotizacion.innerText = "Presupuesto Final";
    elementoNombre.innerText = "Nombre: " + nombre.value;
    elementoEmail.innerText = "Correo electrónico: " + email.value;
    elementoLogo.innerText = "Logotipos: " + logo + " / " + resultadoLogos + " CLP";
    elementoPapeleria.innerText = "Papelería: " + papeleria.toLowerCase() + " / " + resultadoPapeleria + " CLP";
    elementoEmpaque.innerText = "Empaques: " + empaque.toLowerCase() + " / " + resultadoEmpaque + " CLP";
    elementoBranding.innerText = "Branding: " + branding.toLowerCase() + " / " + resultadoBranding + " CLP";
    elementoTotal.innerText = "TOTAL: " + total + " CLP";
    elementoTotalIva.innerText = "TOTAL + IVA (19%): " + totalIva + " CLP";

    // Construyo un div dentro del div presupuesto
    // Este div interno es para poder 
    // borrarlo cuando se hagan nuevas cotizaciones
    // y mostrar solo el resulado actual
    const divResultado = document.createElement('div');
    divResultado.id = "divResultado";

    // lleno el div con todos los elementos
    //divResultado.appendChild(separadorHra);
    divResultado.appendChild(elementoCotizacion);
    divResultado.appendChild(elementoNombre);
    divResultado.appendChild(elementoEmail);
    divResultado.appendChild(elementoLogo);
    divResultado.appendChild(elementoPapeleria);
    divResultado.appendChild(elementoEmpaque);
    divResultado.appendChild(elementoBranding);
    divResultado.appendChild(elementoTotal);
    divResultado.appendChild(elementoTotalIva);
    divResultado.appendChild(espacioBr);
    //divResultado.appendChild(separadorHrb);

    //le asigno al div de presupuesto el div interno de resultados
    presupuesto.appendChild(divResultado);
}

//ARREGLO RESUMEN DE CANTIDADES SOLICITADAS
function arregloResumenCantidades() {
    var partesCotizacion = [];
    partesCotizacion.push("Logotipos: " + logo);
    partesCotizacion.push("Combo Papeleria: " + papeleria);
    partesCotizacion.push("Combo Empaque: " + empaque);
    partesCotizacion.push("Combo Branding: " + branding);
    partesCotizacion = partesCotizacion.join(" / ");
    return partesCotizacion;
}


// VALIDAR NUMERO
function noEsNumero(numero, tipo) {
    //si no es numero ó si es menor que cero, indica al cliente solicitar de nuevo
    if (isNaN(numero) || numero < 0) {
        alert("Debes ingresar una Cantidad de " + tipo + " válido\nHaz una nueva solicitud");
    }
}


// FUNCION PARA CALCULAR EL COSTO DE LAS SOLICITUDES
// Es invocada por las 4 funciones de solicitudes de logotipo, papeleria, empaque y branding
// Se aplican descuentos para solitudes mayores a 1
function calculos(cantidad, tipo, precio) {
    let resultado;
    if (cantidad == 1 || cantidad == 0) {
        resultado = cantidad * precio;
        console.log("Cantidad de " + tipo + ": " + cantidad + " | Precio: " + resultado + " CLP");
    }
    if (cantidad > 1) {
        resultado = cantidad * (precio * descuento);
        console.log("Cantidad de " + tipo + ": " + cantidad + " | Precio: " + resultado + " CLP");
    }
    return resultado;
}

// EJECUTO UNA FUNCIÓN VALIDAR EMAIL YA QUE AL TENER EVENT EN EL ONCLICK DEL BOTÓN COTIZAR, 
// no hace la validación por TYPE de HTML
function validarEmail(valor) {
    if (/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(valor)) {
        // alert("La dirección de email " + valor + " es correcta.");
        return true;
    } else {
        alert("La dirección correo electrónico es incorrecta.");
        $('#email').focus();
        return false;
    }
}


///////////////////////////////////////////////////////////////
//           SINGLE PAGE APPLICATION AL PROYECTO             //
///////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', router)
window.addEventListener('hashchange', router)

//CON AJAX

const PaginaAjaxTestimonios = {
    render: function () {
        $.ajax({
            type: 'GET',
            url: 'js/testimonios.json',
            dataType: 'json',
            success: function (data, status, jqXHR) {
                console.log(jqXHR)
                let llenado = ''
                for (const persona of data) {

                    llenado += `
                    <div>
                        <h1 class="first"><br>${persona.first_name} ${persona.last_name}</h1>
                        <p class="testimonios">"${persona.testimonio}"</p>
                        <h2 class="first">${persona.email}</h2><br>
                    </div>`

                }

                $('#pages').html(`
                <div class="frame resaltadoTestimonios">
                ${llenado}
                </div>
                <div class="frame">
                <br><img src="image/thankyouline.png" alt="">
                </div>
                `)

                console.log(`AJAX Testimonios -> Status: ${status}`)

            },
            error: function (jqXHR) {
                console.log(jqXHR)
            }
        })

    }
}

const PaginaSolicitudes = {
    render: function () {
        return formularioHTML;
    }
}

const HomePage = {
    render: function () {
        return `
        <div id="inicio">
        </div>
        `;
    }
}

const ErrorComponent = {
    render: function () {
        return `
        <div id="error">
            <br>
            <h1 class="first">:(</h1>
            <p class="footer">--- Contenido no encontrado ---</p>
            <br>
            <br>
        </div>
        `;
    }
}

const routes = [
    { path: '/solicitudes', component: PaginaSolicitudes },
    { path: '/', component: HomePage },
    { path: '/testimonios', component: PaginaAjaxTestimonios }
]

// Return explicito sin poner function ni llaves
// y devuelve el resultado de la comparación OR
// Nos dice dónde estamos ubicados
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/'

const findComponent = function (path, routes) {
    return routes.find(routes => routes.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;
}

function router() {

    const path = parseLocation();
    console.log("SPA - este es el path: " + path)
    const { component = ErrorComponent } = findComponent(path, routes) || {}
    // si en component no encuentra nada le asigna ErrorComponent que lo tenemos arriba definido
    $('#pages').html(component.render())
    return path;

}


//FUNCIONES PARA LLENAR  LOS OPTION DE LOS SELECT DEL HTML DESDE DB.JS
//Cargar contenido en el select
function cargarContenido(array, select) {
    array.forEach(element => {
        const option = document.createElement('option');
        option.value = element.toUpperCase();
        option.textContent = element;
        select.appendChild(option);
    })
}

//Un arreglo de elementos key, los seleccion en db.js
function listaSelect(array, key) {
    let listado = [];
    array.forEach(elem => {
        //console.log(elem)
        if (!listado.includes(elem[key])) {
            //elem.tipo
            listado.push(elem[key])
        }
    })
    return listado.sort();
}


//////////////////////////////////////////////////////////////////////
// EVENTOS JQUERY 
//////////////////////////////////////////////////////////////////////


$(function () {

    //TENIENDO CARGADA LA PÁGINA

    //CAPTURANDO 3 input con la tecla ENTER AL ESTAR DENTRO DE "SOLICITUDES"
    $('html body').on({
        keypress: function (event) {
            if (event.keyCode === 13) {
                if ($('#nombre').val().length == "") {
                    console.log("JQUERY - Debe ingresar su nombre")
                    $('#nombre').focus();
                } else {
                    if ($('#email').val().length == "") {
                        console.log("JQUERY - Debe ingresar un correo electrónico")
                        $('#email').focus();
                    } else {
                        if ($('#logotipo').val().length == "") {
                            console.log("JQUERY - Debe ingresar la cantidad de logotipos")
                            $('#logotipo').focus();
                        }
                    }
                }
            }
        }
    });


    //CAMBIANDO EL COLOR Y FORMA DE CURSOR AL LEGEND SIGUIENTE

    $('div #pages').on("mouseenter", 'legend#info', function () {
        $(this).css("background-color", "blue") //cambio el color del legend al entrar
        console.log("JQUERY - Entrando al Legend SIGUIENTE")
    });

    $('div #pages').on("mouseleave", 'legend#info', function () {
        $(this).css("background-color", "black") //cambio el color del legend al salir
    });

    $('div #pages').on("mouseover", 'legend#info', function () {
        $(this).css("cursor", "pointer")// Coloco el cursor en forma de puntero
    });


    $('div #pages').on("focus", 'input#nombre', function () {
        $(this).css("background-color", 'beige')// Doy focus al input nombre
    });

    $('div #pages').on("blur", 'input#nombre', function () {
        $(this).css("background-color", '#E0F2F1')// Quito focus y agrego blur al input nombre
    });

    $('div #pages').on("focus", 'input#email', function () {
        $(this).css("background-color", 'beige')// Doy focus al input nombre
    });

    $('div #pages').on("blur", 'input#email', function () {
        $(this).css("background-color", '#E0F2F1')// Quito focus y agrego blur al input nombre
    });

    //EVENTOS LUEGO DE SIGUIENTE EN DIV COMPONENTES

    $('div #pages').on("focus", 'input#logotipo', function () {
        $(this).css("background-color", 'beige')// Doy focus al input logotipo
    });
    $('div #pages').on("blur", 'input#logotipo', function () {
        $(this).css("background-color", '#E0F2F1')// Quito focus y agrego blur al input logotipo
    });

    $('div #pages').on("focus", 'select#papeleria', function () {
        $(this).css("background-color", 'beige')// Doy focus al select papeleria
    });
    $('div #pages').on("blur", 'select#papeleria', function () {
        $(this).css("background-color", '#E0F2F1')// Quito focus y agrego blur al select papeleria
    });

    $('div #pages').on("focus", 'select#empaque', function () {
        $(this).css("background-color", 'beige')// Doy focus al select empaque
    });
    $('div #pages').on("blur", 'select#empaque', function () {
        $(this).css("background-color", '#E0F2F1')// Quito focus y agrego blur al select empaque
    });

    $('div #pages').on("focus", 'select#branding', function () {
        $(this).css("background-color", 'beige')// Doy focus al select branding
    });
    $('div #pages').on("blur", 'select#branding', function () {
        $(this).css("background-color", '#E0F2F1')// Quito focus y agrego blur al select branding
    });

    // AL PASAR SOBRE EL TÍTULO DE LOGOTIPO CAMBIA FORMA DEL CURSOS Y COLOR DE SU INPUT ASOCIADO

    // Pasando por label Logotipo
    $('div #pages').on("mouseenter", 'label#tituloLogotipo', function () {
        $('input#logotipo').css("background-color", "beige") //cambio el color del input relacionado a logotipo
    });
    $('div #pages').on("mouseleave", 'label#tituloLogotipo', function () {
        $('input#logotipo').css("background-color", '#E0F2F1') //cambio el color
    });
    $('div #pages').on("mouseover", 'label#tituloLogotipo', function () {
        $(this).css("cursor", "pointer")// Coloco el cursor en forma de puntero al pasar por el label Logotipo
    });


    // Pasando por label Papeleria
    $('div #pages').on("mouseenter", 'label#tituloPapeleria', function () {
        $('select#papeleria').css("background-color", 'beige') //cambio el color del select relacionado a papeleria
    });
    $('div #pages').on("mouseleave", 'label#tituloPapeleria', function () {
        $('select#papeleria').css("background-color", '#E0F2F1') //cambio el color
    });
    $('div #pages').on("mouseover", 'label#tituloPapeleria', function () {
        $(this).css("cursor", "pointer")// Coloco el cursor en forma de puntero al pasar por el label papeleria
    });

    // Pasando por label Empaque
    $('div #pages').on("mouseenter", 'label#tituloEmpaque', function () {
        $('select#empaque').css("background-color", 'beige') //cambio el color del select relacionado a empaque
    });
    $('div #pages').on("mouseleave", 'label#tituloEmpaque', function () {
        $('select#empaque').css("background-color", '#E0F2F1') //cambio el color
    });
    $('div #pages').on("mouseover", 'label#tituloEmpaque', function () {
        $(this).css("cursor", "pointer")// Coloco el cursor en forma de puntero al pasar por el label empaque
    });

    // Pasando por label Branding
    $('div #pages').on("mouseenter", 'label#tituloBranding', function () {
        $('select#branding').css("background-color", 'beige') //cambio el color del select relacionado a branding
    });
    $('div #pages').on("mouseleave", 'label#tituloBranding', function () {
        $('select#branding').css("background-color", '#E0F2F1') //cambio el color
    });
    $('div #pages').on("mouseover", 'label#tituloBranding', function () {
        $(this).css("cursor", "pointer")// Coloco el cursor en forma de puntero al pasar por el label branding
    });


    //MUESTRO LAS OPCIONES A COTIZAR AL HACER CLIC EN SIGUIENTE
    $('div #pages').on('click', 'legend#info', function () {
        //$('#info').click(function () {


        console.log("JQUERY - Activo Ventana con Información de Precios")
        alert("LISTADO DE PRECIOS:\n\n" +
            "DISEÑO DE LOGOTIPO\n" +
            "-1 Logotipo | Precio: " + precioLogo + " CLP\n" +
            "Descuento del 10% para cantidades superiores a 1 logo\n\n" +
            "COMBOS DE PAPELERÍA:\n" +
            "-25 hojas, 25 sobres, 25 tarjetas, 25 carpetas | Precio: 30000 CLP\n" +
            "-50 hojas, 50 sobres, 50 tarjetas, 50 carpetas | Precio: 60000 CLP\n" +
            "-100 hojas, 100 sobres, 100 tarjetas, 100 carpetas | Precio: 120000 CLP\n\n" +
            "COMBOS DE EMPAQUES:\n" +
            "-25 cajas | Precio: 50000 CLP\n" +
            "-50 cajas | Precio: 100000 CLP\n" +
            "-100 cajas | Precio: 200000 CLP\n\n" +
            "COMBOS DE BRANDING:\n" +
            "-10 gorras, 10 boligrafos, 10 libretas | Precio: 60000 CLP\n" +
            "-20 gorras, 20 boligrafos, 20 libretas | Precio: 120000 CLP\n" +
            "-30 gorras, 30 boligrafos, 30 libretas | Precio: 180000 CLP\n\n");

        //Transición habia abajo al mostrar los componentes que se pueden solicitar
        $('#componentes').slideDown(2000, function () {
            console.log('JQUERY - Mostrando los componentes de la cotización');
            $('html, body').animate({
                scrollTop: $("#componentes").offset().top
            }, 1000)
            console.log("JQUERY - Bajando con scroll a los componenetes")


            //LLENANDO LOS OPTION DE LOS SELECT DEL HTML DESDE DB.JS AL MOSTRAR DIV COMPONENTES

            const selectPapeleria = document.getElementById('papeleria');
            console.log("selectPapeleria: " + selectPapeleria.id);
            const optionPapeleria = listaSelect(productosPapeleria, "seleccion");
            cargarContenido(optionPapeleria, selectPapeleria);

            const selectEmpaque = document.getElementById('empaque');
            console.log("selectEmpaque: " + selectEmpaque.id);
            const optionEmpaque = listaSelect(productosEmpaque, "seleccion");
            cargarContenido(optionEmpaque, selectEmpaque);


            const selectBranding = document.getElementById('branding');
            console.log("selectBranding: " + selectBranding.id);
            const optionBranding = listaSelect(productosBranding, "seleccion");
            cargarContenido(optionBranding, selectBranding);
        });

    });


    // PREVENGO RECARGA DE FORMULARIO
    $('div #pages').on('click', 'button#cotizar', function (e) {
        // $('#cotizar').click(function (e) {
        e.preventDefault();
    });


    // MUESTRO Y OCULTO DIVS HTML - EVENTOS ANIDADOS, SCROLL Y USO DE FUNCIONES
    $('div #pages').on('click', 'button#cotizar', function () {
        //$('#cotizar').click(function () {
        if (totalCotizacion()) {

            //Oculto el div de indicaciones que sale bajo SIGUIENTE y Luego bajo los SELECT
            $('#indicacion').fadeOut('slow');
            console.log('\nJQUERY - Oculto el div "Acá se mostrará el resultado"')
            console.log('Se agregan los elementos de la cotización')


            //Muestro div de presupuesto al cual se le agregan los elementos en agregar()
            //Además en el solicitudes.js éste div tiene previamente clase css hidden
            $('#presupuesto').show('slow', function () {
                console.log("JQUERY - Se muestra el div de Presupuesto")
            });


            //Muestro div de agradecimiento que estaba oculto
            $('#adicional').show('slow', function () {
                console.log("JQUERY - Se muestra el div de Agradecimiento")

                //Bajo al div del resultado de la cotización
                $('html, body').animate({
                    scrollTop: $("#presupuesto").offset().top + 100
                }, 1000)


                console.log("JQUERY - Bajo hasta el resultado de la cotización")
            });


            //  MENSAJE E IMAGEN DE AGRADECIMIENTO CON AJAX LEYENDO EL ADICIONAL.JSON

            //Remuevo lo creado en cotizaciones anteriores para el div adicional
            const divAdicional = $('#adicional');
            divAdicional.empty();

            //AGREGO ELEMENTOS AL DOM AJAX Y HACIENDO LECTURA EN ADICIONAL.JSON
            $.ajax({
                url: 'js/adicional.json',
                success: function (data, status, jqXHR) {
                    data.forEach(element => {
                        //divAdicional.append(`<br><h1 class="first">${element.mensaje}</h1>`)
                        //console.log("AJAX: " + element.mensaje)
                        divAdicional.append(`<br><img class="imgAjax" src="${element.imagen}" alt="">`)
                        console.log("AJAX - Thank you picture: " + element.imagen)
                        //divAdicional.append(`<br><h2 class="footer"><a class="notUnderlined" href="${element.url}" target="_blank">${element.emprendimiento}</a></h2>`)
                        //console.log("AJAX: " + element.emprendimiento)
                        //console.log("AJAX: " + element.url)
                    });
                    console.log(`AJAX Status: ${status}`)
                    //alert("Envío exitoso")

                },
                error: function (jqXHR, status, error) {
                    console.log("Error")
                    console.log(jqXHR)
                    console.log(`Error -> Status: ${status} - Error: ${error}`)
                }
            })

        }

    });

})



//EVENTOS CON JAVASCRIPT PURO DE CAMBIO DE COLOR EN LOS INPUT AL HACER CLIC DENTRO Y FUERA DE ELLOS

// if (inputNombre) {
//     inputNombre.addEventListener("focus", function () {
//         inputNombre.style.backgroundColor = 'beige';
//     })

//     inputNombre.addEventListener("blur", function () {
//         inputNombre.style.backgroundColor = '#e8eeef';
//     })
// }

// if (inputEmail) {
//     inputEmail.addEventListener("focus", function () {
//         inputEmail.style.backgroundColor = '#E0F2F1';
//     })

//     inputEmail.addEventListener("blur", function () {
//         inputEmail.style.backgroundColor = '#e8eeef';
//     })
// }

// if (inputLogo) {
//     inputLogo.addEventListener("focus", function () {
//         inputLogo.style.backgroundColor = 'beige';
//     })

//     inputLogo.addEventListener("blur", function () {
//         inputLogo.style.backgroundColor = '#e8eeef';
//     })
// }

// if (inputPapeleria) {
//     inputPapeleria.addEventListener("focus", function () {
//         inputPapeleria.style.backgroundColor = '#E0F2F1';
//     })

//     inputPapeleria.addEventListener("blur", function () {
//         inputPapeleria.style.backgroundColor = '#e8eeef';
//     })
// }

// if (inputEmpaque) {
//     inputEmpaque.addEventListener("focus", function () {
//         inputEmpaque.style.backgroundColor = 'beige';
//     })

//     inputEmpaque.addEventListener("blur", function () {
//         inputEmpaque.style.backgroundColor = '#e8eeef';
//     })
// }

// if (inputBranding) {
//     inputBranding.addEventListener("focus", function () {
//         inputBranding.style.backgroundColor = '#E0F2F1';
//     })

//     inputBranding.addEventListener("blur", function () {
//         inputBranding.style.backgroundColor = '#e8eeef';
//     })
// }


//AL PASAR SOBRE EL TÍTULO DE LOGOTIPO CAMBIA FORMA DEL CURSOS Y COLOR DE SU INPUT ASOCIADO
// if (labelLogo) {
//     labelLogo.addEventListener("mouseover", function (e) {

//         labelLogo.style.cursor = 'pointer'; //Cambia el curso a forma de mano
//         inputLogo.style.backgroundColor = 'beige';//Cambia color al input relacionado al label

//     })
// }

// //AL PASAR SOBRE EL TÍTULO DE PAPELERIA CAMBIA FORMA DEL CURSOS Y COLOR DE SU INPUT ASOCIADO
// if (labelPapeleria && inputPapeleria) {
//     labelPapeleria.addEventListener("mouseover", function (e) {

//         labelPapeleria.style.cursor = 'pointer'; //Cambia el curso a forma de mano
//         inputPapeleria.style.backgroundColor = '#E0F2F1';//Cambia color al input relacionado al label

//     })
// }

// //AL PASAR SOBRE EL TÍTULO DE EMPAQUE CAMBIA FORMA DEL CURSOS Y COLOR DE SU INPUT ASOCIADO
// if (labelEmpaque && inputEmpaque) {
//     labelEmpaque.addEventListener("mouseover", function (e) {

//         labelEmpaque.style.cursor = 'pointer'; //Cambia el curso a forma de mano
//         inputEmpaque.style.backgroundColor = 'beige';//Cambia color al input relacionado al label

//     })
// }

// //AL PASAR SOBRE EL TÍTULO DE BRANDING CAMBIA FORMA DEL CURSOS Y COLOR DE SU INPUT ASOCIADO
// if (labelBranding && inputBranding) {
//     labelBranding.addEventListener("mouseover", function (e) {

//         labelBranding.style.cursor = 'pointer'; //Cambia el curso a forma de mano
//         inputBranding.style.backgroundColor = '#E0F2F1';//Cambia color al input relacionado al label

//     })
// }