let IndexQuestion = 0;
let score = 0;

loadQuestion(IndexQuestion);

function loadQuestion(index) {
    objetQuestion = questions[index];

    opciones = [...objetQuestion.choices];
    opciones.push(objetQuestion.respuesta);
    for (let i = 0; i < 4; i++) {
        opciones.sort(() => Math.random() - 0.5);
    }

    document.getElementById("pregunta").innerHTML = objetQuestion.question;
    if (objetQuestion.imagen) {
        document.getElementById("imagen").src = objetQuestion.imagen;
        document.getElementById("imagen").style.display = "";
    } else {
        document.getElementById("imagen").style.display = "none";
    }

    if (objetQuestion.ayuda) {
        document.getElementById("ayuda").style.display = "";
    } else {
        document.getElementById("ayuda").style.display = "none";
    }

    document.getElementById("opcion-1").innerHTML = opciones[0];
    document.getElementById("opcion-2").innerHTML = opciones[1];
    document.getElementById("opcion-3").innerHTML = opciones[2];
    document.getElementById("opcion-4").innerHTML = opciones[3];
}

async function seleccionarOpción(index) {
    let validezRespuesta = opciones[index] == objetQuestion.respuesta;
    if (validezRespuesta) {
        await Swal.fire({
            title: "Respuesta correcta",
            text: "La respuesta ha sido correcta",
            icon: "success",
        });
        score++;
    } else {
        await Swal.fire({
            title: "Respuesta Incorrecta",
            html: `La respuesta correcta es ${objetQuestion.respuesta}`,
            icon: "error",
        });
    }
    IndexQuestion++;
    if (IndexQuestion >= questions.length) {
        await Swal.fire({
            title: "Juego términado",
            text: `Tu puntaje es de: ${score} de ${questions.length}`,
        });
        IndexQuestion = 0;
        score = 0;
    }
    loadQuestion(IndexQuestion);
}

function ayuda() {
    Swal.fire({
        title: "Ayuda",
        text: objetQuestion.ayuda,
        imageUrl: objetQuestion.ayudaImg,
        imageHeight: 400,
        width: '50%',
        padding: '1rem',
        background: '#ae8d4f',
        backdrop: true,
        timer: 3000,
        timerProgressBar: true,
    });
}