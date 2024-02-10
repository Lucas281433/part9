export type CategoryBMI =
  | "Underweight (Severe thinness)"
  | "Underweight (Moderate thinness"
  | "Underweight (Mild thinness)"
  | "Normal (Healthy weight)"
  | "Owerweight (Pre-obese)"
  | "Obese (Class 1)"
  | "Obese (Class 2)"
  | "Obese (Class 3)";

interface MultiplyValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): CategoryBMI => {
  const heightInCm = (height / 100) ** 2;
  const bmi = weight / heightInCm;

  if (heightInCm === 0) {
    throw new Error("Can't divide by 0!!!!");
  }

  let category: CategoryBMI;

  if (bmi < 16.0) {
    return category = "Underweight (Severe thinness)";
  } else if (bmi < 16.9 && bmi > 16.1) {
    return category = "Underweight (Moderate thinness";
  } else if (bmi < 18.4 && bmi > 17.0) {
    return category = "Underweight (Mild thinness)";
  } else if (bmi < 24.9 && bmi > 18.5) {
    return category = "Normal (Healthy weight)";
  } else if (bmi < 29.9 && bmi > 25.0) {
    return category = "Owerweight (Pre-obese)";
  } else if (bmi < 34.9 && bmi > 30.0) {
    return category = "Obese (Class 1)";
  } else if (bmi < 39.9 && bmi > 35.0) {
    return category = "Obese (Class 2)";
  } else if (bmi >= 40) {
    return category = "Obese (Class 3)";
  } else {
    throw new Error("An error occurred when calculating the bmi");
  }
  return category;
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "Someting bad happened";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
