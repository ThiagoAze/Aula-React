import { jwtDecode } from "jwt-decode"

export const verificaTokenExpirado = (
    token?: string
) => {
    if(token){
        let decodedToken = jwtDecode(token)
        if(!decodedToken.exp || decodedToken.exp < new Date().getTime() / 1000){ //expirará a cada 1 hora
            //token expirado
            return true
        } else {
            return false
        }
    }
}