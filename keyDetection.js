const tipoEje = {
    X: 0,
    Y: 1
};

const tipo = {
    aumentar: 0,
    disminuir: 1
};

const posicion = {
    ejeX: 0,
    ejeY: 0
}

const valorAumento = 100;

window.addEventListener('keyup', eventoKeyUp);

function eventoKeyUp(event) {
    const keyCode = event.keyCode;
    const key = event.key.toLowerCase();

    cambiarTeclaPresionada(true, key, keyCode);

    if (keyCode === 39 || key === 'd')
        mover(tipoEje.X, tipo.aumentar);

    if (keyCode === 37 || key === 'a')
        mover(tipoEje.X, tipo.disminuir);

    if (keyCode === 40 || key === 's')
        mover(tipoEje.Y, tipo.aumentar);

    if (keyCode === 38 || key === 'w')
        mover(tipoEje.Y, tipo.disminuir);

    cambiarTeclaPresionada(false);
}

function mover(eje, tipoMovimiento) {
    let valor = 0;
    let maximo = 0;

    cambioClaseBoton(eje, tipoMovimiento, true);

    switch (eje) {
        case tipoEje.X:
            valor = posicion.ejeX;
            maximo = window.innerWidth;
            break;
        case tipoEje.Y:
            valor = posicion.ejeY;
            maximo = window.innerHeight;
            break;
    }

    if (tipoMovimiento === tipo.aumentar)
        aumentar(eje, valor, maximo);
    else if (tipoMovimiento === tipo.disminuir)
        disminuir(eje, valor);

    setTimeout(() => cambioClaseBoton(eje, tipoMovimiento, false), 100);
}

function aumentar(eje, valor, maximo) {
    maximo = maximo - 200;
    valor += valorAumento;

    cambiarPosicion = valor < maximo;

    if (cambiarPosicion)
        asignarPosicion(valor, eje);
}

function disminuir(eje, valor) {
    let cambiarPosicion = false;
    valor -= valorAumento;
    if (valor >= 0) {
        if (valor === 0) {
            valor = 10;
        }
        cambiarPosicion = true;
    }

    if (cambiarPosicion)
        asignarPosicion(valor, eje);
}

function asignarPosicion(valor, eje) {
    const control = document.getElementById('circulo');
    switch (eje) {
        case tipoEje.X:
            posicion.ejeX = valor;
            control.style.left = `${valor}px`;
            break;
        case tipoEje.Y:
            posicion.ejeY = valor;
            control.style.top = `${valor}px`;
            break;
    }
}

function cambioClaseBoton(eje, tipoMovimiento, mostrar) {
    let nombreControl = '';

    if (eje === tipoEje.X) {
        switch (tipoMovimiento) {
            case tipo.aumentar:
                nombreControl = 'derecha';
                break;
            case tipo.disminuir:
                nombreControl = 'izquierda';
                break;
        }
    } else if (eje === tipoEje.Y) {
        switch (tipoMovimiento) {
            case tipo.aumentar:
                nombreControl = 'abajo';
                break;
            case tipo.disminuir:
                nombreControl = 'arriba';
                break;
        }
    }

    const boton = document.getElementById(nombreControl);

    if (mostrar)
        boton.classList.add('seleccionado');
    else
        boton.classList.remove('seleccionado');
}

function cambiarTeclaPresionada(mostrar, key, keyCode) {
    const teclaPresionada = document.getElementById('teclaPresionada');
    const texto = document.getElementById('textoTecla');

    if (mostrar) {
        let valor = '';
        if (!!key && key.length < 2)
            valor = key.toUpperCase();
        else
            valor = keyCode;

        texto.innerHTML = valor;

        teclaPresionada.classList.add('mostrar');
    } else
        setTimeout(() => teclaPresionada.classList.remove('mostrar'), 300);
}