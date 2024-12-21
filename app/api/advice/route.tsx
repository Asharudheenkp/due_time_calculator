import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Advices from '@/lib/models/advices'


export async function GET() {
  try {
    await connect();
    const randomAdvice = await Advices.aggregate([
      { $sample: { size: 1 } }
    ]);

    if (!randomAdvice || randomAdvice.length === 0) {
      return new NextResponse("No advice found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(randomAdvice[0]));
  } catch (error: any) {
    return new NextResponse("Error in fetching advice: " + error.message, { status: 500 });
  }
}
