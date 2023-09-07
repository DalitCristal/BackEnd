const $messages = document.getElementById("messages"),
  $textToSend = document.getElementById("text-to-send"),
  $sendMessage = document.getElementById("send-message");

const socket = io();
let user;
const time = new Date().toLocaleString();

Swal.fire({
  title: "Identificacion de usuario",
  text: "Porfavor ingrese su nombre",
  input: "text",

  inputValidator: (valor) => {
    return !valor && "Ingrese su nombre de usuario";
  },
  allowOutsideClick: false,
}).then((resultado) => {
  user = resultado.value;
  console.log(user);
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
