import express from 'express';
import { createRMATicket, deleteRMATicket, getAllRMATickets, getRMAbyNumber, updateRMATicket } from '../controllers/rmaController.js';

const router = express.Router();

router.get('/',getAllRMATickets);

router.get('/:rmanumber', getRMAbyNumber)

router.post('/new', createRMATicket);

router.put('/update/:rmanumber', updateRMATicket )

router.delete('/delete/:id', deleteRMATicket);


export default router;


