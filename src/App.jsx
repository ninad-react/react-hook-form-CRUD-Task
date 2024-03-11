import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import PublicRoutes from './routes/PublicRoutes'
import SignInPage from './pages/SignInPage'
import PrivateRoutes from './routes/PrivateRoutes'
import HomePage from './pages/HomePage'
import FormContainer from './components/Form'


function App() {

  const router = createBrowserRouter([
    {
      path: "/signin",
      element: <PublicRoutes  component={<SignInPage />}/>
    },
    {
      path: "/",
      element: <PrivateRoutes component={<HomePage />}/>
    },
    {
      path: "/adduser",
      element: <PrivateRoutes component={<FormContainer />} />
    },
    {
      path: 'edituser/:userid',
      element: <PrivateRoutes component={<FormContainer />} />
    },
  ])

  return (
      <div className='App'>
        <RouterProvider router={router}/>
      </div>
      
  )
}

export default App
