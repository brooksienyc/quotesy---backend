import { Router } from 'express'
import quoteRoutes from "./quote-routes.js"
const router = Router();

// router.use("/", require("./application.js"));
router.get("/", (req,res) => res.send("This is route"))
// router.use("/api/favorite", require("./fav-routes.js"));
router.use("/", quoteRoutes);

// router.all("*", (req, res) => {
//   res.status(400).send();
// });

export default router