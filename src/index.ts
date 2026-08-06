import express, { type Request, type Response } from "express";

// import middlewares
import morgan from "morgan";

// import Router
import User_Router from "./routes/usersRoutes.ts";
import Item_Router from "./routes/itemsRoutes.ts";

const app = express();
const port = 3000;

// body parser middleware
app.use(express.json());

// logger middleware
app.use(morgan("dev"));
// app.use(morgan("combined"));

// Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Quiz #2 - API service");
});

app.get("/me", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Quiz #2 - API service",
  });
});

app.get("/myInfo", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Student Information",
    data : {
        studentId : "680610695",
        firstname : "Parawin",
        lastname : "Pitaleemaporn",
        section : "001",
      }
  });
});

app.use("/api/v695/auth", User_Router);
app.use("/api/v695/basket", Item_Router);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});

// Export app for vercel deployment
export default app;
