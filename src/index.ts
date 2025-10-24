import "reflect-metadata";
import App from "./app";
import { UploadController } from "./controllers/upload.controller";
import { VehicleController } from "./controllers/vehicle.controller";
import { SparePartsController } from "./controllers/spareParts.controller";

const app = new App(
    [
        new UploadController(),
        new VehicleController(),  // Make sure to import VehicleController at the top
        new SparePartsController(), // Make sure to import SparePartsController at the top
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