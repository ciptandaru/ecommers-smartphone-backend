async function errorHandling(err, req, res, next) {
  console.log(err);
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "Unauthenticated":
      res.status(401).json({ message: "Invalid Access Token!" });
      break;
    case "loginInvalid":
      res.status(401).json({ message: "Username/Password invalid!" });
      break;
    case "Unauthorized":
      res.status(403).json({ message: "Forbidden, not enough access!" });
      break;
    case "NOT_FOUND":
      res.status(404).json({ message: "ID not Found!" });
      break;
    default:
      res.status(500).json({ message: "Internal Server Error!" });
      break;
  }
}

module.exports = errorHandling;
