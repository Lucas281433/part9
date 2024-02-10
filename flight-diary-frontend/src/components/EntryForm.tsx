import { useState } from "react";
import { createNewEntry } from "../services/diaryService";
import { EntryFormProps, Visibility, Weather } from "../types";
import Notification from "./Notification";
import axios from "axios";

const EntryForm = (props: EntryFormProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const addNewEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = await createNewEntry({
        date,
        visibility,
        weather,
        comment,
      });
      props.setDiaryEntry(props.diaryEntry.concat(newEntry));
      setDate("");
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
      setComment("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    }
  };

  return (
    <div>
      <h2>Add New Entry</h2>
      <Notification message={message} />
      <form onSubmit={addNewEntry}>
        <div>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          Visibility: Great:
          <input
            type="radio"
            value={Visibility.Great}
            onChange={() => setVisibility(Visibility.Great)}
            checked={visibility === Visibility.Great}
          />
          Good:
          <input
            type="radio"
            value={Visibility.Good}
            onChange={() => setVisibility(Visibility.Good)}
            checked={visibility === Visibility.Good}
          />
          Ok:
          <input
            type="radio"
            value={Visibility.Ok}
            onChange={() => setVisibility(Visibility.Ok)}
            checked={visibility === Visibility.Ok}
          />
          Poor:
          <input
            type="radio"
            value={Visibility.Poor}
            onChange={() => setVisibility(Visibility.Poor)}
            checked={visibility === Visibility.Poor}
          />
        </div>
        <div>
          Weather: Sunny:
          <input
            type="radio"
            value={weather}
            onChange={() => setWeather(Weather.Sunny)}
            checked={weather === Weather.Sunny}
          />
          Rainy:
          <input
            type="radio"
            value={Weather.Rainy}
            onChange={() => setWeather(Weather.Rainy)}
            checked={weather === Weather.Rainy}
          />
          Cloudy:
          <input
            type="radio"
            value={Weather.Cloudy}
            onChange={() => setWeather(Weather.Cloudy)}
            checked={weather === Weather.Cloudy}
          />
          Stormy:
          <input
            type="radio"
            value={Weather.Stormy}
            onChange={() => setWeather(Weather.Stormy)}
            checked={weather === Weather.Stormy}
          />
          Windy:
          <input
            type="radio"
            value={Weather.Windy}
            onChange={() => setWeather(Weather.Windy)}
            checked={weather === Weather.Windy}
          />
        </div>
        <div>
          Comment:{" "}
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">Add Entry</button>
      </form>
    </div>
  );
};

export default EntryForm;
