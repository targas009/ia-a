require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS para permitir frontend
app.use(cors({
  origin: '*', // Em produção, especifique a URL do frontend
}));

// Middleware para parsear JSON
app.use(express.json());

// Configurar Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Personalidade da IA: Professor didático e paciente
const PERSONALIDADE = `Você é o Prof. Gemini, um professor paciente e didático que explica conceitos de programação de forma simples. 
Responda sempre de forma educativa, usando exemplos práticos quando possível. 
Seja encorajador e explique passo a passo. Se a pergunta não for sobre programação, responda educadamente pedindo para focar em tecnologia. 
Mantenha respostas concisas mas completas (máximo 300 palavras).`;

// Rota POST /api/chat
app.post('/api/chat', async (req, res) => {
  try {
    // Validar se pergunta foi enviada
    const { pergunta } = req.body;
    if (!pergunta || pergunta.trim().length === 0) {
      return res.status(400).json({
        sucesso: false,
        erro: 'Por favor, envie uma pergunta válida!'
      });
    }

    // Gerar resposta da IA
    const prompt = `${PERSONALIDADE}\n\nPergunta do aluno: ${pergunta}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textoResposta = response.text();

    res.json({
      sucesso: true,
      resposta: textoResposta
    });

  } catch (error) {
    console.error('Erro na API Gemini:', error);
    res.status(500).json({
      sucesso: false,
      erro: 'Erro interno do servidor. Tente novamente!'
    });
  }
});

// ✅ Render-Ready: Static files + SPA fallback
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
});

