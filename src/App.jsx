import { RouterMain as Route } from "./routes";
import { ProtectedRoute as Protected } from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Route>
        <Protected />
      </Route>
    </div>
  );
}

export default App;
