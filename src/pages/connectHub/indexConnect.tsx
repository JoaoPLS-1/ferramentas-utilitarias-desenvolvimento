import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { ButtonCadastrar } from "../../assets/components/buttonCadastrar";
import { ButtonLimpar } from "../../assets/components/buttonLimpar";

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
            <div className="w-full min-h-screen flex flex-col items-center bg-zinc-100 py-8">
                <h1 className="text-2xl font-bold mb-2">Página de Controle de Contatos</h1>

                <div className="flex gap-6 items-start">

                    <div className="border border-zinc-300 bg-white p-12 mb-6 rounded-md w-[520px] box-border">
                        <form onSubmit={formulario.handleSubmit(submeterFormulario)} noValidate className="w-full max-w-4xl mx-auto">
                            <div className="flex flex-col gap-4 w-full">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-zinc-700">Nome completo</label>
                                    <input className="w-full border border-zinc-300 px-2 py-1 text-zinc-900" type="text" {...formulario.register('nome')} /> {formulario.formState.errors.nome && <p className="text-red-500 text-xs mt-2">{formulario.formState.errors.nome.message}</p>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</label>
                                    <input className="w-full border border-zinc-300 px-2 py-1 text-zinc-900" type="text" {...formulario.register('email')} /> {formulario.formState.errors.email && <p className="text-red-500 text-xs mt-2">{formulario.formState.errors.email.message}</p>}
                                </div>
                                <div className="flex flex-col gap-1 ">
                                    <label htmlFor="telefone" className="text-sm font-medium text-zinc-700">Telefone</label>
                                    <input className="w-full border border-zinc-300 px-2 py-1 text-zinc-900" type="text" {...formulario.register('telefone')} /> {formulario.formState.errors.telefone && <p className="text-red-500 text-xs mt-2">{formulario.formState.errors.telefone.message}</p>}
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 mt-6">
                                <ButtonLimpar />
                                <ButtonCadastrar />
                            </div>
                        </form>
                    </div>
                    <div className="border border-zinc-300 bg-white p-4 w-[520px] box-border rounded-md">
                        <h1 className="text-lg font-bold mb-2">Clientes Cadastrados</h1>
                        {cliente.length > 0 && cliente.map((cliente, index) => {
                            return (
                                <>
                                    <p key={index}>{`Cliente ${index + 1}: Nome: ${cliente.nome}, Email: ${cliente.email}, Telefone: ${cliente.telefone}`}</p>
                                </>
                            )
                        })}
                    </div>
                </div>

            </div>

        </>
    )
}