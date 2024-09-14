import { useCallback, useEffect, useRef } from "react"
import { IToken } from "../../../interfaces/token"
import { verificaTokenExpirado } from "../../../services/token"
import { useNavigate } from "react-router-dom"
import { LayoutDashboard } from "../../../components/LayoutDashboard"
import { SubmitHandler, useForm } from "react-hook-form"
import axios from "axios"

interface IForm {
    nome: string
    email: string
    password: string
    permissoes: string
}

export default function GerenciarUsuarios() {

    //Registrar, enviar formulario, receber erros
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>()
    const refForm = useRef<any>()

    const navigate = useNavigate() //Primeiro importar o navegate

    useEffect(() => { //função anônima 
        let lstoken = localStorage.getItem('americanos.token',) //Pegando o token do usuário
        let token: IToken | null = null

        if (typeof lstoken === 'string') {
            token = JSON.parse(lstoken)
        }

        if (!token || verificaTokenExpirado(token?.accessToken)) { //se o token não existir ou expirar
            navigate('/')
        }



    }, [])

    //Salvar os dados do usuario em data
    const submitForm: SubmitHandler<IForm> = useCallback((data) => {
        axios.post('http://localhost:3001/users', data)
            .then((res) => {
                navigate('/usuarios')
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <>
            <LayoutDashboard>
                <h1>Usuarios {errors?.nome?.message}</h1>
                <form
                    className="row g-3 needs-validation mb-3"
                    noValidate
                    style={{ alignItems: 'center' }}
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault() //Impede o navegador de recarregar página
                        refForm.current.classList.add('was-validated')
                        //validação do Bootstrap
                        handleSubmit(submitForm)(event)
                    }}
                    ref={refForm}
                >
                    <div className="col-md-12">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" placeholder="Digite o nome do usuário" id="nome" required
                            {...register('nome', { required: 'Nome é obrigatório' })
                            } />
                        <div className='invalid-feedback'>
                            {errors?.nome?.message} {/* Mensagem de erro personalizado */}
                        </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Digite o email do usuário" id="email" required {...register('email', { required: 'Email é obrigatório' })} />
                    <div className="invalid-feedback">
                        {errors.email && errors.email.message} {/* Mensagem de erro personalizado */}
                    </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="permissoes" className="form-label">Permissões</label>
                        <select
                            className="form-select"
                            defaultValue={""}
                            id="permissoes"
                            required
                            {...register('permissoes', { required: "Selecione" })}
                        >
                            <option value={""}>Selecione o Tipo</option>
                            <option value={"admin"}>Admin</option>
                            <option value={"colaborador"}>Colaborador</option>
                        </select>
                    <div className="invalid-feedback">
                        {errors.permissoes && errors.permissoes.message} {/* Mensagem de erro personalizado */}
                    </div>
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input type="password" className="form-control" placeholder="Digite a senha do usuário" id="password" required {...register('password', { required: 'Senha é obrigatório' })} />
                    <div className="invalid-feedback">
                        {errors.password && errors.password.message} {/* Mensagem de erro personalizado */}
                    </div>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-success">Salvar</button>
                    </div>
                </form>
            </LayoutDashboard>
        </>
    )
}