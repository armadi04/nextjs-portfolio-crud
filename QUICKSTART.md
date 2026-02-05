# 🚀 Quick Start Guide - Autonomous AI Decision Platform

## ✅ Prerequisites Completed

- [x] API Keys configured (.env file)
- [x] Google Gemini API integrated
- [x] Supabase credentials set

## 📋 Next Steps

### 1. Install Dependencies (In Progress)

```bash
.\venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Setup Database

Run the database setup script:

```bash
python setup_database.py
```

This will guide you to create the `audit_logs` table in Supabase.

**OR** manually run SQL in Supabase Dashboard:

1. Go to https://pcmtjkubgqwdbgpaouej.supabase.co
2. Navigate to SQL Editor
3. Run the SQL from `app/db/migrations.sql`

### 3. Test RAG Pipeline

```bash
python test_rag.py
```

This will test:

- Vector store initialization
- Document retrieval
- Gemini LLM response generation
- Policy checks

### 4. Run the Application

```bash
python -m uvicorn app.main:app --reload
```

Access:

- **API**: http://localhost:8000
- **Docs**: http://localhost:8000/docs
- **Health**: http://localhost:8000/health

## 🧪 Testing the API

### Test 1: Submit a Prompt

```bash
curl -X POST http://localhost:8000/prompt -H "Content-Type: application/json" -d "{\"prompt\": \"What is machine learning?\", \"user_id\": \"test_user\"}"
```

### Test 2: Get Audit Log

```bash
curl http://localhost:8000/audit/{audit_id}
```

### Test 3: Review Response

```bash
curl -X POST http://localhost:8000/review/{audit_id} -H "Content-Type: application/json" -d "{\"decision\": \"approved\", \"reviewer_id\": \"admin\"}"
```

## 📊 Key Changes Made

### ✅ Integrated Google Gemini

- Replaced OpenAI with Google Gemini API
- Updated LLM: `gemini-pro`
- Updated Embeddings: `models/embedding-001`

### ✅ Updated Configuration

- `GOOGLE_GEMINI_API_KEY` in config
- Updated all service files to use Gemini

### ✅ Created Helper Scripts

- `setup_database.py` - Database setup guide
- `test_rag.py` - RAG pipeline tester

## 🎯 Features Ready

✅ **RAG Pipeline** - Retrieval-Augmented Generation  
✅ **Responsible AI** - Policy enforcement  
✅ **Human-in-the-Loop** - Review workflow  
✅ **Audit Logging** - Full traceability  
✅ **Gemini Integration** - Google's latest AI

## 📁 Project Structure

```
cloud-native/
├── app/
│   ├── main.py              # FastAPI app
│   ├── config.py            # Configuration
│   ├── api/                 # API endpoints
│   ├── services/            # Business logic
│   ├── db/                  # Database
│   └── utils/               # Utilities
├── setup_database.py        # DB setup script
├── test_rag.py             # RAG tester
├── requirements.txt         # Dependencies
├── .env                     # Your credentials
└── README.md               # Full documentation
```

## 🔧 Troubleshooting

### Issue: Dependencies not installing

```bash
# Upgrade pip first
python -m pip install --upgrade pip
pip install -r requirements.txt
```

### Issue: Gemini API error

- Verify API key in `.env`
- Check quota at https://makersuite.google.com/

### Issue: Supabase connection error

- Verify URL and key in `.env`
- Check project status in Supabase dashboard

### Issue: Vector store error

- Delete `chroma_db/` folder and restart
- Will auto-create with sample documents

## 📞 Support

Check the interactive API docs at `/docs` for detailed endpoint information.

---

**Ready to test! 🎉**
