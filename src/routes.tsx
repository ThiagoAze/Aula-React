import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Produto from './pages/Produto'
import PageExampleState from './pages/PageExampleState'
import Usuarios from './pages/Usuarios'

export const Rotas = () => {
    return( /* Cada rota uma página */
        <BrowserRouter> 
            <Routes> 
                <Route
                    path='/'              /* Caminho (URL) */
                    element={<Login />}   /* O usuario irá acessar a página login */
                />
                
                <Route
                    path='/dashboard'
                    element={<Dashboard />}
                />
                <Route
                    path='/usuarios'
                    element={<Usuarios />}
                />
                
                <Route 
                    path='/produto/:id'
                    element={<Produto />}
                />
                <Route
                    path='/example'
                    element={<PageExampleState />}
                />


            </Routes>
        </BrowserRouter>
    )
}