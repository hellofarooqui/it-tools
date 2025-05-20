import SupportTicket from "../models/SupportTicket.js";

export const getAllSupportTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find();
    res.json(tickets);
  } catch (error) {
    console.error("Error fetching support tickets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSupportTicketById = async (req, res) => {
  try {
    const ticket = await SupportTicket.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    console.error("Error fetching support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createSupportTicket = async (req, res) => {
  try {
    const { ticket_number, title, description } = req.body;
    if (!ticket_number || !title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newTicket = new SupportTicket({
      title,
      description,
      ticket_number // Example ticket number generation
    });

    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Error creating support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSupportTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    

    const updatedTicket = await SupportTicket.findByIdAndUpdate(
      ticketId,
      req.body,
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    res.json(updatedTicket);
  } catch (error) {
    console.error("Error updating support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSupportTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const deletedTicket = await SupportTicket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ error: "Support ticket not found" });
    }

    res.json({ message: "Support ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting support ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addCommentToSupportTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const { user, comment } = req.body;
    
        if (!user || !comment) {
        return res.status(400).json({ error: "User and comment are required" });
        }
    
        const updatedTicket = await SupportTicket.findByIdAndUpdate(
        ticketId,
        {
            $push: { comments: { user, comment } },
            $set: { updatedAt: Date.now() }
        },
        { new: true }
        );
    
        if (!updatedTicket) {
        return res.status(404).json({ error: "Support ticket not found" });
        }
    
        res.json(updatedTicket);
    } catch (error) {
        console.error("Error adding comment to support ticket:", error);
        res.status(500).json({ error: "Internal server error" });
    }       
}
