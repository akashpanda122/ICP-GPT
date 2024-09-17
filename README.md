<h1 align="center">ICPGPT Chatbot</h1>


<p align="center">
  Write and deploy smart contract on ICP using natural language prompts.
</p>

![ICPGPT](/public/ICPGPT_logo.png "ICPGPT")

ICPGPT is a powerful tool that leverages the capabilities of Gemini model to provide users with contextually relevant answers from the ICP documentation. It serves as a bridge between user queries and the vast knowledge base of ICP.

## User Flow
```mermaid
graph TD;
    A[Data Preprocessing] -->|Parse & Translate| B[Embedding Generation];
    B --> C[Hybrid Indexing];
    D[User Query] --> E[Search Engine];
    E -->|Query Processing & Execution| C;
    C --> F[Response Generation];
    F --> G[User Interface];
    G --> D;

```

```mermaid
graph TD;
    A[User Input - Natural Language Prompt] -->|Request Processing| B[Gemini Model];
    B --> C[Contextual Analysis of ICP Documentation];
    C --> D[Generate Contract Code];
    D --> E[User-Friendly Templates];
    D --> F[Custom Smart Contract];
    E --> G[Interactive Tutorial & Contract Suggestions];
    F --> H[Real-time Error Debugging];
    H -->|Prompt| I[Revised Smart Contract];
    G --> J[Deployment Options on ICP];
    I --> J;
    J --> K[Smart Contract Deployed on ICP];

```

## Sequential Diagram
```mermaid
sequenceDiagram
    participant Vercel
    participant DB (Pinecone)
    participant Gemini (API)
    
    loop 1. Pre-process the knowledge base
        Vercel->>Vercel: Chunk knowledge base into sections
        loop 2. Create & store embeddings
            Vercel->>Gemini (API): create embedding for knowledge base section
            Gemini (API)->>Vercel: embedding vector(1536)
            Vercel->>DB (Pinecone): store embedding for section
        end
    end
```

## Runtime
```mermaid
sequenceDiagram
    participant Client
    participant Edge Function
    participant DB (Pinecone)
    participant Gemini (API)
    
    Client->>Edge Function: { query: What is ICP? }
    
    critical 3. Perform vector similarity search
        Edge Function->>Gemini (API): create embedding for query
        Gemini (API)->>Edge Function: embedding vector(1536)
        Edge Function->>DB (Pinecone): vector similarity search
        DB (Pinecone)->>Edge Function: relevant docs content
    end
    
    critical 4. Inject content into prompt
        Edge Function->>Gemini (API): completion request prompt: query + relevant docs content
        Gemini (API)-->>Client: text/event-stream: completions response
    end

```