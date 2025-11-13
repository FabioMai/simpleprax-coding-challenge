import { useState, useEffect } from "react";
import type { HelloResponse } from "@full-stack-starter/shared";

function App() {
  const [data, setData] = useState<HelloResponse | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/hello")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <h1>My App</h1>
      <p>{data?.message}</p>
    </div>
  );
}

export default App;
