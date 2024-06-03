export const prompt = `Create an example of fictitious spiritual coaches and course creator. 
I need you to describe the products and services, ideal clients, brand, mission, values, and goals 
of each fictitious spiritual coach and/or course creator. Your output should be in 
"you statements," as in: "your missions is to..." or "you offer a range of services..."`

export const prompts = {
    productsAndServices: `Create an example of fictitious spiritual coaches and course creator. 
    Describe the products and services offered by the coach.`,
    idealClients: `Create an example of fictitious spiritual coaches and course creator.
    Describe the ideal clients of the coach.`,
    brand: `Create an example of fictitious spiritual coaches and course creator.
    Describe the brand of the coach.`,
    mission: `Create an example of fictitious spiritual coaches and course creator.
    Describe the mission of the coach.`,
    values: `Create an example of fictitious spiritual coaches and course creator.
    Describe the values of the coach.`,
    goals: `Create an example of fictitious spiritual coaches and course creator.
    Describe the coach's business goals.`,
}

export const examplesObject = {
    productsAndServicesExample: [
        {
            input: prompts.productsAndServices,
            output: `You offer a range of services including one-on-one spiritual coaching sessions, 
            group workshops on mindfulness and meditation, online courses in intuitive 
            development, and retreats focused on inner peace and emotional healing. 
            Your services are designed to help clients connect with their higher 
            selves and find balance in their lives.`,
        },
        {
            input: prompts.productsAndServices,
            output: `You offer comprehensive spiritual courses that 
            cover topics such as chakra healing, energy work, 
            astral projection, and past life regression. 
            In addition, you provide certification programs for those looking to 
            become spiritual coaches themselves, along with personalized 
            mentoring sessions.`,
        },
        {
            input: prompts.productsAndServices,
            output: `You offer personalized spiritual guidance sessions, soul 
            purpose discovery programs, and workshops on spiritual awakening 
            and manifestation. Additionally, you provide guided meditations 
            and spiritual mentorship programs aimed at helping clients 
            navigate their spiritual journeys.`,
        },
    ],
    idealClientsExample: [
        {
            input: prompts.idealClients,
            output: `Your ideal clients are individuals who are feeling overwhelmed by life's
                challenges and are seeking deeper meaning and purpose. They are open-minded 
                and eager to explore their spiritual side, looking for guidance in 
                developing their intuition and achieving personal growth.`,
        },
        {
            input: prompts.idealClients,
            output: `Your ideal clients are spiritually curious individuals who are
                ready to dive deep into metaphysical studies. They are committed to 
                personal and spiritual growth, seeking knowledge and tools to raise 
                their vibration and assist others on their spiritual paths.`,
        },
        {
            input: prompts.idealClients,
            output: `Your ideal clients are individuals who feel lost or disconnected 
            and are seeking guidance to discover their true purpose. 
            They are ready to embrace change and are committed to living a more spiritually aligned life.`,
        },
    ],
    brandExample: [
        {
            input: prompts.brand,
            output: `Your brand is all about calmness, clarity, and connection. With a serene
                and nurturing aesthetic, your brand evokes feelings of peace and tranquility, 
                providing a safe space for clients to embark on their spiritual journey.`,
        },
        {
            input: prompts.brand,
            output: `Your brand embodies wisdom, enlightenment, and transformation. With 
                a mystical and ethereal vibe, your brand speaks to those who are on 
                a quest for higher knowledge and spiritual ascension.`,
        },
        {
            input: prompts.brand,
            output: `Your brand radiates warmth, inspiration, and empowerment. With 
                a focus on personal transformation and spiritual alignment, your 
                brand appeals to those looking for a heartfelt and supportive spiritual guide.`,
        },
    ],
    missionExample: [
        {
            input: prompts.mission,
            output: `Your mission is to guide individuals towards inner peace and spiritual
                enlightenment by helping them unlock their intuitive abilities and 
                embrace their true selves.`,
        },
        {
            input: prompts.mission,
            output: `Your mission is to empower individuals to awaken their spiritual 
                potential and elevate their consciousness through comprehensive 
                education and transformative experiences.`,
        },
        {
            input: prompts.mission,
            output: `Your mission is to help individuals uncover their soul’s purpose 
                and live a life of alignment and fulfillment through spiritual
                guidance and mentorship.`,
        },
    ],
    valuesExample: [
        {
            input: prompts.values,
            output: `You value authenticity, compassion, and personal growth. You believe 
                in the power of self-discovery and the importance of creating 
                a supportive community for those on a spiritual path.`,
        },
        {
            input: prompts.values,
            output: `You value knowledge, transformation, and empowerment. You 
                believe that everyone has the potential to achieve spiritual 
                greatness and that education is key to unlocking that potential.`,
        },
        {
            input: prompts.values,
            output: `You value authenticity, empowerment, and transformation. You believe 
                in the importance of living in alignment with one’s true self and the 
                power of spiritual guidance in facilitating this journey.`,
        },
    ],
    goalsExample: [
        {
            input: prompts.goals,
            output: `Your goals are to expand your online course offerings, increase the 
                number of clients you serve through retreats and workshops, and 
                build a vibrant, supportive online community where individuals 
                can share their journeys and support each other's growth.`,
        },
        {
            input: prompts.goals,
            output: `Your goals include expanding your certification programs, 
                establishing a global network of certified spiritual coaches, 
                and creating advanced courses that delve deeper into esoteric 
                topics to cater to the needs of advanced practitioners.`,
        },
        {
            input: prompts.goals,
            output: `Your goals are to expand your reach through online platforms, increase 
                the number of mentorship clients, and develop a series of guided 
                meditation recordings that can be accessed globally to support 
                individuals on their spiritual paths.`,
        },
    ],
};
