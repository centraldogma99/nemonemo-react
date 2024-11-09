import { Cell } from "#components/Cell.tsx"
import { CellStatus } from "#constants/Cell.ts"
import { produce } from "immer"
import { useState } from "react"

interface TableProps {
  rowSize: number
  colSize: number
  initialTable?: CellStatus[][]
}

export const Table = ({ rowSize, colSize, initialTable }: TableProps) => {
  const [table, setTable] = useState<CellStatus[][]>(
    initialTable ??
      getArrayWithLength(rowSize).map(() =>
        getArrayWithLength(colSize).map(() => CellStatus.Empty),
      ),
  )

  const handleCellLeftClick = (i: number, j: number) => {
    setTable(
      produce((draft) => {
        draft[i][j] =
          draft[i][j] !== CellStatus.Filled
            ? CellStatus.Filled
            : CellStatus.Empty
      }),
    )
  }

  const handleCellRightClick = (i: number, j: number) => {
    setTable(
      produce((draft) => {
        draft[i][j] =
          draft[i][j] !== CellStatus.X ? CellStatus.X : CellStatus.Empty
      }),
    )
  }

  return (
    <table className="border-collapse border-2 border-black">
      <tbody>
        {getArrayWithLength(rowSize).map((_, i) => (
          <tr key={i}>
            {getArrayWithLength(colSize).map((_, j) => (
              <Cell
                key={j}
                status={table[i][j]}
                onClick={() => handleCellLeftClick(i, j)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  handleCellRightClick(i, j)
                }}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const getArrayWithLength = (length: number) => Array.from({ length })
