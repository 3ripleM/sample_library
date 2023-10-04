import "./styles/App.css";
import { Library } from "./pages/library";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Library />
    </Provider>
  );
}

export default App;
