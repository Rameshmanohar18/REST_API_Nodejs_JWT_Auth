import AuditLog from '../models/auditLog.js';

const auditMiddleware = async (req, res, next) => {
  await AuditLog.create({
    userId: req.user?.id,
    action: 'API_CALL',
    route: req.originalUrl,
    method: req.method
  });

  next();
};

export default auditMiddleware;
