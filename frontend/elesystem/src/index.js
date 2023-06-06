import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './mainComponents/Main';
import Menu from './mainComponents/Menu';
import CheckElevatorStatus from './mainComponents/CheckElevatorStatus';
import CallElevator from './middleComponents/CallElevator';
import SymulateElevators from './middleComponents/SymulateElevators';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />
      },
      {
        path: "menu",
        element: <Menu />,
        children: [
          {
            path: "elevatorstatus",
            element: <CheckElevatorStatus />
          },
          {
            path: "callelevator",
            element: <CallElevator/>
          },
          {
            path: "symulateElevators",
            element: <SymulateElevators/>
          }
        ]
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
