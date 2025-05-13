import mongoose from "mongoose";

const RMATicketSchema = new mongoose.Schema({
  rmaNumber: {
    type: String,
    required: true,
    unique: true,
  },
  deviceName: {
    type: String,
    required: true,
  },
    deviceSerialNumber: {
        type: String,
        required: true,
    },
    requestedOn: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["New","Pending", "Approved", "Rejected"],
        default: "New",
    },
    reason: {
        type: String,
        required: true,
    }});

const RMATicket = mongoose.model("RMATicket", RMATicketSchema);
export default RMATicket;

