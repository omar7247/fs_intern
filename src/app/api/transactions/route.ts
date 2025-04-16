// app/api/transactions/route.ts

import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/Transaction';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: Request) {
    try {
      await connectDB();
      const data = await req.json() as {
  description: string;
  amount: number;
  date: string;
};

      const newTransaction = await Transaction.create(data);
      return NextResponse.json(newTransaction);
    } catch (error: any) {
      console.error('POST error:', error);
      return new NextResponse(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }
  }
  
