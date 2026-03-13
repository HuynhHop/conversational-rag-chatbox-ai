const sessionId = crypto.randomUUID();
function addMessage(text, type){

const chat = document.getElementById("chat");

const div = document.createElement("div");

div.classList.add("message");
div.classList.add(type);

div.innerHTML = marked.parse(text);

chat.appendChild(div);

chat.scrollTop = chat.scrollHeight;
}

async function send(){

  const input = document.getElementById("input");

  const message = input.value.trim();

  if(!message) return;

  addMessage(message,"user");

  input.value="";

  addMessage("AI đang suy nghĩ...","ai");

  const res = await fetch("http://localhost:3001/api/chat",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      message,
      sessionId
    })
  });

  const data = await res.json();

  const chat = document.getElementById("chat");

  chat.lastChild.remove();

  addMessage(data.answer,"ai");
}

function handleKey(e){

  if(e.key === "Enter"){
    send();
  }

}