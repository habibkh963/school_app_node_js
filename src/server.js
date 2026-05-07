require("dotenv").config();
const app = require("./app");
// Ensure all model associations are registered before sync
require("./models/index");
const sequelize = require("./config/db");
const PORT = process.env.PORT || 5000;
(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected");

        await sequelize.sync();
        console.log("✅ Models synced");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ DB Connection Error:", error);
    }
})();

