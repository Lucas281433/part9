import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Entry, NewEntry } from "../types";

const createEntry = async (object: NewEntry, id: string | undefined) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${id}/entries`,
    object
  );
  return data;
};

export default { createEntry };
