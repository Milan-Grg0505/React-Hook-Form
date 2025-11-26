import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import './index.css'
// import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layouts/Layout.jsx'
import Home from './pages/Home.jsx'
import UserTable from './components/UserTable.jsx'
import EditUser from './components/EditUser.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children:[
      { index:"true", element:<Home /> },
      { path:"displayUser", element:<UserTable /> },
      { path:"editUser/:userId", element:<EditUser /> }
    ]
  },
 
])


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  ,
)
