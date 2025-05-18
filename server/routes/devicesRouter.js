import express from 'express';
import {deviceImageUpload} from '../middleware/uploadImage.js';
import { getAllDevices,getDeviceById,createDevice,updateDevice,deleteDevice,searchDevices } from '../controllers/devicesController.js';

const router = express.Router();

router.get('/', getAllDevices);
router.get('/:deviceId', getDeviceById);
router.post('/new', deviceImageUpload ,createDevice);
router.put('/update/:deviceId', updateDevice);
router.delete('/delete/:deviceId', deleteDevice);
router.get('/search/:query', searchDevices);

export default router;