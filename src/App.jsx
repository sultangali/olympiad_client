import React from 'react'

import './styles/App.scss';
import StudentList from './StudentsList.jsx';
import ListDetail from './ListDetail.jsx';
import { useRoutes } from 'react-router-dom';

function App() {
  let routes = useRoutes([
    { path: "/", element: <StudentList/> },
    { path: "/detail", element: <ListDetail/> }
  ])
  return routes;
}

export default App;
