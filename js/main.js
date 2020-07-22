( function() {
    "use strict";

    let regalo = document.getElementById('regalo');

    // campos datos usuarios
    let nombre = document.getElementById('nombre');
    let apellido = document.getElementById('apellido');
    let email = document.getElementById('email');


    // campos pases
    let pase_dia = document.getElementById('pase_dia');
    let pase_dosdias = document.getElementById('pase_dosdias');
    let pase_completo = document.getElementById('pase_completo');

    // botones y div
    let calcular = document.getElementById('calcular');
    let errorDiv = document.getElementById('error');
    let botonRegistro = document.getElementById('btnRegistro');
    let resumen = document.getElementById('lista-productos');

    //regalos
    let camisetas = document.getElementById('camisa_evento');
    let etiquetas = document.getElementById('etiquetas');
    let sumaTotal = document.getElementById('suma-total');

    document.addEventListener('DOMContentLoaded', function () {

        var map = L.map('mapa').setView([-34.669147, -58.674138], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([-34.669147, -58.674138]).addTo(map)
            .bindPopup('GDLWebCamp 2020<br> Boletos ya disponibles.')
            .openPopup()
            .bindTooltip('un tooltip')
            .openTooltip;


        calcular.addEventListener('click', calcularMontos );
        pase_dia.addEventListener('blur', mostrarDias);
        pase_dosdias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        nombre.addEventListener('blur', validarCampos);
        apellido.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarCampos);
        email.addEventListener('blur', validarMail);

    }); //domcontenteloaded


    function calcularMontos (event) {
        event.preventDefault();

        if (regalo.value === '') {
            alert('debes elegir un regalo');
            regalo.focus();
        } else {
            let boletosDia =     parseInt( pase_dia.value , 10) || 0;
            let boletosDosDias = parseInt( pase_dosdias.value , 10) || 0;
            let boletoCompleto = parseInt( pase_completo.value , 10) || 0;
            let cantCamisas =    parseInt( camisetas.value , 10) || 0;
            let cantEtiquetas =  parseInt( etiquetas.value , 10) || 0;

            let totalPagar = (boletosDia*30) + (boletosDosDias*45) + (boletoCompleto*50) + (cantCamisas*10*.93) + ( cantEtiquetas*2);

            let listadoProductos = new Array ();

            if (  boletosDia >= 1 ) {
                listadoProductos.push ( boletosDia + ' Pases por día');
            }

            if (boletosDosDias >= 1) {
                listadoProductos.push ( boletosDosDias + ' Pases por 2 días');
            }

            if (boletoCompleto >= 1) {
                listadoProductos.push ( boletoCompleto + ' Pases completos');
            } 
            if (cantCamisas >= 1) {
                listadoProductos.push ( cantCamisas + ' Camisas');
            } 
            if (cantEtiquetas >= 1) {
                listadoProductos.push ( cantEtiquetas + ' Etiquetas');
            } 

            resumen.style.display = 'block';
            resumen.innerHTML = '';
            listadoProductos.forEach ( element => {
                resumen.innerHTML += element + "<br/>";
            });

            sumaTotal.innerHTML = `$ ${totalPagar.toFixed(2)}`;
        }
    }

    function mostrarDias (event) {
        event.preventDefault();

        let boletosDia =     parseInt( pase_dia.value , 10) || 0;
        let boletosDosDias = parseInt( pase_dosdias.value , 10) || 0;
        let boletoCompleto = parseInt( pase_completo.value , 10) || 0;

        let diasElegidos = new Array();

        if (boletosDia > 0) {
            diasElegidos.push ('viernes');
        }
        if (boletosDosDias > 0) {
            diasElegidos.push ('viernes', 'sabado');
        }
        if (boletoCompleto > 0) {
            diasElegidos.push ('viernes', 'sabado', 'domingo');
        }

        diasElegidos.forEach ( element => {
            document.getElementById(element).style.display = 'block';
        });
    }

    function validarCampos () {
        if (this.value == '') {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = 'este es un campo obligatorio';
            this.style.border = '1px solid red'
            errorDiv.style.border = '1px solid red';
        } else {
            errorDiv.style.display = 'none';
            this.style.border = '1px solid #cccccc';
        }
    }

    function validarMail () {
        if (this.value.indexOf('@') > -1) {
            errorDiv.style.display = 'none';
            this.style.border = '1px solid #cccccc';
        } else {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = 'debe ser formato email';
            this.style.border = '1px solid red'
            errorDiv.style.border = '1px solid red';
        }
    }

// vamos a probar un cambio

}) ();