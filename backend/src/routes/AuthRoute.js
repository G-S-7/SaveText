import {Signup, Login} from "../controllers/AuthController.js";
import { userVerification } from "../middleware/AuthMiddleware.js";
import router from "express";
const authRoute = router.Router();

authRoute.post("/signup", Signup);
authRoute.post('/login', Login)
authRoute.post('/',userVerification)

export default authRoute;