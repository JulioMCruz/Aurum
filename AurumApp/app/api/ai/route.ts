/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json();

  // Here you would typically process the message and generate a response
  // For this example, we'll just return mock data
  const mockResponse = {
    sentiment: "positive",
    intent: "inquiry",
    category: "finance",
    response: "Thank you for your message. How can I assist you with your financial inquiry today?"
  };

  return NextResponse.json(mockResponse);
}
