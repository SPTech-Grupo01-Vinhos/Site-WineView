const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const chatIA = new GoogleGenAI({ 
    apiKey: process.env.MINHA_CHAVE 
});

router.post("/perguntar", async (req, res) => {
    const pergunta = req.body.pergunta;

    try {
        const resultado = await gerarResposta(pergunta);
        res.json({ resultado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});

async function gerarResposta(mensagem) {
    try {
        const modeloIA = await chatIA.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Em um parágrafo responda: ${mensagem}`
        });

        const resposta = modeloIA.text;
        const tokens = modeloIA.usageMetadata;

        console.log(resposta);
        console.log("Uso de Tokens:", tokens);

        return resposta;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = router;