import { Provider } from "react-redux";
import { store } from "./store";

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
