import React from "react";
import { Library } from "./pages/library";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <React.Suspense fallback={<span>loading...</span>}>
      <React.StrictMode>
        <Provider store={store}>
          <Library />
        </Provider>
      </React.StrictMode>
    </React.Suspense>
  );
}

export default App;
