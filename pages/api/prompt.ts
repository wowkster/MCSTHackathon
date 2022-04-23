// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

type Data = {
    response: string
    dialogue: string
} | {
    error: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') res.status(405).json({
        error: 'Method Not Allowed'
    })

    let { message, clientDialogue } = req.body

    if (!message) res.status(400).json({
        error: 'Missing Required Fields'
    })

    let dialogue: string = clientDialogue ?? "The following is a conversation between a mental health chatbot named Olive and a student named User"

    const configuration = new Configuration({
        organization: "org-Q2nk90JMs4eksK0xZNOpvtfP",
        apiKey: process.env.OPENAI_API_KEY,
    })

    const openai = new OpenAIApi(configuration)

    dialogue += "\nUser: " + message + '\nOlive: ';

    const completion = await openai.createCompletion("text-davinci-002", {
        prompt: dialogue,
        temperature: 0.7,
        max_tokens: 2048
    })

    const output = completion.data!.choices![0]!.text!
    dialogue += output

    res.status(200).json({ response: output, dialogue })
}
