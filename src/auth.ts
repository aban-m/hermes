const validateKey = (key: string) => {
  return !process.env.ACCESS_KEY || key === process.env.ACCESS_KEY;
};

export function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer") {
    return res.status(403).json({ error: "Invalid scheme" });
  }

  if (!validateKey(token)) {
    return res.status(403).json({ error: "Invalid token" });
  }

  next();
}
