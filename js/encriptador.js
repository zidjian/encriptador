const btn_encriptar = document.getElementById('btn_encriptar');
const btn_desencriptar = document.getElementById('btn_desencriptar');
const btn_copiar = document.getElementById('btn_copiar');
const mensaje = document.getElementById('mensaje');
const alerta = document.getElementById('alerta');
const a_mensaje = document.querySelectorAll('.alerta > p');
const botones = document.querySelectorAll('.botones > button');
const resultado = document.querySelectorAll('.r_cuerpo');
const valores = [
    [ 'a', 'e', 'i', 'o', 'u' ], 
    [ 'ai', 'enter', 'imes', 'ober', 'ufat' ]
];

function textoCorrecto( mensaje ) {
    let aceptados = ' abcdefghijklmnñopqrstuvwxyz,./;[]\=-<>?:{}|+_)(*&^%$#@!~';
    aceptados.split( '' );
    const mensaje_partido = mensaje.split( '' );
    let respuesta = true;
    mensaje_partido.map( ( elemento, indice ) => {
        if( !aceptados.includes( elemento ) ) {
            respuesta = false;
        } 
    } );
    return respuesta;
}

function verificarMensaje() {
    if( mensaje.value === '' ) {
        alerta.style.display = 'flex';
        mensaje.style.border = 'solid 1px red';
        a_mensaje[0].innerHTML = 'No se ha encontrado ningún texto.';
        botones[0].setAttribute( 'class', 'btn btn_desactivado mr-1' );
        botones[1].setAttribute( 'class', 'btn btn_desactivado' );
        return false;
    }
    if( !textoCorrecto( mensaje.value ) ) {
        alerta.style.display = 'flex';
        mensaje.style.border = 'solid 1px red';
        a_mensaje[0].innerHTML = 'Solo letras en minusculas.';
        botones[0].setAttribute( 'class', 'btn btn_desactivado mr-1' );
        botones[1].setAttribute( 'class', 'btn btn_desactivado' );
        return false;
    }
    alerta.style.display = 'none';
    mensaje.style.border = 'none';
    botones[0].setAttribute( 'class', 'btn btn_principal mr-1' );
    botones[1].setAttribute( 'class', 'btn btn_secundario' );
    a_mensaje[0].innerHTML = '';
    return true;
}

function encriptacion() {
    let separado = mensaje.value;
    if( verificarMensaje() ) {
        separado = separado.split('');
        separado.map( ( elemento, indice ) => {
            for( let i = 0; i <= 4; i++ ) {
                if( elemento === valores[ 0 ][ i ] ) {
                    separado[ indice ] = elemento.replace( valores[ 0 ][ i ], valores[ 1 ][ i ] );
                    return;
                }
            }
        } );
    }
    resultado[0].classList.add( 'sin_comentario' );
    btn_copiar.classList.remove( 'd_none' );
    resultado[0].innerHTML = `<p class='a_copiar'>${ separado.join('') }</p>`;
}

function desencriptacion() {
    let texto_desencriptar = mensaje.value;
    let indice = 0;
    if( verificarMensaje() ) {
        for( let i = 0; i <= 4; i++ ) {
            texto_desencriptar = texto_desencriptar.replaceAll( valores[ 1 ][ i ], valores[ 0 ][ i ] );
        }
    }
    resultado[0].innerHTML = `<p class='a_copiar'>${ texto_desencriptar }</p>`;
}

function copiar() {
    const a_copiar = document.querySelector('.a_copiar');
    navigator.clipboard.writeText( a_copiar.innerHTML );
}

btn_copiar.addEventListener( 'click', copiar );

btn_encriptar.addEventListener( 'click', encriptacion );

btn_desencriptar.addEventListener( 'click', desencriptacion );

mensaje.addEventListener( 'keyup', verificarMensaje );