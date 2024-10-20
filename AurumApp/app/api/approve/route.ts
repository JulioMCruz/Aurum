/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';

// type ApprovalRequest = {
//   amount: number;
//   currency: string;
//   userId: string;
// };

// type ApprovalResponse = {
//   success: boolean;
//   transactionId: string;
//   amount: number;
//   currency: string;
//   timestamp: string;
//   userId: string;
// };

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Call the external API
    const apiResponse = await fetch('http://18.195.116.92:3002/NewDeposit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!apiResponse.ok) {
      throw new Error(`API request failed with status ${apiResponse.status}`);
    }

    const response = await apiResponse.json();

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing deposit request:', error);
    return NextResponse.json({ error: 'Failed to process deposit request' }, { status: 500 });
  }
}
