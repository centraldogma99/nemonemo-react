import { CellStatus } from "#constants/Cell.ts"
import type { ComponentProps } from "react"

interface CellProps extends ComponentProps<"td"> {
  status: CellStatus
}

export const Cell = ({ status, ...tdProps }: CellProps) => {
  return (
    <td
      className={`select-none ${status === CellStatus.Filled ? "bg-black" : ""} ${tdProps.className}`}
      {...tdProps}
    >
      {status === CellStatus.X && "X"}
    </td>
  )
}
