import { SyntheticEvent, useCallback, useRef, useState } from 'react'
import styles from './style.module.css'

export default function PageExampleState(){

    //let contador = 0, faz o mesmo abaixo
    const refContador = useRef(0)
    const [estado, setEstado] = useState(0)
    //Começou com use é um hook

    //Função para sempre que houver uma mudança na tela
    const submitForm = useCallback((event: SyntheticEvent) => {
        event.preventDefault() /*Não permite que o submit faça Reload*/
        console.log('Enviou o Formulário')
        console.log(estado) /* Visualização do usuário */
        console.log('refContador.current')
        console.log(refContador.current)
    }, [estado]) /*Esta função dependerá do estado*/

    return(
        <>
        <div className={styles.main}>
            <div className={styles.border}>
                <div className='d-flex flex-column align-items-center'>
                    <h1 className='text-primary'>Contador {estado}</h1>
                    <h1 className='text-primary'>Contador Ref {refContador.current}</h1>
                </div>
                
                <hr />

                <form className='needs-validation align-items-center' noValidate onSubmit={submitForm}>
                    <div className='col-md-12'>
                        <label htmlFor="email" className='form-label'>Email</label>
                        <input type="email" className='form-control' placeholder='Digite seu email' required/>
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
                    <div className='col-md-12 mt-3'>
                        <button className='btn btn-warning w-100' type='button' id='botao' onClick={() => {setEstado(estado+1)}}>Somar</button>
                    </div>
                    <div className='col-md-12 mt-3'>
                        <button className='btn btn-success w-100' type='button' id='botao' onClick={() => {refContador.current += 1}}>Somar Ref</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}