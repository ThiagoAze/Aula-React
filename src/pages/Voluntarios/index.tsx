import { useEffect } from "react";
import { LayoutDashboard } from "../../components/LayoutDashboard";
import { IToken } from "../../interfaces/token";
import { verificaTokenExpirado } from "../../services/token";
import { useNavigate } from "react-router-dom";

export default function Voluntarios() {

    const navigate = useNavigate()

    useEffect(() => {
        let lstoken = localStorage.getItem('americanos.token')
        let token: IToken | null = null

        if(typeof lstoken === 'string'){ //Se o lstoken for uma string
            token = JSON.parse(lstoken)  //O token é convertido de JSON para um objeto JavaScript usando JSON.parse
        }

        if(!token || verificaTokenExpirado(token?.accessToken)){ //se o token existir ou expirar
            navigate('/')
        }
    }, [])

    return(
        <>
            <LayoutDashboard>
                <h1>Voluntários</h1>
            </LayoutDashboard>
        </>
    )
}

