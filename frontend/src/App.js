import React from "react";
import { grommet, Grommet } from 'grommet';
import MainPage from "./pages/MainPage";

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
    <Grommet theme={grommet} full themeMode="dark">
        <MainPage />
    </Grommet>
);

export default App;
