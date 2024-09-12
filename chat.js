const apiKey = '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'; // Substitua pela sua chave da API

async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value;
    inputField.value = '';

    // Exibe a mensagem do usuário no chat
    addMessage(userMessage, 'user');

    try {
        // Envia a mensagem para a API do OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // Modelo correto
                messages: [{ role: "user", content: userMessage }],
                max_tokens: 150
            })
        });

        const data = await response.json();

        if (response.ok && data.choices && data.choices.length > 0) {
            const botMessage = data.choices[0].message.content; // Acesse a resposta corretamente
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
