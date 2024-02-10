import { Diagnosis } from "../types";
import diagnoses from '../../data/dataDiagnoses';

const getDiagnosis = (): Diagnosis [] => {
    return diagnoses;
};

export default { getDiagnosis };
