import React, { Children } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Wx from './components/Wx';
import Txl from './components/Txl';
import Ybp from './components/Ybp';
import WxList from './components/WxList';
import { BrowserRouter ,useRoutes} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const routeData = [
  {
    path:"/",
    element: <App />,
    children:[
      {
        path: "/ybp",
        element: <Ybp />
      },
      {
        path: "/wx",
        element: <WxList />,
        children:[
          {
            path: ":talker",
            element: <Wx />
          },
        ]
      },
      {
        path: "/txl",
        element: <WxList />,
        children:[
          {
            path: ":talker",
            element: <Txl />
          },
        ]
      }
    ]
  }
]


const MyRoutes = ()=>{
  let routes = useRoutes(routeData)
  return routes
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
