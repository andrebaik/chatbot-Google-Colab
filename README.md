<div align="center">
  <img src="https://raw.githubusercontent.com/platane/platane/output/github-contribution-grid-snake-dark.svg" width="0" height="0" />
  <h1 align="center">
    <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Oxanium&pause=1000&color=F77609&width=435&lines=Chatbot+RAG;Qwen2.5+3B+%7C+FastAPI+%7C+ChromaDB;8+PDF+%7C+RAG+Pipeline+%7C+Streaming" alt="Typing SVG" /></a>
  </h1>
  <p align="center">
    <b>RAG-powered Indonesian-language chatbot</b> — combines a 4-bit quantized <b>Qwen2.5-3B-Instruct</b> LLM with a <b>ChromaDB</b> vector store and <b>FastAPI</b> backend, wrapped in a modern <b>React + TailwindCSS</b> frontend.
  </p>
  <p align="center">
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-features">Features</a> •
    <a href="#-project-structure">Structure</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-rouge-evaluation">ROUGE Eval</a>
  </p>
</div>

---

## Features

<table>
<tr>
<td>

- **Retrieval-Augmented Generation (RAG)** — answers grounded in 8 PDF textbooks (Java, Python, Git, MySQL, GenAI, Web Programming, etc.)
- **4-bit Quantized LLM** — Qwen2.5-3B-Instruct loaded with BitsAndBytes `nf4`, runs on a single Tesla T4 (Colab)
- **Streaming Responses** — SSE-powered real-time token streaming via FastAPI
- **Smart Intent Detection** — automatically classifies queries as coding error, coding help, general question, or general chat
- **Topic-Aware Retrieval** — `detect_topic()` maps keywords to specific PDFs, filters ChromaDB context accordingly

</td>
<td>

- **Persistent Vector Store** — ChromaDB backed by Google Drive + manifest system for incremental PDF updates
- **Cloudflare Tunnel** — exposes Colab-hosted backend to the internet without deployment
- **Modern UI** — React 19 + TailwindCSS v4 + GSAP animations + Three.js particle effects
- **Conversation Management** — create, rename, delete, export, import chat histories
- **Dark Mode** — premium dark theme with accent color customization
- **ROUGE Evaluation** — built-in 90-question benchmark across 8 PDF categories

</td>
</tr>
</table>

---

## Tech Stack

### Backend & AI

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Google%20Colab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white" />
  <img src="https://img.shields.io/badge/HuggingFace-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black" />
  <img src="https://img.shields.io/badge/Qwen2.5-3B-FF8C00?style=for-the-badge&logo=🤖&logoColor=white" />
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white" />
  <img src="https://img.shields.io/badge/BitsAndBytes-FF6F00?style=for-the-badge&logo=🧮&logoColor=white" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Uvicorn-4B8BBE?style=for-the-badge&logo=uvicorn&logoColor=white" />
  <img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" />
  <img src="https://img.shields.io/badge/ChromaDB-4A154B?style=for-the-badge&logo=chromadb&logoColor=white" />
  <img src="https://img.shields.io/badge/BAAI%2Fbge--m3-8E44AD?style=for-the-badge&logo=🤗&logoColor=white" />
  <img src="https://img.shields.io/badge/PyPDFLoader-FF6B6B?style=for-the-badge&logo=📄&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudflare%20Tunnel-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" />
  <img src="https://img.shields.io/badge/ROUGE-0D1117?style=for-the-badge&logo=📊&logoColor=white" />
</p>

### Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />
  <img src="https://img.shields.io/badge/Lucide%20Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white" />
</p>

---

## Project Structure

```
 chatbot/
├──  backend/
│   └── chatbot.ipynb              # Full pipeline: install → load PDFs → chunk → embed → ChromaDB → load LLM → FastAPI
│
├──  chatbot-ui/                  # React frontend
│   ├── src/
│   │   ├── components/             # UI components
│   │   │   ├── ChatArea.jsx        # Message list with markdown rendering
│   │   │   ├── ChatInput.jsx       # Input bar with send/stop
│   │   │   ├── Sidebar.jsx         # Conversation sidebar
│   │   │   ├── WelcomeScreen.jsx   # Landing page
│   │   │   ├── Presentation.jsx    # Intro animation
│   │   │   ├── GridScan.jsx        # Three.js scan-line effect
│   │   │   ├── SettingsModal.jsx   # Accent color + grid toggle
│   │   │   ├── MessageBubble.jsx   # Chat message display
│   │   │   ├── TypingIndicator.jsx # Loading animation
│   │   │   ├── CopyButton.jsx      # Copy code button
│   │   │   ├── Shuffle.jsx         # Decorative text shuffle
│   │   │   ├── BlurText.jsx        # Text blur animation
│   │   │   ├── SplitText.jsx       # Text split animation
│   │   │   └── ui/                 # shadcn/ui primitives
│   │   ├── hooks/
│   │   │   └── useLocalStorage.js  # Persistent localStorage hook
│   │   └── App.jsx                 # Main app with state management
│   ├── package.json
│   └── vite.config.js
│
├──  docs/                        # Documentation & specs
├──  .gitignore
└──  README.md
```

