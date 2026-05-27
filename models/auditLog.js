const mongoose = require('mongoose');

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

module.exports = mongoose.model('AuditLog', auditSchema);