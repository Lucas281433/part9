import { PartProps } from "../types";

const Part = (props: PartProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (props.part.kind) {
    case "basic":
      return (
        <div>
          <p>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
          </p>
          <p><em>{props.part.description}</em></p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
          </p>
          <p>Project Exercises: {props.part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
          </p>
          <p><em>{props.part.description}</em></p>
          <p>Submit To: {props.part.backgroundMaterial}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            <strong>
              {props.part.name} {props.part.exerciseCount}
            </strong>
          </p>
          <p><em>{props.part.description}</em></p>
          <p>Required Skills: {props.part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(props.part);
  }
};

export default Part;
