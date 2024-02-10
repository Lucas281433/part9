import { EntriesProps } from "../types";
import Entry from "./Entry";

const Entries = (props: EntriesProps) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {props.diaryEntry.map((entry) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default Entries;
