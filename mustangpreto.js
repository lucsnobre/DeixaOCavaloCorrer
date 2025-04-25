'use strict';

const usuarioId = 1; // Altere conforme necessário
const API_URL = "https://projetozapzap.onrender.com";

async function getListaDeContatos(idUsuario) {
    const url = `${API_URL}/v1/whatsapp/contatos/${idUsuario}`;
    const response = await fetch(url);
    const contatos = await response.json();
    return contatos;
}

async function getConversasComContato(idUsuario, contatoId) {
    const url = `${API_URL}/v1/whatsapp/conversas/${idUsuario}/${contatoId}`;
    const response = await fetch(url);
    if (!response.ok) return [];
    return await response.json();
}

async function renderContatos() {
    const contacts = await getListaDeContatos(usuarioId);
    const contactList = document.getElementById("contact-list");
    contactList.innerHTML = '';

    contacts.forEach(contact => {
        const li = document.createElement("li");
        li.onclick = () => renderConversas(contact.nome, contact.nome, li);

        const img = document.createElement("img");
        img.src = "./img/Icon1.webp";
        img.alt = contact.nome;

        const span = document.createElement("span");
        span.textContent = contact.nome;

        li.appendChild(img);
        li.appendChild(span);
        contactList.appendChild(li);
    });
}

async function renderConversas(nomeContato, idContato, contactElement) {
    document.getElementById("chat-header").textContent = nomeContato;
    document.querySelectorAll(".contacts li").forEach(li => li.classList.remove("active"));
    contactElement.classList.add("active");

    console.log("Renderizando conversa com:", nomeContato);

    const conversa = await getConversasComContato(usuarioId, idContato);
    const mensagens = conversa.length > 0 ? conversa[0].mensagens : [];

    const chatMessages = document.getElementById("chat-messages");
    chatMessages.innerHTML = '';

    if (mensagens.length === 0) {
        chatMessages.innerHTML = "<p style='text-align:center; color:gray;'>Nenhuma conversa disponível.</p>";
        return;
    }

    console.log("Mensagens recebidas:", mensagens);

    mensagens.forEach(msg => {
        console.log("Mensagem bruta:", msg);

        const div = document.createElement("div");
        div.classList.add("message", msg.sender === "me" ? "sent" : "received");

        div.innerHTML = `
            <p>${msg.content}</p>
            <span class="timestamp">${msg.time}</span>
        `;

        chatMessages.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", renderContatos);
