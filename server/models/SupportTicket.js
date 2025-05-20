import mongoose from "mongoose";


const supportTicketSchema = new mongoose.Schema({
  ticket_number: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "in_progress", "closed"],
    default: "open",
  },
  comments : [
    {
      user: { type: String, required: true },
      comment: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});



const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

export default SupportTicket;
