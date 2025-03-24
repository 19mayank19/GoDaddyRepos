import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from './layout/appLayout/AppLayout';
import RepoList from './components/repoList/RepoList.view';
import RepoDetails from './components/repoDetails/RepoDetails.view';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RepoList />
      },
      {
        path: "/:repoId",
        element: <RepoDetails />
      }
    ]
  }
])

function App() {

  return (<RouterProvider router={router} />)
}

export default App;