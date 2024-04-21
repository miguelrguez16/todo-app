import { FilterValue } from "../types";
import { Filters } from "./Filters";

interface Props {
  activeAccount: number;
  completedAccount: number;
  filterSelected: FilterValue;
  handleFilterChange: (filter: FilterValue) => void;
  onClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  activeAccount = 0,
  completedAccount = 0,
  filterSelected,
  onClearCompleted,
  handleFilterChange,
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeAccount} tareas pendientes</strong>
      </span>

      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
      {completedAccount > 0 && (
        <button className="clear-completed" onClick={() => onClearCompleted()}>
          Borrar completados
        </button>
      )}
    </footer>
  );
};
