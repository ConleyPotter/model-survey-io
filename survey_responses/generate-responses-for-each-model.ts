import supabase, { signInWithEmail, signOut } from "../../utils/supabase/client";
import { surveyQuestions } from "../../data/survey-questions";
import surveyResponseGenerator from "./survey-response-generator";
import { users } from "../../data/dummy-users";

export default async function generateResponsesForModels() {
    const { data, error } = await supabase
        .from("system_inputs")
        .select("system_msg")

    if (error) console.log(error);

    data!.forEach(async (system_msg_object, i) => {
        const { email, password } = users[i];
        const creator = await signInWithEmail(email, password);
        
        const system_msg = system_msg_object.system_msg;

        surveyQuestions.forEach((topic_grouping) => {
            const topic = { topic_grouping };
            topic_grouping.questions.forEach(async ({ number, question }) => {

                await surveyResponseGenerator(system_msg, question).then(async answer => {
                    const { error } = await supabase
                        .from('survey_responses')
                        .insert(
                            {
                                answer,
                                question,
                                question_number: number, //you'll want to change the name of the database column later for consistency
                                creator,
                                topic,
                            }
                        );

                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Response generated. ", answer);
                    }
                });
            });
        });

        await signOut();
    });
}

generateResponsesForModels()