from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import time
import requests  # for calling your LLM API

# ==== CONFIGURATION ====

LLM_API_URL = "https://your-company-llm.com/generate"  # ⬅️ Replace with your LLM endpoint
LLM_API_KEY = "your-secret-api-key"  # ⬅️ Replace with your LLM key

SYSTEM_PROMPT = """
You are a data analytics assistant whose work is to provide select queries.

Here is the database schema:
Table: sales
- id: INTEGER, Primary key
- customer_id: INTEGER, Foreign key to customers
- product_id: INTEGER, Foreign key to products
- amount: DECIMAL, Sale amount
- created_at: DATETIME, Sale timestamp

Table: customers
- id: INTEGER
- name: VARCHAR
- email: VARCHAR
- created_at: DATETIME

Table: products
- id: INTEGER
- product_name: VARCHAR
- price: DECIMAL
"""

# ==== FastAPI Setup ====

app = FastAPI(title="Data Analytics Chatbot API", version="1.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==== Models ====

class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    response: str
    sql_query: Optional[str] = None
    execution_time: Optional[float] = None

# ==== Helper Function ====

def query_llm(user_prompt: str) -> str:
    """
    Sends prompt to the custom LLM and returns the SQL query as string.
    """
    payload = {
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ]
    }

    headers = {
        "Authorization": f"Bearer {LLM_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(LLM_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        result = response.json()
        
        # Assumes LLM returns: {"sql": "..."} or {"response": "..."}
        return result.get("sql") or result.get("response")

    except requests.exceptions.RequestException as e:
        raise RuntimeError(f"LLM API call failed: {str(e)}")

# ==== Endpoints ====

@app.post("/ask", response_model=QueryResponse)
async def ask_question(request: QueryRequest):
    start = time.time()

    try:
        prompt = request.query.strip()
        
        # Very basic filtering to identify query-related prompts
        if any(word in prompt.lower() for word in ["sales", "query", "revenue", "report", "table", "product"]):
            sql_code = query_llm(prompt)
            return QueryResponse(
                response="Here is the generated SQL query.",
                sql_query=sql_code,
                execution_time=round(time.time() - start, 2)
            )
        else:
            return QueryResponse(
                response="Sorry, I can only help with analytics queries right now.",
                execution_time=round(time.time() - start, 2)
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "Data Analytics Chatbot API is running!"}

@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": time.time()}
