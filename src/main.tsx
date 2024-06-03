import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './Reduxs/store.ts';
import LoginPage from './Pages/login.tsx'
import RegisterPage from './Pages/register.tsx';
import HomePage from './Pages/home.tsx';
import JabatanPage from './Pages/Masters/jabatan.tsx';
import LiburPage from './Pages/Masters/libur.tsx';
import PegawaiPage from './Pages/Masters/pegawai.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    errorElement: 'error'
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/master/pegawai',
    element: <PegawaiPage />
  },
  {
    path: '/master/jabatan',
    element: <JabatanPage />
  },
  {
    path: '/master/libur',
    element: <LiburPage />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
)
