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

//Permissão para usuários de Admin ou Colaborador
export const validaPermissao = (
    permissao: Array<string>, 
    permissaoToken?: string
) => {
    if(permissaoToken){
        //Verificação se é verdadeiramente uma string
        if(typeof permissaoToken === 'string'){
            const temAlgumaPermissao = permissao.includes(permissaoToken)   //Se não encontrar nada no array retorna false

            return temAlgumaPermissao
        }
        
        return false
    }
    //Se não tiver permissão
    return false
}