import { EntryProps } from "../types";

const Entry = (props: EntryProps) => {
  return (
    <div>
      <p>
        <strong>{props.entry.date}</strong>
      </p>
      <p>Visibility: {props.entry.visibility}</p>
      <p>Weather: {props.entry.weather}</p>
    </div>
  );
};

export default Entry;
