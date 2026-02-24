import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'

export function ConnectHub() {
    const [cliente, setCliente] = useState<TypeForm[]>([])

    useEffect(() => {
        const clienteArmazenado = localStorage.getItem('cliente')
        if (clienteArmazenado === null) {
            return setCliente([])
        }
        setCliente(JSON.parse(clienteArmazenado))
    }, [])
    
    const regrasForms = z.object({
        nome: z.string().min(3, 'Campo obrigatório.'),
        email: z.email('Email inválido'),
        telefone: z.string().min(8, 'Telefone deve conter no mínimo 8 dígitos.').max(10, 'Telefone deve conter no máximo 10 dígitos.').regex(/^[0-9]+$/, "O telefone deve conter apenas números")
    })
    type TypeForm = z.infer<typeof regrasForms>
    const formulario = useForm<TypeForm>({
        resolver: zodResolver(regrasForms)
    })

    function submeterFormulario(camposFormulario: TypeForm) {
        setCliente(oldState => [...oldState, camposFormulario])
        formulario.reset();
        localStorage.setItem('cliente', JSON.stringify([...cliente, camposFormulario]))
    }

    return (
        <>
            <nav className="bg-cyan-900 h-16 flex items-center justify-between px-8 text-zinc-100">
                <h1>ConnectionHub</h1>
                <ul className="flex gap-6">
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/taskMaster'}>TaskMaster</NavLink></li>
                    <li><NavLink to={'/moneyFlow'}>MoneyFlow</NavLink></li>

                </ul>
                 </nav>
                <div className="w-full max-w-4xl mx-auto flex items-center justify-center flex-col" >
                    <h1>Cadastro Contatos</h1>
                    <form onSubmit={formulario.handleSubmit(submeterFormulario)} noValidate className="w-full max-w-4xl mx-auto">
                        <div className="flex  flex-col gap-5">
                            <div className="flex flex-col py-1 relative">
                                <label htmlFor="nome completo" className="text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                                <input className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" type="text" {...formulario.register('nome')} /> {formulario.formState.errors.nome && <p className="text-red-500 text-xs mt-2 absolute -bottom-3 left-0">{formulario.formState.errors.nome.message}</p>}
                            </div>
                            <div className="flex flex-col py-1 relative">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" type="text" {...formulario.register('email')} /> {formulario.formState.errors.email && <p className="text-red-500 text-xs mt-2 absolute -bottom-3 left-0">{formulario.formState.errors.email.message}</p>}
                            </div>
                            <div className="flex flex-col py-1 relative ">
                                <label htmlFor="telefone" className="text-sm font-medium text-gray-700 mb-1">Telefone</label>
                                <input className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" type="text" {...formulario.register('telefone')} /> {formulario.formState.errors.telefone && <p className="text-red-500 text-xs mt-2 absolute -bottom-3 left-0">{formulario.formState.errors.telefone.message}</p>}
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition font-medium" type="reset">Limpar</button>
                            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium" type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
                <div className="w-full flex items-center justify-center flex-col mt-6">
                    {cliente.length > 0 && cliente.map((cliente, index) => {
                        return (
                            <>
                            <p key={index}>{`Cliente ${index + 1}: Nome: ${cliente.nome}, Email: ${cliente.email}, Telefone: ${cliente.telefone}`}</p>
                            </>
                        )
                    })}
                </div>
           
        </>
    )
}