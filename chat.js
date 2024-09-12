const apiKey = 'sk-proj-m579i1bqcyBrnF1kpsvUr2izZ0VDHMMKB_8r_xyeln_BrNV0KPBNlTic_kIkn6BaGRO2B_8gUxT3BlbkFJuTF6ERzvRoHBu-fN-N_FYfI6H-JkeKZrDWQN_qFKs-BYfdLUMdM6G4sQWuhocI-EZdSi-vArQAEY'; // Insira sua chave da API do OpenAI aqui.

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value;
    inputField.value = '';

    // Exibe a mensagem do usuário no chat
    addMessage(userMessage, 'user');

    // Envia a mensagem para o GPT
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003", // ou outro modelo de sua escolha
            prompt: userMessage,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const botMessage = data.choices[0].text;

    // Exibe a resposta do GPT no chat
    addMessage(botMessage, 'bot');
}

function addMessage(message, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageContainer.textContent = message;
    document.getElementById('messages').appendChild(messageContainer);
}
