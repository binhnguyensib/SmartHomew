import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { ADAFRUIT_USERNAME, ADAFRUIT_KEY } = process.env;
const AIO_BASE_URL = `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds`;

export const toggleLight = async (req, res) => {
  const { state } = req.body; // "on" hoặc "off"
  try {
    const response = await axios.post(`${AIO_BASE_URL}/bbc-led/data`, {
      value: state
    }, {
      headers: { 'X-AIO-Key': ADAFRUIT_KEY }
    });
    console.log("Response from Adafruit:", response.data);
    res.json({ message: `Đã gửi lệnh bật/tắt đèn: ${state}` });
  } catch (err) {
    console.log("ADAFRUIT_USERNAME:", ADAFRUIT_USERNAME);
    console.log("ADAFRUIT_KEY:", ADAFRUIT_KEY);
    res.status(500).json({ error: 'Không gửi được dữ liệu' });
  }
};

export const getTemperature = async (req, res) => {
  try {
    const response = await axios.get(`${AIO_BASE_URL}/temperature/data/last`, {
      headers: { 'X-AIO-Key': ADAFRUIT_KEY }
    });
    res.json({ temperature: response.data.value });
  } catch (err) {
    res.status(500).json({ error: 'Không lấy được nhiệt độ' });
  }
};

export const setFanSpeed = async (req, res) => {
  const { speed } = req.body; // ví dụ: 0 → 100
  try {
    await axios.post(`${AIO_BASE_URL}/bbc-fan/data`, {
      value: speed
    }, {
      headers: { 'X-AIO-Key': ADAFRUIT_KEY }
    });
    res.json({ message: `Đã gửi tốc độ quạt: ${speed}` });
  } catch (err) {
    res.status(500).json({ error: 'Không gửi được dữ liệu' });
  }
};
