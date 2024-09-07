import { useEffect } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

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
    }, []) 

    return (
        <>

            <LayoutDashboard>
                <h1>Olá, Mundo!</h1>
            </LayoutDashboard>

        </>
    )
}