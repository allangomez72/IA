// Función del agente reflexivo
function agente_reflexivo(ubicacion, estado) {
    if (estado == "SUCIO") return "LIMPIAR";
    else if (ubicacion == "A") return "DERECHA";
    else if (ubicacion == "B") return "IZQUIERDA";
}

// Almacenar los estados visitados
let estadosVisitados = new Set();

// Función para registrar estados en formato "A-SUCIO-LIMPIO"
function registrarEstado(estados) {
    let estadoStr = `${estados[0]}-${estados[1]}-${estados[2]}`;
    estadosVisitados.add(estadoStr);
}

// Función para ensuciar aleatoriamente una de las ubicaciones
function ensuciarAleatoriamente(estados) {
    if (Math.random() < 0.4) { // 40% de probabilidad de ensuciar un lugar
        let lugar = Math.random() < 0.5 ? "A" : "B";
        if (lugar == "A") estados[1] = "SUCIO";
        else estados[2] = "SUCIO";
        document.getElementById("log").innerHTML += `<br><strong>Se ensucio la ubicacion ${lugar}</strong>`;
    }
}

// Función principal de simulación
function simular(estados) {
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
    
    // Ensuciar aleatoriamente
    ensuciarAleatoriamente(estados);
    
    registrarEstado(estados);
    
    // Verificar si se han alcanzado los 8 estados
    if (estadosVisitados.size >= 8) {
        document.getElementById("log").innerHTML += "<br><strong>Se han visitado los 8 estados posibles. Simulacion finalizada.</strong>";
        return;
    }

    // Continuar la simulación cada 2 segundos
    setTimeout(() => simular(estados), 2000);
}

// Estados iniciales: [ubicacion, estado_A, estado_B]
var estados = ["A", "SUCIO", "SUCIO"];
simular(estados);
