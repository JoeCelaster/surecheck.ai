# 🏥 surecheck.ai — Intelligent Health Insurance Recommendation System

surecheck.ai is a RAG-powered AI system that recommends personalized health insurance policies based on user profiles and real policy documents.

It combines **document-grounded retrieval (RAG)**, **structured reasoning**, and a **clean user experience** to deliver transparent and explainable insurance recommendations.

---

## ✨ Key Features

### 👤 User Side (Recommendation Engine)

* 6-field structured profile input:

  * Full Name
  * Age
  * Lifestyle
  * Pre-existing Conditions
  * Income Band
  * City Tier
* Personalized recommendation output with:

  * Peer comparison table (2–3 policies)
  * Coverage detail breakdown
  * Reasoned explanation tied to user profile

---

### 🤖 AI Agent (RAG-based)

* Retrieves policy chunks from uploaded PDFs
* No hallucinated data — all outputs grounded in documents
* Custom retrieval tool (`retrieveChunks`)
* Structured output (3 required sections)

---

### 📊 Output Sections (Spec-Compliant)

#### 1. Peer Comparison Table

| Field             | Source                  |
| ----------------- | ----------------------- |
| Policy Name       | Extracted from document |
| Insurer           | Extracted via regex     |
| Premium           | Extracted               |
| Cover Amount      | Extracted               |
| Waiting Period    | Extracted               |
| Key Benefit       | Chunk summary           |
| Suitability Score | Derived                 |

✔ No placeholder values
✔ All data grounded in policy documents

---

#### 2. Coverage Details Table

* Inclusions
* Exclusions
* Sub-limits
* Co-pay
* Claim Type

✔ Fully retrieved via RAG
✔ No model-generated assumptions

---

#### 3. Why This Policy

* 150–250 word explanation
* References:

  * Age
  * Lifestyle
  * Conditions
  * Income
  * City

✔ Fully personalized
✔ Context-aware reasoning

---

### 🛠 Admin Panel

* Upload policy PDFs
* Automatic:

  * Parsing → Chunking → Embedding → Storage
* Delete policies (instant vector removal)
* View uploaded documents

---

## 🧠 Architecture

```
User Input → Backend → RAG Retrieval → Structured Agent → Response
                         ↓
                   Vector Store
```

---

## ⚙️ Tech Stack

| Layer        | Technology                      | Why                           |
| ------------ | ------------------------------- | ----------------------------- |
| Frontend     | Next.js + Tailwind              | Fast UI, modern DX            |
| Backend      | Node.js + Express               | Simple, flexible              |
| AI           | Custom RAG (no heavy framework) | Full control + lightweight    |
| Embeddings   | Local (Xenova MiniLM)           | Free + fast                   |
| Vector Store | In-memory                       | Instant deletion + simplicity |
| PDF Parsing  | pdf-parse                       | Reliable extraction           |

---

## 🧠 Why NOT Pinecone / LangChain?

Instead of relying on heavy frameworks:

* Built custom retrieval pipeline
* Ensured full control over:

  * grounding
  * deletion
  * data flow

This avoids:

* hidden abstraction
* hallucinated outputs
* unnecessary complexity

---

## 🔥 RAG Pipeline

1. Upload PDF
2. Extract text
3. Chunk into segments
4. Generate embeddings
5. Store vectors
6. Retrieve relevant chunks on query
7. Generate structured output

---

## 🧪 Running the Project

### 1. Backend

```bash
cd apps/server
npm run dev
```

Runs on:
👉 http://localhost:5000

---

### 2. Frontend

```bash
cd apps/web
npm run dev
```

Runs on:
👉 http://localhost:3000

---

## 📁 Project Structure

```
apps/
  server/     → Express backend
  web/        → Next.js frontend

packages/
  ai/         → RAG + Agent logic
```

---

## 🧾 Design Decisions

### Vector Store Choice

Used in-memory vector store because:

* Immediate deletion required
* Faster iteration
* No infra dependency

Production alternative:

* Pinecone
* Qdrant
* pgvector

---

### Embedding Choice

Used local embeddings:

* No API cost
* Fast inference
* Offline capability

---

## 🚧 Limitations

* Regex-based extraction (not perfect)
* No persistent database yet
* Basic admin authentication

---

## 🚀 Future Improvements

* Replace regex with structured extraction (LLM + schema)
* Add persistent DB (PostgreSQL)
* Add chat-based explainer (Section 3.3)
* Improve ranking model
* Better UI polish

---

## 🏁 Conclusion

Asurecheck.ai demonstrates a **fully grounded, explainable AI system** that:

* avoids hallucination
* uses real policy data
* delivers structured recommendations

This is not just an LLM wrapper — it is a **complete RAG system with reasoning**.
