import { useEffect, useState } from "react";
import { DiaryEntry } from "./types";
import { getAllEntries } from "./services/diaryService";
import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";

const App = () => {
  const [diaryEntry, setDiaryEntry] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then((entries) => {
      setDiaryEntry(entries);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <EntryForm setDiaryEntry={setDiaryEntry} diaryEntry={diaryEntry} />
      <Entries diaryEntry={diaryEntry} />
    </div>
  );
};

export default App;
