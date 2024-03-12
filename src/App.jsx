import { useBearStore } from "./zustand/store";
import TableNext from "./components/TableNext";

function App() {
  return (
    <>
      <div className="lg:container mx-auto dark min-h-screen">
        <TableNext />
      </div>
    </>
  );
}

export default App;
