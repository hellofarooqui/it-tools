import express from 'express';
import { createRMATicket, deleteRMATicket, getAllRMATickets, updateRMATicket } from '../controllers/rmaController.js';

const router = express.Router();

router.get('/',getAllRMATickets);

router.post('/new', createRMATicket);

router.put('/update/:id', updateRMATicket )

router.delete('/delete/:id', deleteRMATicket);


export default router;


