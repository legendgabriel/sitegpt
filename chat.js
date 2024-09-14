// chat.js
async function sendMessage() {
    const inputField = document.getElementById("user-input");
    const userMessage = inputField.value.trim();
    if (userMessage === "") return; // Verifica se a mensagem está vazia
    inputField.value = '';

    addMessage(userMessage, 'user');

    try {
        // Faz a requisição para o servidor backend
        const response = await fetch("http://localhost:3000/api/chat", { // Certifique-se de que está chamando o endpoint correto
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.choices && data.choices.length > 0) {
            const botMessage = data.choices[0].message.content;
            addMessage(botMessage, 'bot');
        } else {
            console.error("Erro na resposta da API:", data);
            addMessage("Desculpe, não consegui responder agora. Tente novamente mais tarde.", 'bot');
        }
    } catch (error) {
        console.error("Erro na requisição:", error.message);
        addMessage("Houve um erro na comunicação com o servidor. Verifique sua conexão e tente novamente.", 'bot');
    }
}
