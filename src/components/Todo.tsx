import { TodoId, type Todo as TodoType } from "../types";

interface Props extends TodoType {
  onRemove: ({ id }: TodoId) => void;
  onToggleComplete: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemove,
  onToggleComplete,
}) => {
  return (
    <div className="view">
      <input
        className="toggle"
        checked={completed}
        type="checkbox"
        onChange={(event) =>
          onToggleComplete({ id, completed: event.target.checked })
        }></input>
      <label>{title}</label>
      <button className="destroy" onClick={() => onRemove({ id })}></button>
    </div>
  );
};
