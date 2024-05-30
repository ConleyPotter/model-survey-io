
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { AIMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    maxTokens: 1000,
    model: "gpt-3.5-turbo",
});

export default async function chatModel() {
    const response = await model.invoke([
        new HumanMessage({ content: "Hi! I'm Bob" }),
        new AIMessage({ content: "Hello Bob! How can I help you?" }),
        new HumanMessage({ content: "What is my name?" }),
    ]);
    
    console.log(response);
}
