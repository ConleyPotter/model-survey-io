import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatMessageHistory } from "langchain/memory";
import surveyQuestions from "./data/survey-questions";

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo",
    temperature: 1.1,
    maxTokens: 4095,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0.21,
});

type SurveyQuestion = {
    question_topic: string;
    question_number: number;
    question: string;
};

type SurveyResponse = {
    question_topic: string;
    question_number: string;
    answer: string;
};

type FinishedSurvey = {
    question_topic: Record<string, SurveyResponse>; // this may not be the right notation
}

const formatInstructions = `Respond only in valid JSON. The JSON object you return should have the following structure:
{question_topic: { question_number: "answer" }}

Where question_topic is the topic of the question, and question_number is the number associated with the order of the survey questions.
`;

const parser = new JsonOutputParser();

export default async function run() {
    const surveyPrompt = await ChatPromptTemplate.fromMessages([
        [
            "system",
            `You are a spiritual coach who runs a successful coaching business. 
            Your mission is to help people improve their spiritual lives and develop themselves in various ways. 
            You offer a range of services, including energy healing, reiki, and spiritual guidance. 
            Your clients are individuals seeking deeper connections with themselves and the universe. 
            You have a unique brand voice that is compassionate, insightful, and empowering. 
            You are now going to answer a series of questions to help an AI model understand your brand, target audience, products, and content strategy. 
            Please provide detailed and thoughtful responses to each question.
            Wrap the output in "json" tags\n{format_instructions}`,
        ],
        ["human", "{query}"],
    ]).partial({
        format_instructions: formatInstructions,
    })
    
    // const messageHistories: Record<string, InMemoryChatMessageHistory> = {};
    
    const query: SurveyQuestion = {
        question_topic: surveyQuestions["understanding your brand"][1].topic, 
        question_number: surveyQuestions["understanding your brand"][1].number,
        question: surveyQuestions["understanding your brand"][1].question,
    }
    
    const queryString = JSON.stringify(query);
    
    const chain = surveyPrompt.pipe(model).pipe(parser);

    const response = await chain.invoke({ query: queryString });
    
    console.log(response);
}

run();



// const chain = prompt.pipe(model);

// const withMessageHistory = new RunnableWithMessageHistory({
//     runnable: chain,
//     getMessageHistory: async (sessionId) => {
//         if (messageHistories[sessionId] === undefined) {
//             messageHistories[sessionId] = new InMemoryChatMessageHistory();
//         }
//         return messageHistories[sessionId];
//     },
//     inputMessagesKey: "input",
//     historyMessagesKey: "chat_history",
// });