import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Payment from "../../../../models/Payment";

export async function POST(request) {
  try {
    // Parse the request body
    const paymentData = await request.json();

    // Validate required fields
    if (!paymentData.plan || !paymentData.status) {
      return NextResponse.json(
        { error: "Missing required payment information" },
        { status: 400 }
      );
    }

    // Connect to MongoDB using our shared connection
    await dbConnect();

    // First check if a payment with the same transaction ID already exists
    if (paymentData.transactionId) {
      const existingPaymentByTransactionId = await Payment.findOne({
        transactionId: paymentData.transactionId,
      });

      if (existingPaymentByTransactionId) {
        // If the same transaction ID exists, return that payment ID to prevent duplicates
        return NextResponse.json({
          success: true,
          paymentId: existingPaymentByTransactionId._id.toString(),
          message: "Payment with this transaction ID already exists",
          duplicate: true,
        });
      }
    }

    // Check if a similar payment already exists to prevent duplicates
    // Checking by plan, amount, userName and within recent timeframe (30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const existingPayment = await Payment.findOne({
      plan: paymentData.plan,
      amount: paymentData.amount,
      userName: paymentData.userName,
      createdAt: { $gte: thirtyMinutesAgo },
    });

    if (existingPayment) {
      // Return the existing payment ID if a similar recent payment exists
      return NextResponse.json({
        success: true,
        paymentId: existingPayment._id.toString(),
        message: "Payment already processed",
        duplicate: true,
      });
    }

    // Create a new payment document
    const payment = new Payment({
      ...paymentData,
      createdAt: new Date(),
    });

    // Save the payment to get a MongoDB ID
    const savedPayment = await payment.save();

    // Return success response with the MongoDB-generated ID
    return NextResponse.json({
      success: true,
      paymentId: savedPayment._id.toString(),
      message: "Payment data saved successfully",
    });
  } catch (error) {
    console.error("Error storing payment data:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}
