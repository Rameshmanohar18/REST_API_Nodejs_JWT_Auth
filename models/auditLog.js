import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema(
  {
    userId: String,
    action: String,
    route: String,
    method: String
  },
  {
    timestamps: true
  }
);

export default mongoose.model('AuditLog', auditSchema);
