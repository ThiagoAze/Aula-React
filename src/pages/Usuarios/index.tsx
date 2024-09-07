import { useEffect } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Usuarios() {

    const navigate = useNavigate()
    //Quando o usuário chegar na página, execuratá primeiramente o useEffect
    useEffect(() => { //função anônima 
        let lstoken = localStorage.getItem('americanos.token', ) //Pegando o token do usuário
        let token: IToken | null = null

        if(typeof lstoken === 'string'){
            token = JSON.parse(lstoken)
        }

        if(!token || verificaTokenExpirado(token?.accessToken)){ //se o token existir ou expirar
            navigate('/')
        }

        //trazer os usuários do back-end
        axios.get('http://localhost:3001/users')
            .then((resposta) =>{
                console.log(resposta.data)
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
                    <button type="button" className="btn btn-success" onClick={() => { /* navegate('') */ }}>Adicionar</button>
                </div>

                <table className="table table-striped">
                    <thead>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Ações</th>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>João</td>
                            <td>joaopedefeijao@gmail.com</td>
                            <td>
                                <button type="button" className="btn btn-warning" style={{marginRight: 10}}>Editar</button>
                                <button type="button" className="btn btn-danger">Deletar</button>
                            </td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Maria</td>
                            <td>mariamaria@gmail.com</td>
                            <td>
                                <button type="button" className="btn btn-warning" style={{marginRight: 10}}>Editar</button>
                                <button type="button" className="btn btn-danger" >Deletar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </LayoutDashboard>

        </>
    )
}