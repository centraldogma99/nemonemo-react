import { Cell } from "#components/Cell.tsx"
import { CellStatus } from "#constants/Cell.ts"
import { produce } from "immer"
import { Fragment, useState } from "react"
import { isEqual } from "lodash-es"

interface TableProps {
  rowSize: number
  colSize: number
  initialTable?: CellStatus[][]
  answer: boolean[][]
}

export const Table = ({
  rowSize,
  colSize,
  initialTable,
  answer,
}: TableProps) => {
  const [table, setTable] = useState<CellStatus[][]>(
    initialTable ??
      getArrayWithLength(rowSize).map(() =>
        getArrayWithLength(colSize).map(() => CellStatus.Empty),
      ),
  )

  const handleCellLeftClick = (i: number, j: number) => {
    setTable((table) => {
      const next = produce(table, (draft) => {
        draft[i][j] =
          draft[i][j] !== CellStatus.Filled
            ? CellStatus.Filled
            : CellStatus.Empty
      })
      console.log(next, booleanMapToCellStatusMap(answer))
      if (isEqual(next, booleanMapToCellStatusMap(answer))) {
        console.info("Congratulation!")
      }

      return next
    })
  }

  const handleCellRightClick = (i: number, j: number) => {
    setTable(
      produce((draft) => {
        draft[i][j] =
          draft[i][j] !== CellStatus.X ? CellStatus.X : CellStatus.Empty
      }),
    )
  }

  const { rowHints, colHints } = generateHints(answer)

  return (
    <table className="border-collapse border-2 border-black">
      <tbody>
        <tr>
          <td />
          {getArrayWithLength(colSize).map((_, i) => (
            <td key={i} className="text-center align-bottom leading-5">
              {colHints[i].map((value, i) => (
                <Fragment key={i}>
                  {value}
                  <br />
                </Fragment>
              ))}
            </td>
          ))}
        </tr>
        {getArrayWithLength(rowSize).map((_, i) => (
          <tr key={i}>
            <td className="text-right">{rowHints[i].join(" ")}</td>
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

const booleanMapToCellStatusMap = (map: boolean[][]): CellStatus[][] =>
  map.map((row) =>
    row.map((cell) => (cell ? CellStatus.Filled : CellStatus.Empty)),
  )

function generateHints(grid: boolean[][]): {
  rowHints: number[][]
  colHints: number[][]
} {
  const rowHints = grid.map(getLineHints)
  const colHints = Array.from({ length: grid[0].length }, (_, colIndex) =>
    getLineHints(grid.map((row) => row[colIndex])),
  )

  return { rowHints, colHints }
}

function getLineHints(line: boolean[]): number[] {
  const hints: number[] = []
  let count = 0

  for (const cell of line) {
    if (cell) {
      count += 1 // 채워진 칸을 발견하면 카운트를 증가
    } else if (count > 0) {
      hints.push(count) // 채우기 종료, 카운트를 힌트에 추가
      count = 0
    }
  }

  if (count > 0) {
    hints.push(count) // 마지막 그룹을 힌트에 추가
  }

  return hints.length ? hints : [0] // 빈 경우 [0] 반환
}
