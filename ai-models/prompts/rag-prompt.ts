import { ChatPromptTemplate } from "@langchain/core/prompts";

const RAG_PROMPT = `
    You are an assistant for question-answering tasks. Use the following pieces 
    of retrieved context to answer the question. If you don't know the answer, 
    just say that you don't know. Use three sentences maximum and keep the answer concise.
    Question: {question}
    Context: {context}
    Answer:
`

const rag_prompt = ChatPromptTemplate.fromTemplate(RAG_PROMPT);

export default rag_prompt;