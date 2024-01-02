const express = require("express");
const { port } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const router = require("./routes/index");
let app = express();
const cors = require("cors");

const startServer = () => {
  const allowedOrigins = [
    "http://localhost:5174",
    "http://localhost:5173",
    "http://your-production-frontend-url",
  ];

  app.use(cors());
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );
  app.use("/api", router);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

// Check if the script is the main module
if (require.main === module) {
  startServer();
}
