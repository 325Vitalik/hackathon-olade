export function validationMiddleware(req, res, next) {
  if (req.body.name) {
    throw new Error("");
  }
}
