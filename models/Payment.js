import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  plan: {
    type: String,
    required: true,
    enum: ["code", "live", "mock"],
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  userName: String,
  paymentMethod: String,
  transactionId: {
    type: String,
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add compound index to prevent duplicate payments
PaymentSchema.index(
  { transactionId: 1, userName: 1 },
  { unique: true, sparse: true }
);

export default mongoose.models.Payment ||
  mongoose.model("Payment", PaymentSchema);
