import express from 'express';
import { toggleLight, getTemperature, setFanSpeed, getHumidity } from '../controllers/DeviceController.js'

const router = express.Router();

router.post('/light', toggleLight);
router.get('/temperature', getTemperature);
router.get('/humi', getHumidity);
router.post('/fan', setFanSpeed);

export default router;
