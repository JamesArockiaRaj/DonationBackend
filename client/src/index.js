import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Blood from './pages/Blood';
import Food from './pages/Food';
import Things from './pages/Things';
import Lists from './pages/Lists';
import Login from './pages/Login';

import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DonorRegistration from './pages/DonorRegistration';
import BloodRequirement from './pages/BloodRequirement';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path:"/blood",
    element: <Blood/>,
  },
  {
    path: "/food",
    element: <Food/>,
  },
  {
    path: "/things",
    element: <Things/>,
  },
  {
    path: "/lists",
    element: <Lists/>,
  },
  {
    path: "/regdonor",
    element: <DonorRegistration/>,
  },
  {
    path: "/reqblood",
    element: <BloodRequirement/>,
  },
  {
    path: "/login",
    element: <Login/>,
  }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();