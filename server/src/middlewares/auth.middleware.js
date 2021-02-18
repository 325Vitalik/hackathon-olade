import { firebase } from "../services/firebase.service";

const authMiddleware = (request, response, next) => {
    const headerToken = request.headers.authorization;
    if (!headerToken) {
        return response.status(401).send({ message: "No token provided" });
    }

    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
        response.status(401).send({ message: "Invalid token" });
    }

    const token = headerToken.split(" ")[1];
    firebase
        .auth()
        .verifyIdToken(token)
        .then(() => next())
        .catch(() => response.status(403).send({ message: "Could not authorize" }));
};

export { authMiddleware };
