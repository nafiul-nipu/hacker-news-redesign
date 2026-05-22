import { useEffect } from "react";
import "./App.css";
import { FirebaseHnApiCall } from "./api/firebaseHn";
import { AlgoliaHnApiCall } from "./api/algoliaHn";

function App() {
  useEffect(() => {
    FirebaseHnApiCall();
    AlgoliaHnApiCall();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      Hello World
    </div>
  );
}

export default App;
