import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import styles from './style.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../../components/Loading'
import { Toast } from '../../components/Toast'

export default function Login(){

    /* Direcionar usuário para outras páginas sem reloads */
    const navigate = useNavigate()

    const refForm = useRef<any>() /*Se coloca <any> por não existir a junção do Bootstrap com HTML*/

    const [isLoading, setIsLoading] = useState(false)
    const [isToast, SetIsToast] = useState(false)

    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault() /*Não permite que o submit faça Reload*/
        
        if(refForm.current.checkValidity()){ //Validação dos dados
            setIsLoading(true)
            
            const target = event.target as typeof event.target & {
                email: {value: string},
                senha: {value: string}
            }

            console.log(target.email.value)
            console.log(target.senha.value)

            axios.post("http://localhost:3001/login", //axios - consumir as rotas
                {
                    /*O primeiro email e senha serão o atributo do backend (jsonserver/db)*/
                    email: target.email.value,  
                    password: target.senha.value
                }).then((resposta) => {
                    localStorage.setItem('americanos.token', JSON.stringify(resposta.data)) //salvando o token e o usuário
                    navigate('/dashboard')  //Quando logar, entrará na página dashboard
                })
                .catch((erro) => {
                    setIsLoading(false)
                    console.log(erro)
                    SetIsToast(true)
                })
        } else{ /*Caso de erro, aparecerá os alertas*/
            refForm.current.classList.add('was-validated')
        }
    }, []) 

    return(
        <>
        <Loading visible={isLoading}/>

        <Toast onClose={() => {SetIsToast(false)}} show={isToast} message='Credenciais Inválidas' color='danger'/>
            
        <div className={styles.main}>
            <div className={styles.border}>
                <div className='d-flex flex-column align-items-center'>
                    <h1 className='text-primary'>Login</h1>
                    <p className='text-secundary'>Preencha os campos para logar</p>
                </div>
                
                <hr />

                <form className='needs-validation align-items-center' noValidate onSubmit={submitForm} ref={refForm}>
                    <div className='col-md-12'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" className='form-control' placeholder='Digite seu email' id='email' required/>
                        <div className='invalid-feedback'>
                            Por favor digite seu email
                        </div>
                    </div>
                    
                    <div className='col-md-12 mt-1'>
                        <label htmlFor="senha" className='form-label'>Senha</label>
                        <input type="password" className='form-control' placeholder='Digite sua senha' id='senha' required/>
                        <div className='invalid-feedback'>
                            Por favor digite sua senha
                        </div>
                    </div>
                    
                    <div className='col-md-12 mt-3'>
                        <button className='btn btn-primary w-100' type='submit' id='botao'>Enviar</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}