import type { ComponentProps } from "react";

export enum CellStatus {
  Empty,
  X,
  Filled,
}

interface CellProps extends ComponentProps<"td"> {
  status: CellStatus;
}

export const Cell = ({ status, ...tdProps }: CellProps) => {
  return (
    <td {...tdProps}>
      {status === CellStatus.X && "X"}
      {status === CellStatus.Filled && "O"}
    </td>
  );
};
