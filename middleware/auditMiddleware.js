const AuditLog = require('../models/AuditLog');

module.exports = async (req, res, next) => {
  await AuditLog.create({
    userId: req.user?.id,
    action: 'API_CALL',
    route: req.originalUrl,
    method: req.method
  });

  next();
};