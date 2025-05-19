import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    // Connect to database
    const db = await dbConnect();

    // Get payment details from the database
    const payment = await db.collection("payments").findOne({ paymentId: id });

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    // Return payment details
    return NextResponse.json({
      transactionId: payment.transactionId,
      amount: payment.amount,
      paymentDate: payment.paymentDate,
      plan: payment.plan,
      status: payment.status,
      userName: payment.userName,
    });
  } catch (error) {
    console.error("Error retrieving payment details:", error);
    return NextResponse.json(
      { error: "Failed to retrieve payment details" },
      { status: 500 }
    );
  }
}
