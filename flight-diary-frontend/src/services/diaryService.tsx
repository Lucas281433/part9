import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "/api/diaries";

export const getAllEntries = async () => {
  const request = await axios.get<DiaryEntry[]>(baseUrl);
  return request.data;
};

export const createNewEntry = async (entry: NewDiaryEntry) => {
  const request = await axios.post<DiaryEntry>(baseUrl, entry);
  return request.data;
};
