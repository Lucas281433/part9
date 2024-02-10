import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height || isNaN(weight) || isNaN(height)) {
    return res.status(400).json({ error: "Malformatted parameters" });
  }

  const result = calculateBmi(height, weight);
  
  return res.send({
    weight,
    height,
    BMI: result,
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
