# 🚀 Chat com Prof. Gemini - Projeto Completo

## 📋 O que foi criado?

Um chat completo **Full-Stack** com:
- ✅ **Backend**: Node.js + Express + Google Gemini API
- ✅ **Frontend**: HTML/CSS/JS puro (sem frameworks)
- ✅ **Personalidade**: Prof. Gemini (professor didático)
- ✅ **Deploy**: Pronto para Render.com (PaaS gratuito)

## 🎯 Como rodar LOCALMENTE?

```bash
# 1. Abra o terminal na pasta do projeto
cd "c:/Users/aluno2025/Documents/aa ia"

# 2. Instalar dependências
npm install

# 3. Criar arquivo .env (COPIE o .env.example)
copy .env.example .env

# 4. Colar sua chave do Gemini no .env
# GEMINI_API_KEY=AIzaSyCs0nXIsSLOaxUKuFvlT69K8Q3abcxPgv4
# Pegue em: https://aistudio.google.com/app/apikey

# 5. Rodar o servidor
npm start
```

✅ **Acesse**: http://localhost:3000

## ☁️ Como fazer DEPLOY no RENDER?

1. **Push para GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin SEU_REPOSITORIO
git push -u origin main
```

2. **Render.com** (gratuito):
   - Crie conta em [render.com](https://render.com)
   - New → Web Service → Connect GitHub
   - Configurar:
     ```
     Build Command: npm install
     Start Command: npm start
     ```
   - **Environment Variables**:
     ```
     GEMINI_API_KEY = sua_chave_real_aqui
     ```

3. **Pronto!** URL do Render: `https://seu-app.onrender.com`

## 🛠️ Estrutura do Projeto

```
.
├── package.json      # Dependências + scripts
├── server.js         # Backend completo
├── public/           # Frontend
│   └── index.html   # Interface chat
├── .env.example     # Template variáveis
└── README.md        # 📖 Este arquivo
```

## 🔧 Possíveis ERROS e SOLUÇÕES

| ❌ Erro | ✅ Solução |
|---------|------------|
| `GEMINI_API_KEY undefined` | Verifique .env e `npm install dotenv` |
| `CORS error` | Já habilitado no server.js |
| `Port already in use` | Use `process.env.PORT` (Render define) |
| `Module not found` | Execute `npm install` |
| `Fetch error` | Backend deve estar rodando |

## 🎨 DIFERENCIAIS do Projeto

1. **Prof. Gemini**: IA com personalidade de professor paciente
2. **Design moderno**: Gradientes, animações, responsivo
3. **Tratamento completo**: Loading, erros, validações
4. **Produção-ready**: CORS, PORT env, Render engines
5. **Zero dependências frontend**: HTML/CSS/JS puro

## 📈 Próximos Passos (Opcional)

```bash
# Dev mode com auto-reload
npm install -g nodemon
npm run dev
```

**Qualquer dúvida? Abra uma issue!** 🎓

---
*Desenvolvido por BLACKBOXAI - Projeto acadêmico completo*

