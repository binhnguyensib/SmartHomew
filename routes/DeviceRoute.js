import express from 'express';
import { toggleLight, getTemperature, setFanSpeed } from '../controllers/DeviceController.js'

const router = express.Router();

router.post('/light', toggleLight);
router.get('/temperature', getTemperature);
router.post('/fan', setFanSpeed);

export default router;
