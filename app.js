/*******   VARIABLES       **********/
// Datos de pruebas
var personas = [
        {nombre: "Juan", apellido: "Perez"}
    ];

// Para capturar el indice del array para luego editarlo
var indice = '';

//Capturar el cuerpo de la tabla
const tableBody = document.querySelector('#tableBody');

//Capturar los botones
const botonEditar = document.querySelector('#editar');
const botonGuardar = document.querySelector('#guardar');
const botonCancelar = document.querySelector('#cancelar');


// Para leer los datos de forma inversa desde el ultimo elemento
// Entonces cuando se agregue un nuevo se lo vea en la primer fila como si fuera el ultimo elemento insertado
personas.reverse();

/*********   FUNCIONES       *************/
// Arrow function (Funcion flecha)
// Para pintar botones dentro de la tabla
const pintarBotonEditar = (index) => `<button class="btn btn-success" onClick="capturarPersona(${index})">Editar</button>`;
const pintarBotonEliminar = (index) => `<button class="btn btn-danger" onClick="eliminar(${index})">Eliminar</button>`;

// Recibe como parametro un objeto persona y lo pinta en el cuerpo de la tabla
let pintarEnTabla = (persona, index) => {
    let totalPersonas = personas.length;
    return`<tr>
                <td>${totalPersonas - index}</td> 
                <td>${persona.nombre}</td> 
                <td>${persona.apellido}</td>
                <td>${pintarBotonEditar(index)} ${pintarBotonEliminar(index)}</td> 
          </tr>`
};


//Recibe como parametro la etiqueta button capturadas anteriormente
let ocultarBoton = (boton) => boton.style.display = 'none';
let mostrarBoton = (boton) => boton.style.display = '';

//Para vaciar el formulario
const formReset = () => document.querySelector('form').reset();

//Esta funcion es para cuando se ingrese a la pagina y al momento de guardar, editar borrar una persona
//se lo pueda reutilizar para pintar los nuevos datos en la tabla
let cargarDatos = () => {
    //Vacio la tabla para que no se concatene todos los datos
    tableBody.innerHTML = '';

    personas.forEach( (persona, index) => {
        tableBody.innerHTML += pintarEnTabla(persona, index);
    });
};

let guardar = () => {
    //Obtener lo datos ingresados en los inputs
    let nombre = document.querySelector('#nombre').value;
    let apellido = document.querySelector('#apellido').value;

    //Insertar los nuevos valores al inicio del array que se encuentra inverso
    personas.unshift({nombre: nombre, apellido: apellido});

    // Volver a cargar los datos
    cargarDatos();

    formReset(); 
}

let editar = () =>{
    personas[indice].nombre = document.querySelector('#nombre').value;
    personas[indice].apellido = document.querySelector('#apellido').value;
    formReset();
    cargarDatos();
    modificarTituloFormulario('Agregar nueva persona');

    //Ocultar los botones editar y cancelar
    ocultarBoton(botonEditar); 
    ocultarBoton(botonCancelar);

    //Mostrar boton de guardar
    mostrarBoton(botonGuardar);
}

const modificarTituloFormulario = (texto) => document.querySelector('h3').innerText = texto;

//Capturar datos de la persona para editar
const capturarPersona = (index) =>{    
    indice = index;
    let persona = personas[index];
    botonEditar.removeAttribute('disabled');

    modificarTituloFormulario('Editar Persona');
   
    //Ocultar Boton de guardar
    ocultarBoton(botonGuardar)

    //Mostrar boton de editar y cancelar
    mostrarBoton(botonEditar);
    mostrarBoton(botonCancelar);

    document.querySelector('#nombre').value = persona.nombre;
    document.querySelector('#apellido').value = persona.apellido;
}

//Para eliminar la persona
const eliminar = (index) => {
    personas.splice(index, 1);
    cargarDatos();
}

const inputsIncompletos = () =>{
    let nombre = document.querySelector('#nombre').value;
    let apellido = document.querySelector('#apellido').value;

    return nombre === '' || apellido === '' ; // Si algunos de los dos campos esta vacio devolvera true
}

// Validar que los datos ingresados en los inputs sean solo texto
const esDatoAlfabetico = (texto) => {
    // Expresion regular
    let regex =  /^[A-Za-z ]+$/;
    return texto.match(regex) ;
}

const validarCamposDeTexto = () => {
    let textoCampoNombre = document.querySelector('#nombre').value;
    let textoCampoApellido = document.querySelector('#apellido').value;

    let mensajeDeErrorNombre = document.querySelector('#errorNombre');
    let mensajeDeErrorApellido = document.querySelector('#errorApellido')

    // Si los campos de texto tienen algun numero se mostrara el mensaje de error
    esDatoAlfabetico(textoCampoNombre) || textoCampoNombre === '' 
                                     ? ocultarMensajeDeError(mensajeDeErrorNombre) 
                                     : mostrarMensajeDeError(mensajeDeErrorNombre);

    esDatoAlfabetico(textoCampoApellido) || textoCampoApellido === '' 
                                        ?  ocultarMensajeDeError(mensajeDeErrorApellido) 
                                        : mostrarMensajeDeError(mensajeDeErrorApellido);

    //Si uno de los dos campos tiene algun numero, el boton de guardar o editar no estara disponible
    esDatoAlfabetico(textoCampoNombre)  && esDatoAlfabetico(textoCampoApellido) 
                                                ? botonGuardarYEditarDisponible()
                                                : botonGuardarYEditarNoDisponible()
    
}

const mostrarMensajeDeError = (mensajeDeError) => mensajeDeError.style.display = '';
   

const ocultarMensajeDeError = (mensajeDeError) => mensajeDeError.style.display = 'none';
 

const botonGuardarYEditarNoDisponible = () => {
    botonGuardar.setAttribute('disabled', '');
    botonEditar.setAttribute('disabled', '');
}

const botonGuardarYEditarDisponible = () => {
    botonGuardar.removeAttribute('disabled');
    botonEditar.removeAttribute('disabled');
}

cargarDatos();

console.log('Ejecutar personas.reverse() en la consola para ver el orden original de los datos');

//Agrego un evento al momento de hacer click en el boton de guardar
document.querySelector('#guardar').addEventListener('click', (e) => {
    //Esto evita recargar la pagina
    e.preventDefault();
    let mensajeDeError = document.querySelector('#camposIncompletos'); 
    
    if(!inputsIncompletos()){
        guardar(); 
        ocultarMensajeDeError(mensajeDeError);
    }else{ 
        mostrarMensajeDeError(mensajeDeError);
    }
});

document.querySelector('#editar').addEventListener('click', (e) => {
    e.preventDefault();
    let mensajeDeError = document.querySelector('#camposIncompletos'); 
    if(!inputsIncompletos()){ // Si los campos estan completos
        editar(); 
        ocultarMensajeDeError(mensajeDeError);
    }else{ 
        mostrarMensajeDeError(mensajeDeError);
    }
});

document.querySelector('#cancelar').addEventListener('click', (e) => {
    e.preventDefault();
    formReset();
    modificarTituloFormulario('Agregar nueva persona');
    
    //Ocultar los botones editar y cancelar
    ocultarBoton(botonEditar); 
    ocultarBoton(botonCancelar);

    //Mostrar boton de guardar
    mostrarBoton(botonGuardar);
});

document.querySelector('#nombre').addEventListener('input', () =>{
    validarCamposDeTexto()
});

document.querySelector('#apellido').addEventListener('input', () =>{
    validarCamposDeTexto();
});
