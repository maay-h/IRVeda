import jwt from "jsonwebtoken";

export const JWT_SECRET = process.env.JWT_SECRET || "irveda-dev-secret-change-me";

export function signToken(staff) {
  return jwt.sign(
    { id: staff.id, email: staff.email, role: staff.role, name: staff.name },
    JWT_SECRET,
    { expiresIn: "12h" }
  );
}

export function authRequired(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next({ status: 401, message: "Authentication required" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    next({ status: 401, message: "Invalid or expired token" });
  }
}

export function roleGuard(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next({ status: 403, message: "Insufficient permissions" });
    }
    next();
  };
}

export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

export function handleError(err, _req, res, _next) {
  const status = err.status || 500;
  const message = err.status ? err.message : "Something went wrong";
  if (!err.status) console.error(err);
  res.status(status).json({ error: message });
}
