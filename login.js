dataLogin = JSON.parse(localStorage.getItem("loginUsers"));

if (!dataLogin) {
    loadDataLogin();
}

function saveDataLogin() {
    localStorage.setItem("loginUsers", JSON.stringify(dataLogin));
}

function loadDataLogin() {
    dataLogin = {
        fabian: {

            contraseña: "12345",
            scoreUser: 0,
        },
        enzo: {

            contraseña: "abcd",
            scoreUser: 0,
        },

    };
}

async function mainMenu() {
    choice_mainMenu = -1;
    await swal.fire({
        title: "BIENVENIDO Puedes registrar  jugadores o comenzar a jugar",
        color: "#60438d",
        showConfirmButton: false,
        html: `
        <button class="swal2-confirm swal2-styled" onclick='choice_mainMenu=0;Swal.close()'>
            Registrar nuevo Jugador
        </button>
        <br>
        <button class="swal2-confirm swal2-styled" onclick='choice_mainMenu=1;Swal.close()'>
            Ingresar
        </button>
        <button class="swal2-confirm swal2-styled" onclick='choice_mainMenu=2;Swal.close()'>
        Top 10 jugadores del mes
    </button>
        `,
        footer: '<span class="warning">A divertirnos!!</span>',
        width: '90%',
        padding: '1rem',
        background: '#ae8d4f',
        backdrop: true,
        imageUrl: 'https://static9.depositphotos.com/1007989/1157/i/450/depositphotos_11570416-stock-photo-playtime.jpg'
    });
    switch (choice_mainMenu) {
        case 0:
            registrarNuevoJugador();
            break;
        case 1:
            login();
            break;
        case 2:
            topJugadores();
            break;
        default:
            await mainMenu();
            break;
    }

    function topJugadores() {
        window.location = 'top.html';
    }
    document.getElementById("topJugadores").onclick = function() {
        window.location.href = 'top.html'
    }
}

async function mostrarUsuariosPorTabla(...propiedades) {
    if (!userLoginOk) {
        return
    }
    let html = `
  <table class="table table-light table-striped">
    <theader>
    <th>
      Usuario
    </th>
  `;
    if (propiedades[0] == "*") {
        for (const usuario in dataLogin) {
            for (const propiedad in dataLogin[usuario]) {
                html += "<th>";
                html += propiedad;
                html += "</th>";
            }
            break;
        }
    } else {
        for (const propiedad of propiedades) {
            html += "<th>";
            html += propiedad;
            html += "</th>";
        }
    }
    html += "</theader><tbody>";
    for (const usuario in dataLogin) {
        html += "<tr>";
        html += "<td>";
        html += usuario;
        html += "</td>";
        if (propiedades[0] == "*") {
            for (const propiedad in dataLogin[usuario]) {
                html += "<td>";
                html += dataLogin[usuario][propiedad];
                html += "</td>";
            }
        } else {
            for (const propiedad of propiedades) {
                html += "<td>";
                html += dataLogin[usuario][propiedad];
                html += "</td>";
            }
        }

        html += "</tr>";
    }
    await swal.fire({
        text: "Usuarios",
        confirmButtonText: "Cerrar",
        html,
    });
}

async function registrarNuevoJugador() {
    choice_registrarNuevoJugador = -1;
    await swal.fire({
        title: "Registrar",
        showConfirmButton: false,
        html: `
        <input class="swal2-input" placeholder="Usuario" id="usuario">
        <input type="password" class="swal2-input" placeholder="Contraseña" id="contraseña">
        <button class="swal2-confirm swal2-styled" onclick='choice_registrarNuevoJugado=0;Swal.clickConfirm()'>
            Crear
        </button>
        <button class="swal2-confirm swal2-styled" onclick='choice_registrarNuevoJugado=1;Swal.close()'>
            Cancelar
        </button>
        `,
        preConfirm: () => {
            let usuario = document.getElementById("usuario").value;
            let contraseña = document.getElementById("contraseña").value;
            if (!usuario) {
                Swal.showValidationMessage("Error usuario");
                return false;
            }
            if (!contraseña) {
                Swal.showValidationMessage("Error contraseña");
                return false;
            }
            dataLogin[usuario] = {};
            dataLogin[usuario].contraseña = contraseña;
            dataLogin[usuario].scoreUser = 0;
            saveDataLogin();
            return true;
        },
    });
    switch (choice_registrarNuevoJugador) {
        case 0:
            mainMenu();
            break;
        case 1:
            mainMenu();
            break;
        default:
            mainMenu();
            break;
    }
}


async function login() {
    await swal.fire({
        title: "Bienvenido",
        confirmButtonText: "Entrar",
        html: `
        <div style="margin:5px">
            <input class="swal2-input" placeholder="usuario" id="usuario">
            <input type="password" class="swal2-input" placeholder="contraseña" id="contraseña">
            <button class="swal2-confirm swal2-styled" onclick='mainMenu()=1;Swal.close()'>
            Cancelar
        </button>
        </div>
        `,
        preConfirm: () => {
            let usuario = document.getElementById("usuario").value;
            let contraseña = document.getElementById("contraseña").value;
            if (!usuario) {
                Swal.showValidationMessage("No hay usuario");
                return false;
            }
            if (!contraseña) {
                Swal.showValidationMessage("No hay contraseña");
                return false;
            }
            let datos = dataLogin[usuario];
            if (!datos) {
                Swal.showValidationMessage("El usuario no existe");
                return false;
            }
            if (datos.contraseña != contraseña) {
                Swal.showValidationMessage("Contraseña incorrecta");
                return false;
            }
            userLoginOk = datos = window.location = 'game.html';
            return true;
        },

    });


}