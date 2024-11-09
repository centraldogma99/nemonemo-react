import { CellStatus } from "#constants/Cell.ts"
import type { ComponentProps } from "react"

interface CellProps extends ComponentProps<"td"> {
  status: CellStatus
}

export const Cell = ({ status, ...tdProps }: CellProps) => {
  return (
    <td
      {...tdProps}
      className={`border-1 h-6 w-6 select-none border border-dashed border-black text-sm text-black ${status === CellStatus.Filled ? "bg-black" : ""}`}
    >
      {status === CellStatus.X && "X"}
    </td>
  )
}
