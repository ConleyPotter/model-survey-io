import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatOpenAI } from "@langchain/openai";

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are a helpful assistant who remembers all details the user shares with you.`,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
]);

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    maxTokens: 1000,
    model: "gpt-3.5-turbo",
});

const chain = prompt.pipe(model);

const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
        if (messageHistories[sessionId] === undefined) {
            messageHistories[sessionId] = new InMemoryChatMessageHistory();
        }
        return messageHistories[sessionId];
    },
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
});

const config = {
    configurable: {
        sessionId: "abc2",
    },
};

export default async function run() {
    const response = await withMessageHistory.invoke(
        {
            input: "Hi! I'm Bob!",
        },
        config
    );
    
    console.log(response.content);
}

async function followUp() {
    await run();
    const response = await withMessageHistory.invoke(
        {
            input: "What is my name?",
        },
        config
    );
    
    console.log(response.content);
}

followUp();