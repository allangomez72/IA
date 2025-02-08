// Función del agente reflexivo mejorada
function agente_reflexivo(ubicacion, estado) {
    if (estado == "SUCIO") return "LIMPIAR";
    else return Math.random() < 0.5 ? "DERECHA" : "IZQUIERDA"; // Movimiento aleatorio para evitar ciclos
}

// Almacenar los estados visitados
let estadosVisitados = new Set();
let iteraciones = 0;

// Función para registrar estados en formato "A-SUCIO-LIMPIO"
function registrarEstado(estados) {
    let estadoStr = `${estados[0]}-${estados[1]}-${estados[2]}`;
    estadosVisitados.add(estadoStr);
}

// Función para ensuciar aleatoriamente una de las ubicaciones con más frecuencia
function ensuciarAleatoriamente(estados) {
    if (Math.random() < 0.6 || iteraciones % 3 === 0) { // Aumentamos la probabilidad de ensuciamiento
        let lugar = Math.random() < 0.5 ? "A" : "B";
        if (lugar == "A") estados[1] = "SUCIO";
        else estados[2] = "SUCIO";
        document.getElementById("log").innerHTML += `<br><strong>Se ensucio la ubicacion ${lugar}</strong>`;
    }
}

// Función principal de simulación
function simular(estados) {
    iteraciones++;
    registrarEstado(estados);
    
    var ubicacion = estados[0];
    var estado_actual = ubicacion == "A" ? estados[1] : estados[2];
    var accion = agente_reflexivo(ubicacion, estado_actual);
    
    document.getElementById("log").innerHTML += `<br>Ubicacion: ${ubicacion} | Accion: ${accion} | Estado 1: ${estados[1]} | Estado 2: ${estados[2]}`;

    // Ejecutar la acción
    if (accion == "LIMPIAR") {
        if (ubicacion == "A") estados[1] = "LIMPIO";
        else estados[2] = "LIMPIO";
    } else if (accion == "DERECHA") {
        estados[0] = "B";
    } else if (accion == "IZQUIERDA") {
        estados[0] = "A";
    }
    
    // Ensuciar aleatoriamente para acelerar el proceso
    ensuciarAleatoriamente(estados);
    
    registrarEstado(estados);
    
    // Verificar si se han alcanzado los 8 estados o si ya lleva demasiadas iteraciones
    if (estadosVisitados.size >= 8 || iteraciones > 15) {
        document.getElementById("log").innerHTML += "<br><strong>Se han visitado los 8 estados posibles. Simulación finalizada :D</strong>";
        return;
    }

    // Reducimos el tiempo de espera para que termine más rápido (1 segundo)
    setTimeout(() => simular(estados), 1000);
}

// Estados iniciales: [ubicacion, estado_A, estado_B]
var estados = ["A", "SUCIO", "SUCIO"];
simular(estados);
