import React from "react";
import { grommet, Grommet } from 'grommet';
import MainPage from "./pages/MainPage";
import { Provider } from "react-redux";
import store from "./store/store";

// const theme = {
//     global: {
//         font: {
//             family: "Roboto",
//             size: "18px",
//             height: "20px",
//         },
//     },
// };

const App = () => (
    <Provider store={store}>
        <Grommet theme={grommet} full themeMode="dark">
            <MainPage />
        </Grommet>
    </Provider>
);

export default App;
