import { ChatOpenAI } from "@langchain/openai";
import { 
    ChatPromptTemplate, 
    FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";

import { prompt, examples } from "./few-shot-examples";

export default async function customerPersonaGenerator(): Promise<string> {
    const model = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        model: "gpt-3.5-turbo",
        temperature: 1.2,
        topP: 1,
        frequencyPenalty: 0.25,
        presencePenalty: 0.25,
    });
    
    const examplePrompt = ChatPromptTemplate.fromMessages([
        ["human", "{input}"],
        ["ai", "{output}"],
    ]);

    const fewShotPrompt: ChatPromptTemplate = new FewShotChatMessagePromptTemplate({
        examplePrompt,
        examples,
        inputVariables: [],
    }) as unknown as ChatPromptTemplate;

    const finalPrompt = ChatPromptTemplate.fromMessages([
        ["system", "You are an AI prompt engineer"],
        fewShotPrompt,
        ["human", "{input}"],
    ]);

    const chain = finalPrompt.pipe(model);

    const response = await chain.invoke({ input: prompt });

    return response.content as string;
}