---

## Quick Start

### 1. Backend (Google Colab)

<a href="https://colab.research.google.com/drive/1-842e9EH3hmfSBHJSPaVHu_Cduuh_p9k" target="_blank">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" />
</a>

| Step | Action |
|------|--------|
| 1 | Open the notebook in Colab |
| 2 | Run all cells — this installs dependencies, loads 8 PDFs, chunks & embeds them into ChromaDB, loads Qwen2.5-3B-Instruct (4-bit), and starts FastAPI on port **8010** |
| 3 | A Cloudflare Tunnel URL is generated automatically — copy the public URL |
| 4 | Set `VITE_API_URL` in `chatbot-ui/.env` to your tunnel URL |

> **Note:** The notebook requires a Hugging Face token (`HF`) stored as a Colab secret. GPU runtime (Tesla T4+) is strongly recommended.

### 2. Frontend

```bash
cd chatbot-ui
cp .env.example .env
# Set VITE_API_URL to your Colab tunnel URL

npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## ROUGE Evaluation

The system includes an automated 90-question benchmark across **8 PDF categories**:

| Category | Questions | ROUGE-1 | ROUGE-2 | ROUGE-L |
|----------|-----------|---------|---------|---------|
| Java (Dasar Pemrograman) | 10 | 0.073 | 0.022 | 0.062 |
| Coding Dasar | 10 | 0.097 | 0.050 | 0.085 |
| GenAI (Buku Panduan) | 10 | **0.149** | **0.081** | **0.139** |
| MySQL | 10 | 0.043 | 0.006 | 0.041 |
| Web Programming | 10 | 0.066 | 0.020 | 0.056 |
| Git (ProGit) | 10 | 0.036 | 0.008 | 0.034 |
| Python (PythonLearn) | 20 | 0.040 | 0.007 | 0.035 |
| Komputer FULL | 10 | 0.063 | 0.015 | 0.057 |
| **Overall** | **90** | **0.067** | **0.024** | **0.061** |

> Evaluation methodology: Each question's answer is compared against the ground-truth reference from the source PDF using the ROUGE metric.

---

## Architecture

```mermaid
graph LR
    A[PDF Files<br/>8 textbooks] --> B[PyPDFLoader]
    B --> C[RecursiveCharacter<br/>TextSplitter]
    C --> D[BAAI/bge-m3<br/>Embeddings]
    D --> E[(ChromaDB<br/>Vector Store)]
    
    F[User Query] --> G{Intent & Topic<br/>Detection}
    G --> H[ChromaDB<br/>Retriever]
    E --> H
    H --> I[Context + Prompt<br/>Builder]
    
    I --> J[Qwen2.5-3B-Instruct<br/>4-bit / Tesla T4]
    J --> K[FastAPI<br/>Backend]
    K --> L[SSE Stream]
    L --> M[React + TailwindCSS<br/>Frontend]
```

---

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | FastAPI backend URL (Colab tunnel) | `http://localhost:8010` |
| `HF_TOKEN` | Hugging Face access token (Colab secret) | — |
| `EMBEDDING_MODEL` | Sentence embedding model | `BAAI/bge-m3` |
| `MODEL_NAME` | LLM model | `Qwen/Qwen2.5-3B-Instruct` |
| `CHROMA_DIR` | ChromaDB persistence path | `/content/chatbot-db/chroma_db` |
| `PDF_DIR` | PDF source directory | `/gdrive/MyDrive/chatbot-pdfs` |
| `chunk_size` | Document chunk size | 700 |
| `chunk_overlap` | Chunk overlap | 150 |
| `k` | Number of retrieved chunks | 15 |

---

## PDF Sources

| PDF | Topics |
|-----|--------|
| `03. DASAR-DASAR PEMROGRAMAN.pdf` | Java, tipe data, identifier, operator, komentar |
| `642863-dasar-dasar-coding-....pdf` | Coding, algoritma, percabangan, perulangan |
| `Buku-Panduan-GenAI-....pdf` | AI, GenAI, T.U.C.E. Framework, etika akademik |
| `MySQLNotesForProfessionals.pdf` | MySQL, JOIN, INDEX, foreign key |
| `Pemrograman Web Dasar.pdf` | HTML, CSS, JavaScript, PHP |
| `Pemrograman Komputer FULL.pdf` | Python, return, `__init__`, modul, file I/O |
| `progit.pdf` | Git, branching, rebase, stash, bisect |
| `pythonlearn.pdf` | Python fundamentals, strings, files, regex |

---

## License

This project is for educational and research purposes.

---

<div align="center">
  <sub>Built with using Google Colab · FastAPI · React · TailwindCSS</sub>
  <br/>
  <a href="https://colab.research.google.com/drive/1-842e9EH3hmfSBHJSPaVHu_Cduuh_p9k" target="_blank">
    <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab" />
  </a>
</div>
