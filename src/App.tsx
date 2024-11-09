import { Table } from "#components/Table.tsx"
import "./App.css"

function App() {
  return (
    <div>
      <Table
        rowSize={3}
        colSize={3}
        answer={[
          [true, false, true],
          [false, true, false],
          [true, false, true],
        ]}
      />
    </div>
  )
}

export default App
