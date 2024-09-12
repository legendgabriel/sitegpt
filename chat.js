const apiKey = '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'; // Substitua pela sua chave da API

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value;
    inputField.value = '';

    // Exibe a mensagem do usuário no chat
    addMessage(userMessage, 'user');

    try {
        // Envia a mensagem para o GPT
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Certifique-se de que o modelo esteja correto
                prompt: userMessage,
                max_tokens: 150
            })
        });

        const data = await response.json();

        if (response.ok) {
            const botMessage = data.choices[0].text; // Acesse a resposta corretamente
            addMessage(botMessage, 'bot');
        } else {
            console.error("Erro na resposta da API:", data);
            addMessage("Desculpe, não consegui responder agora. Tente novamente mais tarde.", 'bot');
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        addMessage("Houve um erro na comunicação com o servidor. Verifique sua conexão e tente novamente.", 'bot');
    }
}

function addMessage(message, sender) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageContainer.textContent = message;
    document.getElementById('messages').appendChild(messageContainer);
}
