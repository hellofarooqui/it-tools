import express from 'express';
import {deviceImageUpload} from '../middleware/uploadImage.js';
import { getAllDevices,getDeviceById,createDevice,updateDevice,deleteDevice,searchDevices } from '../controllers/devicesController.js';
import { addDeviceType, getAllDeviceTypes, updateDeviceType, deleteDeviceType, getDeviceTypeById } from '../controllers/deviceTypeController.js';

const router = express.Router();

router.get('/', getAllDevices);
router.get('/:deviceId', getDeviceById);
router.post('/new', deviceImageUpload ,createDevice);
router.put('/update/:deviceId', updateDevice);
router.delete('/delete/:deviceId', deleteDevice);
router.get('/search/:query', searchDevices);

router.post('/type/new', addDeviceType);
router.get('/type', getAllDeviceTypes);
router.put('/type/:deviceTypeId', updateDeviceType);
router.delete('/type/:deviceTypeId', deleteDeviceType);
router.get('/type/:deviceTypeId', getDeviceTypeById);



export default router;