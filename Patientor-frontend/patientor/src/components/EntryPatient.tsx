import { Diagnosis, Entry } from "../types";

import Hospital from "./Hospital";
import HealthCheck from "./HealthChek";
import OccupationalHealthcare from "./OccupationalHealthcare";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryPatient = ({ entry, diagnoses }: Props) => {

  const assertNever = (value: never): never => {
    throw new Error(`Type unknow ${JSON.stringify(value)}`);
  };

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} getDiagnosisName={getDiagnosisName} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcare
          entry={entry}
          getDiagnosisName={getDiagnosisName}
        />
      );
    default:
      return assertNever(entry.type);
  }
};

export default EntryPatient;
