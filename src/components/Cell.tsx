import type { ComponentProps } from "react"
import { CellStatus } from "../constants/Cell"

interface CellProps extends ComponentProps<"td"> {
  status: CellStatus
}

export const Cell = ({ status, ...tdProps }: CellProps) => {
  return (
    <td
      className={`${status === CellStatus.Filled ? "bg-black" : ""} select-none ${tdProps.className}`}
      {...tdProps}
    >
      {status === CellStatus.X && "X"}
    </td>
  )
}
