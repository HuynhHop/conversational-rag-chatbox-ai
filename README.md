# 🤖 AI Travel Assistant (RAG Chatbot)

![Node](https://img.shields.io/badge/Node.js-18-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Qdrant](https://img.shields.io/badge/Qdrant-VectorDB-blue)
![AI](https://img.shields.io/badge/AI-RAG-orange)

An **AI-powered travel assistant chatbot** that helps users find hotels and flights using natural language.  
The system is built using a **Retrieval-Augmented Generation (RAG)** architecture that combines **LLMs, vector search, and reranking models** to generate accurate and contextual travel recommendations.

This project demonstrates how to build a **modern AI system with semantic search, vector databases, and conversational memory**.

---

# 🚀 Features

## 💬 Conversational Travel Assistant

Users can ask travel-related questions naturally:
Bạn hãy đề xuất khách sạn ở Hồ Chí Minh quận 1 rẻ nhất mà tiện ích tốt.
Có chuyến bay từ Hà Nội đến Đà Nẵng không?

The AI assistant understands the query, retrieves relevant travel data, and generates a contextual response.

---

## 🧠 Retrieval-Augmented Generation (RAG)

The system implements a **full RAG pipeline** to ensure answers are grounded in real system data.
User Question ->  Query Rewrite ->  Embedding ->  Vector Search (Qdrant) ->  Reranking Model ->  Context Construction ->  LLM Response

This architecture reduces hallucinations and improves answer relevance.

---

## 🔍 Semantic Search

Travel data (hotels and flights) are converted into **vector embeddings** and stored in a **vector database**.

This enables:

- Natural language search
- Semantic similarity matching
- Intelligent travel recommendations

---

## 🧠 Reranking Model

After retrieving results from the vector database, a **transformer-based reranking model** reorders the results to improve relevance before sending them to the LLM.

This significantly improves response quality.

---

## 💬 Multi-turn Conversation Memory

The chatbot supports **multi-turn conversations** by storing chat history.

Example:
User: Khách sạn rẻ ở Quận 1?
User: Có lựa chọn nào khác không?

The system understands the second question using conversation context.

---

# 🏗 System Architecture

The system follows a **modular AI architecture**:
Frontend (Chat UI)
↓
Chat API (Express)
↓
Chat Memory
↓
Query Rewrite
↓
Embedding Model
↓
Vector Search (Qdrant)
↓
Reranking Model
↓
Context Builder
↓
LLM Response

Each module is separated to make the system **scalable and maintainable**.

---

# ⚙️ Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB

## AI / Machine Learning
- Retrieval-Augmented Generation (RAG)
- Embedding Models
- Transformers.js
- Reranking Model

## Vector Database
- Qdrant

## Other Technologies
- REST API
- Semantic Search
- Conversational Memory

---
