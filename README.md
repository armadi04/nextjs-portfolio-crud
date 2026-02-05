# Cloud-Native Responsible Generative AI Platform

A hackathon MVP for a Cloud-Native Responsible Generative AI Platform focused on governance, auditability, and human-in-the-loop review.

## 🎯 Features

- **RAG Pipeline**: Retrieval-Augmented Generation using LangChain and Chroma
- **Responsible AI**: Policy enforcement with keyword-based violation detection
- **Human-in-the-Loop**: Review workflow for AI-generated responses
- **Audit Logging**: Complete traceability in Supabase for compliance
- **Explainability**: Source documents and confidence scores for transparency

## 🏗️ Architecture

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│      FastAPI Application            │
│  ┌───────────────────────────────┐  │
│  │   POST /prompt                │  │
│  │   GET /audit/{id}             │  │
│  │   POST /review/{id}           │  │
│  └───────────────────────────────┘  │
└──────┬──────────────────────┬───────┘
       │                      │
       ▼                      ▼
┌─────────────┐        ┌─────────────┐
│   Chroma    │        │  Supabase   │
│ Vector Store│        │  PostgreSQL │
└─────────────┘        └─────────────┘
       │
       ▼
┌─────────────┐
│   OpenAI    │
│     LLM     │
└─────────────┘
```

## 📋 Prerequisites

- Python 3.10+
- OpenAI API key
- Supabase account (free tier works)

## 🚀 Quick Start

### 1. Clone and Setup

```bash
cd cloud-native
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env`:

```env
OPENAI_API_KEY=sk-your-openai-key-here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-service-key-here
```

### 4. Setup Supabase Database

Go to your Supabase project → SQL Editor → Run the migration:

```sql
-- Copy and run the SQL from app/db/migrations.sql
```

### 5. Run the Application

```bash
python -m uvicorn app.main:app --reload
```

The API will be available at: `http://localhost:8000`

API Documentation: `http://localhost:8000/docs`

## 📚 API Usage

### Submit a Prompt

```bash
curl -X POST http://localhost:8000/prompt \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "What is machine learning?",
    "user_id": "user_123"
  }'
```

Response:

```json
{
  "audit_id": "uuid-here",
  "answer": "Machine learning is...",
  "sources": [
    {
      "content": "Machine learning is a subset of AI...",
      "metadata": { "source": "ml_basics.pdf", "page": 1 },
      "similarity_score": 0.89
    }
  ],
  "confidence_score": 0.85,
  "policy_flag": false,
  "policy_violations": [],
  "status": "pending"
}
```

### Get Audit Log

```bash
curl http://localhost:8000/audit/{audit_id}
```

### Review Response

```bash
curl -X POST http://localhost:8000/review/{audit_id} \
  -H "Content-Type: application/json" \
  -d '{
    "decision": "approved",
    "reviewer_id": "reviewer_1",
    "comments": "Looks good"
  }'
```

## 🔒 Responsible AI Features

### Policy Checks

The system automatically checks for:

- **PII Detection**: SSN, credit card numbers, emails
- **Harmful Content**: Violence, hate speech
- **Sensitive Topics**: Medical, legal, financial advice

### Confidence Scoring

- Based on vector similarity scores
- Range: 0.0 to 1.0
- Helps reviewers prioritize low-confidence responses

### Audit Trail

Every interaction is logged with:

- User ID and prompt
- Generated response
- Source documents
- Confidence score
- Policy flags
- Review status and reviewer

## 📁 Project Structure

```
cloud-native/
├── app/
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration management
│   ├── api/
│   │   ├── prompt.py        # POST /prompt endpoint
│   │   ├── audit.py         # GET /audit/{id} endpoint
│   │   └── review.py        # POST /review/{id} endpoint
│   ├── services/
│   │   ├── rag_service.py   # RAG pipeline
│   │   ├── policy_service.py # Policy enforcement
│   │   └── audit_service.py  # Audit logging
│   ├── db/
│   │   ├── supabase.py      # Database client
│   │   └── migrations.sql   # Database schema
│   ├── schemas/
│   │   └── __init__.py      # Pydantic models
│   └── utils/
│       ├── logger.py        # Logging configuration
│       └── vector_store.py  # Vector store setup
├── requirements.txt
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🐳 Docker Deployment

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# Stop
docker-compose down
```

## 🧪 Testing

### Test RAG Pipeline

```bash
curl -X POST http://localhost:8000/prompt \
  -H "Content-Type: application/json" \
  -d '{"prompt": "What is deep learning?", "user_id": "test"}'
```

### Test Policy Violation

```bash
curl -X POST http://localhost:8000/prompt \
  -H "Content-Type: application/json" \
  -d '{"prompt": "My SSN is 123-45-6789", "user_id": "test"}'
```

## 🔧 Configuration

Key settings in `.env`:

- `RETRIEVAL_TOP_K`: Number of documents to retrieve (default: 3)
- `SIMILARITY_THRESHOLD`: Minimum similarity for retrieval (default: 0.7)
- `CONFIDENCE_THRESHOLD`: Threshold for flagging low confidence (default: 0.6)
- `ENABLE_POLICY_CHECK`: Enable/disable policy checks (default: True)

## 📊 Governance Dashboard

View audit logs in Supabase:

1. Go to Supabase Dashboard
2. Navigate to Table Editor
3. Select `audit_logs` table
4. Filter by status, policy_flag, etc.

## 🚧 Future Enhancements

- [ ] Advanced policy rules with ML-based detection
- [ ] Multi-model support (HuggingFace, Anthropic)
- [ ] Real-time review dashboard
- [ ] Batch processing for multiple prompts
- [ ] Export audit logs for compliance reporting
- [ ] Fine-grained access control
- [ ] Webhook notifications for reviews

## 📝 License

MIT License - feel free to use for your hackathon!

## 🤝 Contributing

This is a hackathon MVP. Feel free to extend and improve!

## 📧 Support

For issues or questions, check the API docs at `/docs` or review the code comments.

---

Built with ❤️ for responsible AI development
