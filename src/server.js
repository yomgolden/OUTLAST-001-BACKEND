/*
=====================================
GLOBAL ERROR HANDLERS
=====================================
*/

process.on(
  "uncaughtException",
  (err) => {

    console.error(
      "UNCAUGHT EXCEPTION:",
      err
    );
  }
);

process.on(
  "unhandledRejection",
  (err) => {

    console.error(
      "UNHANDLED REJECTION:",
      err
    );
  }
);

/*
=====================================
ENV
=====================================
*/

require("dotenv").config();

/*
=====================================
IMPORTS
=====================================
*/

const http =
  require("http");

const connectDB =
  require("./config/db");

const app =
  require("./app");

/*
=====================================
CONFIG
=====================================
*/

const PORT =
  process.env.PORT || 3000;

/*
=====================================
START SERVER
=====================================
*/

const startServer =
  async () => {

    try {

      /*
      ============================
      CONNECT DATABASE
      ============================
      */

      await connectDB();

      console.log(
        "DATABASE CONNECTED"
      );

      /*
      ============================
      CREATE HTTP SERVER
      ============================
      */

      const server =
        http.createServer(app);

      server.listen(
        PORT,
        () => {

          console.log(
            `OUTLAST running on port ${PORT}`
          );
        }
      );

      /*
      ============================
      SERVER ERROR
      ============================
      */

      server.on(
        "error",
        (err) => {

          console.error(
            "SERVER ERROR:",
            err
          );
        }
      );

    } catch (err) {

      console.error(
        "STARTUP ERROR:",
        err
      );

      process.exit(1);
    }
  };

/*
=====================================
BOOT
=====================================
*/

startServer();
