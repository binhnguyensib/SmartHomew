import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: Boolean, required: true },
    type: {
        type: String,
        enum: ["light", "fan", "door", "camera"],
        required: true
    },
    value : {type: Number},
    unit :{type: String},
    isOnline: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
    lastActivity: { type: Date, default: Date.now }
});

const Device = mongoose.model("Device", deviceSchema);
export default Device;