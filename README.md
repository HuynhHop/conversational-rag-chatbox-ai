# 🤖 AI Travel Assistant (RAG Chatbot)

An **AI-powered travel assistant chatbot** that helps users find hotels and flights using natural language.

The system is built using a **Retrieval-Augmented Generation (RAG)** architecture that combines:

- LLMs (Google Gemini)
- Vector search (Qdrant)
- Embedding models
- Transformer reranking
- Conversational memory

The chatbot retrieves relevant travel information from a vector database and generates contextual responses for users.


---

# 🎥 Demo

https://res.cloudinary.com/dmdqvhn3e/video/upload/v1773454831/Travel_AI_Chat_-_Google_Chrome_2026-03-13_19-24-03_l87aat.mp4

---

# 🚀 Features

- 💬 **Conversational AI Assistant**  
  Users can ask travel questions in natural language.

- 🧠 **RAG Pipeline**  
  Uses Retrieval-Augmented Generation to answer questions using real system data.

- 🔍 **Semantic Search**  
  Hotel and flight data are stored as embeddings and searched using **Qdrant vector database**.

- 🧠 **Reranking Model**  
  Transformer-based reranking improves the relevance of retrieved results.

- 💬 **Conversation Memory**  
  Supports multi-turn conversations by using chat history.

---

# 🏗 System Architecture
User Question
      ↓
Query Rewrite (LLM)
      ↓
Embedding Model (MiniLM)
      ↓
Vector Search (Qdrant)
      ↓
Reranking Model
      ↓
Context Builder
      ↓
LLM (Gemini)
      ↓
Final Answer

---

# ⚙️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- REST API

### AI / Machine Learning
- Retrieval-Augmented Generation (RAG)
- Transformers.js
- MiniLM Embedding Model
- MiniLM Reranking Model
- Google Gemini LLM

### Vector Database
- Qdrant

### Other
- Docker
- Conversational Memory
- Semantic Search

---

# ⚙️ Installation

###1️⃣ Clone repository
- git clone https://github.com/your-username/travel-ai-chatbot.git
- cd travel-ai-chatbot
###2️⃣ Install dependencies
- npm install
###3️⃣ Setup .env
- PORT=3001
- MONGODB_URI=mongodb://localhost:27017/travel
- GEMINI_API_KEY=.................
###4️⃣ Run Qdrant Vector Database (Docker)
- docker run -p 6333:6333 qdrant/qdrant
###5️⃣ Prepare Vector Database
- node server/vector/createCollection.js
- node server/vector/buildEmbeddings.js
###6️⃣ Run Server
- node server/server.js
###7️⃣ Run Basic frontend
- index/html

# 👨‍🎓 Author
HuynhHop
