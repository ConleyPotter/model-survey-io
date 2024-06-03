import { ChatOpenAI } from "@langchain/openai";
import generateVectorStore from "../vector-stores/generate-vector-store";
import rag_prompt from '../prompts/rag-prompt';
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { formatDocumentsAsString } from "langchain/util/document";

export default async function generateRagChain(user): Promise<RunnableSequence> {
    const llm = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-3.5-turbo",
      });

    const vectorStore = await generateVectorStore(user)
    
    const retriever = vectorStore.asRetriever();

    const prompt = await rag_prompt;
    
    const ragChain = RunnableSequence.from([
        {
            context: retriever.pipe(formatDocumentsAsString),
            question: new RunnablePassthrough(),
        },
        prompt,
        llm,
        new StringOutputParser(),
    ])

    return ragChain;
}
