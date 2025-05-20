import express from 'express';
import { addCommentToSupportTicket, createSupportTicket, deleteSupportTicket, getAllSupportTickets, getSupportTicketById, updateSupportTicket } from '../controllers/supportTicketController.js';


const router = express.Router();

router.get('/', getAllSupportTickets);
router.get('/:ticketId', getSupportTicketById);
router.post('/', createSupportTicket);
router.put('/:ticketId', updateSupportTicket);
router.delete('/:ticketId', deleteSupportTicket);   
router.post('/:ticketId/addComment', addCommentToSupportTicket);

export default router;