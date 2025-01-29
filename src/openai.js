import { OpenAI } from 'openai';


const openai = new OpenAI({
    apiKey: "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", dangerouslyAllowBrowser: true
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