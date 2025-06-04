import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const { ADAFRUIT_USERNAME, ADAFRUIT_KEY } = process.env;
const AIO_BASE_URL = `https://io.adafruit.com/api/v2/${ADAFRUIT_USERNAME}/feeds`;

export const toggleLight = async (req, res) => {
  const { state } = req.body; //1 -> 0
  try {
    const response = await axios.post(`${AIO_BASE_URL}/bbc-led/data`, {
      value: state
    }, {
      headers: { 'X-AIO-Key': ADAFRUIT_KEY }
    });
    res.status(200).json({ message: `Đã gửi lệnh bật/tắt đèn: ${state}` });
    
  } catch (err) {
    res.status(500).json({ error: 'Không gửi được dữ liệu' });
  }
};

export const getTemperature = async (req, res) => {
  try {
    const response = await axios.get(`${AIO_BASE_URL}/bbc-temp/data/last`, {
      headers: { 'X-AIO-Key': ADAFRUIT_KEY }
    });
    res.status(200).json({ temperature: response.data.value });
    console.log(`Nhiệt độ hiện tại: ${response.data.value}°C`);
  } catch (err) {
    res.status(500).json({ error: 'Không lấy được nhiệt độ' });
  }
};

export const getHumidity = async (req, res) => {
  try {
    const response = await axios.get(`${AIO_BASE_URL}/bbc-humi/data/last`, {
      headers: { 'X-AIO-Key': ADAFRUIT_KEY }
    });
    res.status(200).json({ humidity: response.data.value });
    console.log(`Độ ẩm hiện tại: ${response.data.value}%`);
  } catch (err) {
    res.status(500).json({ error: 'Không lấy được độ ẩm' });
  }
}

export const setFanSpeed = async (req, res) => {
  const { speed } = req.body; //  0 -> 100
  try {
    await axios.post(`${AIO_BASE_URL}/bbc-fan/data`, {
      value: speed
    }, {
      headers: { 'X-AIO-Key': ADAFRUIT_KEY }
    });
    res.status(200).json({ message: `Đã gửi tốc độ quạt: ${speed}` });
  } catch (err) {
    res.status(500).json({ error: 'Không gửi được dữ liệu' });
  }
};

export const getTempChart = async (req, res) => {
  try {
    const response = await axios.get(`${AIO_BASE_URL}/bbc-temp/data/chart`, {
      headers: { 'X-AIO-Key': ADAFRUIT_KEY }
    });
    const chartData = response.data.map(entry => ({
      timestamp: entry.created_at,
      value: entry.value
    }));
    res.status(200).json(chartData);
  } catch (err) {
    res.status(500).json({ error: 'Không lấy được dữ liệu biểu đồ' });
  }
}
