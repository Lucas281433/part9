import {
  Diagnosis,
  Gender,
  HealthCheckRating,
  NewEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  NewPatientEntry,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupatin: " + occupation);
  }
  return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newEntry;
  }
  throw new Error("Incorrect data: some fields are missing");
};



const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error("Incorrect or missing description: " + description);
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error("Incorrect or missing specialist: " + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Diagnosis["code"][] => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    return [] as Diagnosis["code"][];
  }

  return object.diagnosisCodes as Diagnosis["code"][];
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (typeof rating !== "number" || !isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check ratio: " + rating);
  }
  return rating;
};

const isNewHealthCheckEntry = (object: { type: unknown }): object is NewHealthCheckEntry => {
  return object.type === "HealthCheck" && "healthCheckRating" in object;
};

const isNewHospitalEntry = (object: { type: unknown }): object is NewHospitalEntry => {
  return object.type === "Hospital" && "discharge" in object;
};

const isNewOccupationalHealthcareEntry = (
  object: { type: unknown }
): object is NewOccupationalHealthcareEntry => {
  return object.type === "OccupationalHealthcare" && "employerName" in object;
};

const isType = (
  value: unknown
): value is "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
  return (
    value === "HealthCheck" ||
    value === "Hospital" ||
    value === "OccupationalHealthcare"
  );
};

const parseType = (
  type: unknown
): "HealthCheck" | "Hospital" | "OccupationalHealthcare" => {
  if (!isType(type) || !isString(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type as "HealthCheck" | "Hospital" | "OccupationalHealthcare";
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria)) {
    throw new Error("Incorrect or missing criteria: " + criteria);
  }
  return criteria;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName)) {
    throw new Error("Incorrect or missing employerName: " + employerName);
  }
  return employerName;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "date" in object &&
    "description" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const newBaseEntry = {
      date: parseDate(object.date),
      description: parseDescription(object.description),
      specialist: parseSpecialist(object.specialist),
    };

    const type = parseType(object.type);

    switch (type) {
      case "HealthCheck":
        if (isNewHealthCheckEntry(object)) {
          return {
            ...newBaseEntry,
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
          };
        }
        break;
      case "Hospital":
        if (isNewHospitalEntry(object)) {
          return {
            ...newBaseEntry,
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: "Hospital",
            discharge: {
              date: parseDate(object.discharge.date),
              criteria: parseCriteria(object.discharge.criteria)
            },
          };
        }
        break;
      case "OccupationalHealthcare":
        if (isNewOccupationalHealthcareEntry(object)) {
          return {
            ...newBaseEntry,
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            type: "OccupationalHealthcare",
            employerName: parseEmployerName(object.employerName),
            sickLeave: {
              startDate: parseDate(object.sickLeave?.startDate),
              endDate: parseDate(object.sickLeave?.endDate)
            },
          };
        }
        break;
      default:
        throw new Error("Incorrect entry type");
    }
  }
  throw new Error("Incorrect data: some fields are missing");
};
