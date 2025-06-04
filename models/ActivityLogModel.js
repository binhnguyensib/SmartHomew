import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
  action: { type: String, required: true },  // 'turn_on', 'turn_off', 'adjust'...
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  value: { type: mongoose.Schema.Types.Mixed }, // Giá trị thiết lập mới
  timestamp: { type: Date, default: Date.now }
});


activityLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 14 * 24 * 60 * 60 });

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;