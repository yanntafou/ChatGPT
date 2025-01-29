import { OpenAI } from 'openai';


const openai = new OpenAI({
    apiKey: "APIKEYHERE", dangerouslyAllowBrowser: true
});


export async function sendMsgToOpenAI(message) {
    const res = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    // Extract the content of the first choice
    const response = res.choices[0].message.content

    const sections = response.split('###').map(section => section.trim());

    return sections.filter(section => section.length > 0);


}
