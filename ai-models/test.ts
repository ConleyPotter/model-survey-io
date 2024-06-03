import generateRagChain from "./llms/generate-rag-chain";
import { users } from "../data/dummy-users";

async function run(question: string) {
    const user = users[5];
    const chain = await generateRagChain(user)
    const response = await chain.invoke(question);

    console.log(response);
    return response;
}

run("Describe the coach's brand."); // returns a response