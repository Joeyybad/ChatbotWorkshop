const toggleButton = document.getElementById("toggleChatButton");
const chatBox = document.querySelector(".chatcontainer");
const welcomeMessage = document.querySelector(".welcomeMessage");
const chatOptions = document.getElementById("chatOptions");



//fonction pour faire apparaitre le chat

toggleButton.addEventListener("click", () => {
    if (chatBox.style.display === "none" || chatBox.style.display === "") {
        chatBox.style.display = "flex";


        setTimeout(() => {
            welcomeMessage.style.display = "block";
            welcomeMessage.classList.add("show");
        }, 1000);


        setTimeout(() => {
            chatOptions.classList.add("show");
        }, 2000);

    } else {
        chatBox.style.display = "none";
        // Réinitialise pour rejouer l’animation au prochain clic
        welcomeMessage.classList.remove("show");
        chatOptions.classList.remove("show");
        welcomeMessage.style.display = "none";
    }
});

// Efface tous les messages et réinitialise le chat
const shownResponses = new Set();

document.getElementById("clearChatButton").addEventListener("click", () => {
    const chatBox = document.querySelector(".chatcontainer");
    const chat = document.getElementById("chat");
    const welcomeMessage = document.getElementById("welcomeMessage");
    const chatOptions = document.getElementById("chatOptions");

    // Supprimer uniquement les réponses ajoutées dynamiquement
    const extraMessages = chat.querySelectorAll(".welcomeWrapper:not(#initialWelcome)");
    extraMessages.forEach(el => el.remove());

    // Masquer les éléments de base pour réinitialiser
    welcomeMessage.classList.remove("show");
    welcomeMessage.style.display = "none";
    chatOptions.classList.remove("show");

    // Réactiver les boutons
    document.querySelectorAll("#chatOptions button").forEach(btn => btn.disabled = false);
    shownResponses.clear(); // Réinitialise les réponses affichées

    // Fermer le chat
    chatBox.style.display = "none";
});

const responseDiv = document.getElementById("response");
const buttons = document.querySelectorAll("#chatOptions button");

//Fonction pour afficher la réponse
function createBotMessage(message) {
    const wrapper = document.createElement("div");
    wrapper.className = "welcomeWrapper";

    const avatar = document.createElement("div");
    avatar.className = "avatar";

    const messageBox = document.createElement("div");
    messageBox.className = "welcomeMessage show";

    const messageText = document.createElement("div");
    messageText.className = "welcomeText";
    messageText.innerHTML = `<div class="bodyWelcome">${message}</div>`;

    messageBox.appendChild(messageText);
    wrapper.appendChild(avatar);
    wrapper.appendChild(messageBox);

    document.getElementById("chat").appendChild(wrapper);
}

const searchForm = document.getElementById("chatSearchForm");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // évite le rechargement de la page
});

// bouton pour la recherche 
const searchInput = document.getElementById("chatSearchInput");
const searchButton = document.getElementById("chatSearchButton");

searchButton.addEventListener("click", async () => {
    const keyword = searchInput.value.trim();
    if (!keyword) return;

    document.querySelectorAll(".searchBubble").forEach(b => b.remove()); // supprimer les anciennes propositions

    try {
        // Récupère les titres correspondant au mot-clé
        const res = await fetch(`/api/search-titles?keyword=${encodeURIComponent(keyword)}`);
        const titles = await res.json();

        if (titles.length === 0) {
            createBotMessage("Aucun résultat trouvé pour votre recherche.");
        } else {
            titles.forEach(item => {
                const bubble = document.createElement("div");
                bubble.className = "searchBubble";
                bubble.textContent = item.titre;

                bubble.addEventListener("click", async () => {
                    // Récupère le texte complet pour ce titre
                    const res2 = await fetch(`/api/get-text?id=${encodeURIComponent(item.id)}`);
                    const data = await res2.json();
                    createBotMessage(typeof data.texte === "string" ? data.texte : JSON.stringify(data.texte));
                    document.querySelectorAll(".searchBubble").forEach(b => b.remove());
                });

                document.getElementById("chat").appendChild(bubble);
            });
        }
    } catch (err) {
        console.error(err);
        createBotMessage("Erreur lors de la recherche.");
    }
});
