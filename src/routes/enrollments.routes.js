const router = require("express").Router();
const EnrollmentController = require("../controllers/enrollments.controller");
const auth = require("../middlewares/auth.middlewares");


router.get("/", auth, EnrollmentController.getAll);
router.post("/", auth, EnrollmentController.create);
router.patch("/:id/status", auth, EnrollmentController.updateStatus);
router.delete("/:id", auth, EnrollmentController.delete);

module.exports = router;