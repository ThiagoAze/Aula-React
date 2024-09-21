import { useEffect, useState } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { validaPermissao, verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IUsuarios {
    //Dados tirados do banco
    id: number
    nome: string
    email: string
    permissoes: string
}

export default function Usuarios() {

    const navigate = useNavigate()

    //Irá alterar o valor de usuarios
    const [usuarios, setUsuarios] = useState<Array<IUsuarios>>([]) //receberá um array vazio 

    //Quando o usuário chegar na página, execuratá primeiramente o hook useEffect
    useEffect(() => { //função anônima 
        let lstoken = localStorage.getItem('americanos.token',) //Pegando o token do usuário
        let token: IToken | null = null

        if (typeof lstoken === 'string') {
            token = JSON.parse(lstoken)
        }

        if (!token || verificaTokenExpirado(token?.accessToken)) { //se o token não existir ou expirar
            navigate('/')
        }
        if(!validaPermissao(['admin'], token?.user.permissoes)){ //Mandar para dashboard se não tiver permissão
            navigate('/dashboard')
        }

        //trazer os usuários do back-end
        axios.get('http://localhost:3001/users')
            .then((resposta) => {
                setUsuarios(resposta.data) //receberá os itens que foram tipados acima
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    return (
        <>
            <LayoutDashboard>
                <div className="d-flex justify-content-between mt-3">
                    <h1>Usuários</h1>
                    <button type="button" className="btn btn-success" onClick={() => { navigate('/usuarios/criar') }}>Adicionar</button>
                </div>

                <table className="table table-striped">
                    <thead>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </thead>
                    <tbody>
                        {
                            //Percorrerá os dados de usuario, (O mesmo que o foreach)
                            usuarios.map((usuario, index) => {
                                return (
                                    // key: identifica unicamente a linha com o id do usuario
                                    <tr key={usuario.id}> 
                                        <th>{usuario.id}</th>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.email}</td>
                                        <td>    {/* Passando o id do usuário ao editar */}
                                            <button 
                                                type="button" className="btn btn-warning" style={{ marginRight: 10 }}
                                                onClick={() => {navigate(`/usuarios/${usuario.id}`)}}>Editar
                                            </button>
                                            <button 
                                                type="button" className="btn btn-danger">Deletar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </LayoutDashboard>

        </>
    )
}