import express from "express";

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  averange: number;
}

interface MultiplyValues {
  value1: number;
  value2: number[];
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const value2 = args.slice(3).map((a) => Number(a));
  const value1 = Number(args[2]);

  if (value2.some(isNaN)) throw new Error("Provided values were not numbers!");

  if (isNaN(value1)) throw new Error("Provided target value is not a number");

  return {
    value1,
    value2,
  };
};

export const calculateExercises = (target: number, hours: number[]): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((h) => h !== 0).length;
  const hoursInPeriod = hours.reduce((acc, curr) => acc + curr, 0);
  const averange = hoursInPeriod / periodLength;
  const success = averange >= target ? true : false;
  let rating: number;
  let ratingDescription: string;
  if (averange >= target) {
    rating = 3;
    ratingDescription =
      "Excellent! You have achieved the target, keep working like this";
  } else if (averange < target && averange >= target / 2) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "You don't reach the target, you must try harder";
  }

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    averange,
  };

  return result;
};

try {
  const { value1, value2 } = parseArguments(process.argv);

  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Someting bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

const app = express();
app.use(express.json());

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).json({ error: "Parameters Missing" });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(isNaN) ||
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isNaN(target)
  ) {
    return res.status(400).json({ error: "Malformatted parameters" });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises);

  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
