import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage, type BaseMessage } from "@langchain/core/messages";
import {
    RunnableLike,
  RunnablePassthrough,
  RunnableSequence,
  RunnableWithMessageHistory,
} from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    maxTokens: 1000,
    model: "gpt-3.5-turbo",
});

/**
 * A function that filters the chat history by keeping the last 10 messages.
 *
 * @param {Object} params - An object containing the chat history.
 * @param {Array<BaseMessage>} params.chat_history - The chat history array.
 *
 * @returns {Array<BaseMessage>} - The filtered chat history array containing the last 10 messages.
 */
interface FilterMessagesParams {
    chat_history: Array<BaseMessage>;
  }

function filterMessages(params: FilterMessagesParams): RunnableLike<Record<string, unknown>, {}> {
    return params.chat_history.slice(-10);
}

const prompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `You are a helpful assistant who remembers all details the user shares with you.`,
    ],
    ["placeholder", "{chat_history}"],
    ["human", "{input}"],
]);

const chain = RunnableSequence.from([
    RunnablePassthrough.assign({
      chat_history: filterMessages,
    }),
    prompt,
    model,
]);

const messages = [
    new HumanMessage({ content: "hi! I'm bob" }),
    new AIMessage({ content: "hi!" }),
    new HumanMessage({ content: "I like vanilla ice cream" }),
    new AIMessage({ content: "nice" }),
    new HumanMessage({ content: "whats 2 + 2" }),
    new AIMessage({ content: "4" }),
    new HumanMessage({ content: "thanks" }),
    new AIMessage({ content: "No problem!" }),
    new HumanMessage({ content: "having fun?" }),
    new AIMessage({ content: "yes!" }),
    new HumanMessage({ content: "That's great!" }),
    new AIMessage({ content: "yes it is!" }),
];

const messageHistories: Record<string, InMemoryChatMessageHistory> = {};

const withMessageHistory = new RunnableWithMessageHistory({
    runnable: chain,
    getMessageHistory: async (sessionId) => {
        if (messageHistories[sessionId] === undefined) {
            const messageHistory = new InMemoryChatMessageHistory();
            await messageHistory.addMessages(messages);
            messageHistories[sessionId] = messageHistory;
        }
        return messageHistories[sessionId];
    },
    inputMessagesKey: "input",
    historyMessagesKey: "chat_history",
});

const config = {
    configurable: {
        sessionId: "abc4",
    }
};

export default async function run() {
    const response = await withMessageHistory.invoke(
        {
            input: "What's my name?",
        },
        config
    );
    
    console.log(response.content);
}

run();
