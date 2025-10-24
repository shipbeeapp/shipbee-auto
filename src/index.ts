import "reflect-metadata";
import App from "./app";
import { UploadController } from "./controllers/upload.controller";

const app = new App(
    [
        new UploadController(),
    ],
);

app.initializeDataSource()
.then(async () => {
  console.log("Data Source initialized successfully!")
  app.listen();
  console.log("Server is listening for requests...");
})
.catch((err) => {
  console.error("Failed to initialize app:", err);
});