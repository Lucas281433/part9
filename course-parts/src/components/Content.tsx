import { ContentProps } from "../types";
import Part from "./Part";

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(course => (
        <Part key={course.name} part={course} />
      ))}
    </div>
  );
};

export default Content;
