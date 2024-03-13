import { useBearStore } from "./zustand/store";
import TableNext from "./components/TableNext";

function App() {
  return (
    <>
      <div className="md:container min-h-screen">
        <div className="flex dark">
          <TableNext />
        </div>
      </div>
    </>
  );
}

export default App;
