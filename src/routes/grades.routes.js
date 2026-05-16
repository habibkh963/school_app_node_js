const router = require("express").Router();
const GradesController = require("../controllers/grades.controller");
const auth = require("../middlewares/auth.middlewares");
router.get("/", auth, GradesController.getAll);
router.get("/:id", auth, GradesController.getById);
router.post("/", auth, GradesController.create);
router.put("/:id", auth, GradesController.update);
router.delete("/:id", auth, GradesController.delete);

module.exports = router;