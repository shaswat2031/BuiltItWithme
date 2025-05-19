import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    // Get payment ID from query parameters
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("id");
    const planType = searchParams.get("plan") || "live"; // Default to 'live' if not specified

    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment ID is required",
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();
    const db = mongoose.connection;

    // Find payment by ID
    const payment = await db.collection("payments").findOne({
      _id: mongoose.Types.ObjectId.isValid(paymentId)
        ? new mongoose.Types.ObjectId(paymentId)
        : paymentId,
    });

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment not found",
        },
        { status: 404 }
      );
    }

    // Verify that payment plan is valid for the requested resource
    const planIsValid =
      payment.plan === planType ||
      payment.plan === "mock" || // Mock allows access to everything
      (payment.plan === "live" && planType === "code"); // Live includes code access

    if (!planIsValid) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment plan does not match required access",
        },
        { status: 403 }
      );
    }

    // Return payment details
    return NextResponse.json({
      success: true,
      paymentDetails: {
        id: payment._id.toString(),
        plan: payment.plan,
        date: payment.paymentDate || payment.createdAt,
        userName: payment.userName || "User",
        amount: payment.amount,
        transactionId: payment.transactionId,
        status: payment.status,
      },
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to verify payment",
      },
      { status: 500 }
    );
  }
}
