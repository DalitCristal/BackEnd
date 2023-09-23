const $messages = document.getElementById("messages"),
  $textToSend = document.getElementById("text-to-send"),
  $sendMessage = document.getElementById("send-message");

const socket = io();
let user;
const time = new Date().toLocaleString();

Swal.fire({
  title: "Identificación de usuario",
  text: "Por favor, ingrese su dirección de correo electrónico",
  input: "email",

  inputValidator: (valor) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!valor.match(emailRegex)) {
      return "Ingrese una dirección de correo electrónico válida";
    }
  },
  allowOutsideClick: false,
}).then((resultado) => {
  user = resultado.value;
});

$sendMessage.addEventListener("click", async () => {
  try {
    if ($textToSend.value.trim().length > 0) {
      const newMessage = $textToSend.value;
      const mensajeAlternativo = {
        user,
        newMessage,
      };
      socket.emit("mensaje", mensajeAlternativo);
      $textToSend.value = "";
    }
  } catch {
    console.log("Ocurrió un error mandando los datos a la BDD");
  }
});

socket.on("todosLosMensajes", (arrayMessages) => {
  $messages.innerHTML = "";
  arrayMessages.forEach((message) => {
    $messages.innerHTML += `
    <div class="oneMessage">
    <p><i>${message.email}</i>: ${message.message}</p><p class="horario">${message.postTime}</p>
    </div>`;
  });
});
