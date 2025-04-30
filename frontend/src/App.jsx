import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <main>
        <Outlet /> 
      </main>
      <Toaster />
    </>
  );
}

export default App;
