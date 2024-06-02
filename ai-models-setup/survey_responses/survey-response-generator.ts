import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export default async function surveyResponseGenerator(system_msg, surveyQuestion: string): Promise<string> {
    const model = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-3.5-turbo",
        temperature: 1.2,
        topP: 1,
        frequencyPenalty: 0.25,
        presencePenalty: 0.25,
    });
    
    const surveyPrompt = await ChatPromptTemplate.fromMessages([
        [
            "system",
            "{system_msg}",
        ],
        ["human", "{query}"],
    ]).partial({
        system_msg,
    })

    const queryString = JSON.stringify(surveyQuestion);

    const chain = surveyPrompt.pipe(model);
    
    const response = await chain.invoke({ query: queryString });

    return response.content as string;
}