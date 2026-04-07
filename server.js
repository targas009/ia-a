require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar CORS
app.use(cors({ origin: '*' }));
app.use(express.json());

// 🔍 DEBUG: Verificar API Key (logs no Render!)
console.log('🔑 API Key carregada:', process.env.GEMINI_API_KEY ? 'SIM (***oculta***)' : '❌ NULA!');
console.log('🚀 Iniciando servidor na porta:', PORT);

// Validar API Key ANTES de criar genAI
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY não encontrada!');
  process.exit(1);
}

let genAI, model;

// Inicializar Gemini com retry
async function initGemini() {
  try {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('✅ Gemini inicializado!');
    
    // Teste rápido da API
    const testResult = await model.generateContent('teste');
    console.log('🧪 Teste Gemini OK');
  } catch (err) {
    console.error('❌ Erro inicializando Gemini:', err.message);
    throw err;
  }
}

// Personalidade da IA
const PERSONALIDADE = `Você é o Prof. Gemini, professor paciente que explica programação simplesmente.
Responda educacionalmente com exemplos práticos. Máximo 250 palavras.`;

// Inicializar na startup
initGemini().catch(err => {
  console.error('Falha fatal:', err);
});

// 🛠️ Rota HEALTH CHECK
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    apiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// API Chat com DEBUG COMPLETO
app.post('/api/chat', async (req, res) => {
  console.log('📨 POST /api/chat recebido');
  console.log('📦 req.body:', JSON.stringify(req.body));

  try {
    const { pergunta } = req.body;
    
    // Validações
    if (!pergunta?.trim()) {
      console.log('❌ Pergunta vazia');
      return res.status(400).json({ sucesso: false, erro: 'Pergunta obrigatória!' });
    }

    if (!model) {
      throw new Error('Gemini não inicializado');
    }

    console.log('🤖 Gerando resposta para:', pergunta.substring(0, 50) + '...');

    const prompt = `${PERSONALIDADE}\\n\\nAluno: ${pergunta}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textoResposta = response.text();

    console.log('✅ Resposta gerada (', textoResposta.length, 'chars)');
    
    res.json({
      sucesso: true,
      resposta: textoResposta.trim()
    });

  } catch (error) {
    console.error('💥 ERRO COMPLETO:', error.message);
    console.error('📍 Stack:', error.stack?.substring(0, 500));
    
    res.status(500).json({
      sucesso: false,
      erro: `Erro IA: ${error.message}`,
      detalhes: process.env.NODE_ENV === 'development' ? error.stack : 'Erro interno'
    });
  }
});

// ✅ Frontend Static + SPA
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor: http${PORT === 80 ? '' : `:${PORT}`}`);
  console.log('✅ Health: /health');
  console.log('✅ API: POST /api/chat');
  console.log('📱 Frontend: /');
});
