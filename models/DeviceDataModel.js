import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    device: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
    type: {
        type: String,
        enum: ["temperature", "humidity", "motion", "light"],
    },
    value: { type: Number, required: true },
    unit: { type: String },
    timestamp: { type: Date, default: Date.now },
});

const DeviceData = mongoose.model("DeviceData", deviceSchema);
export default DeviceData;