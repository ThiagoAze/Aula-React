import { ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom" 
import { IToken } from "../../interfaces/token"
import { validaPermissao } from "../../services/token"

interface IProps{
    children: ReactNode
}

//const = componente
export const LayoutDashboard = (props: IProps) => { 

    //Deslogar do sistema
    const logout = () => {    
        localStorage.removeItem('americanos.token')
    }

    const [token, setToken] = useState<IToken>()

    useEffect(() =>{
        let lsToken = localStorage.getItem('americanos.token')

        let token: IToken | undefined

        if(typeof lsToken === 'string'){
            token = JSON.parse(lsToken) //Converter para objeto
            setToken(token)
        }
    })

    return(
        <>
            <header
                className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0"
            >
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3"
                    href="#">
                    Sistema Autenticação
                </a>
                <button
                    className="navbar-toggler position-absolute d-md-none collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidebarMenu"
                    aria-controls="sidebarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="w-100"></div>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        {/* Ao clicar em sair será direcionado para login */}
                        <Link className="nav-link px-3" onClick={logout} to="/">Sair</Link> 
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                    <nav
                        id="sidebarMenu"
                        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
                    >
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link`}
                                        to={'/dashboard'}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                                {
                                    //Opção Usuarios aparecerá apenas se tiver a permissao
                                    validaPermissao(['admin'], token?.user.permissoes) && //pode ter várias opções ['exemplo1'], ['exemplo2']
                                    <li className="nav-item">
                                    <Link
                                        className={`nav-link`}
                                        to={'/usuarios'}
                                        
                                    >
                                        Usuários
                                    </Link>
                                </li>
                                }
                                
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link`}
                                        to={'/voluntarios'}
                                    >
                                        Voluntários
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>


                    <main
                        className="col-md-9 ms-sm-auto col-lg-10 px-md-4"
                    >
                        
                        {props.children}

                    </main>

                </div>
            </div>
        </>
    )
} 