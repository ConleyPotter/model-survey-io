import supabase from '../../utils/supabase/client'; // Assuming you have an auth module with signInWithEmail function


export default async function fetchResponsesForUser({ email, password }) {
    const { data: surveyResponses, error } = await supabase
        .from('survey_responses')
        .select('*')
        // .eq('creator', creator);

    if (error) {
        console.error('Error fetching survey responses:', error);
    } else if (surveyResponses === null) {
        throw new Error('No survey responses found');
    }

    return surveyResponses;
}