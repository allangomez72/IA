// Función del agente reflexivo
function agente_reflexivo(ubicacion, estado) {
    if (estado == "SUCIO") return "LIMPIAR";
    else if (ubicacion == "A") return "DERECHA";
    else if (ubicacion == "B") return "IZQUIERDA";
}

// Función principal de simulación
function simular(estados) {
    var ubicacion = estados[0];
    var estado_actual = ubicacion == "A" ? estados[1] : estados[2];
    var accion = agente_reflexivo(ubicacion, estado_actual);

    document.getElementById("log").innerHTML += 
        `<br>Ubicacion: ${ubicacion} | Accion: ${accion}  | Estado 1 ${estados[1]} y Estado 2 ${estados[2]} `; // Es lo que se muestraaaaaa

    // Ejecutar la accion
    if (accion == "LIMPIAR") {
        if (ubicacion == "A") {
            estados[1] = "LIMPIO";
            // 50% de probabilidad de ensuciar B después de limpiar A
            if (Math.random() < 0.5) estados[2] = "SUCIO"; 
        } else {
            estados[2] = "LIMPIO";
            // 50% de probabilidad de ensuciar A después de limpiar B, ojo se puede bajar para ambos o subir, para que quede bien que ahora es funcional pero aun faltan estados en la misma pasada
            if (Math.random() < 0.5) estados[1] = "SUCIO"; 
        }
    } 
    else if (accion == "DERECHA") estados[0] = "B";
    else if (accion == "IZQUIERDA") estados[0] = "A";

    // Ver si logra llegar al estado 8, que si se va a parar 
    if (estados[1] == "LIMPIO" && estados[2] == "LIMPIO") {
        document.getElementById("log").innerHTML += 
            "<br><strong>AMBOS AMBIENTES ESTAN LIMPIOS SIMULACION FINALIZADA</strong>";
        return;
    }

    // Continuar la simulación cada 2 segundos
    setTimeout(() => simular(estados), 2000); 
}

// Estados iniciales: [ubicacion, estado_A, estado_B]
var estados = ["A", "SUCIO", "SUCIO"];
simular(estados);