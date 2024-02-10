export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export interface EntryProps {
  entry: DiaryEntry;
}

export interface EntriesProps {
  diaryEntry: DiaryEntry[];
}

export interface EntryFormProps {
  setDiaryEntry: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
  diaryEntry: DiaryEntry[];
}

export interface NotificationProps {
  message: string;
}
