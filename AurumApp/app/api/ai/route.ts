/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    // Process the message using OpenAI
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "you can extract word from a text, focus in amount and currency symbols." },
            {
                role: "user",
                content: `Extract only the numeric amount and currency symbol from the following text and return them as a structured string in the format amount=[amount],symbol=[currency]. Ignore all other parts of the text. here its the text: ${message}. `,
            },
        ],  
    });

    // Extract the response from the OpenAI completion
    const response = completion.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing message with OpenAI:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
  }
}
