import { useEffect } from "react"
import { IToken } from "../../../interfaces/token"
import { verificaTokenExpirado } from "../../../services/token"
import { useNavigate } from "react-router-dom"

export default function GerenciarUsuarios(){

    const navegate = useNavigate() //Primeiro importar o navegate

    useEffect(() => { //função anônima 
        let lstoken = localStorage.getItem('americanos.token',) //Pegando o token do usuário
        let token: IToken | null = null

        if (typeof lstoken === 'string') {
            token = JSON.parse(lstoken)
        }

        if (!token || verificaTokenExpirado(token?.accessToken)) { //se o token não existir ou expirar
            navegate('/')
        }

        

    }, [])
    
    return(
        <>
            <h1>Add Usuarios</h1>
        </>
    )
}