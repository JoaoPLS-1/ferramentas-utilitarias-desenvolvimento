import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm, type Resolver } from "react-hook-form"
import * as z from 'zod'

import { NavLink } from "react-router-dom";

export function MoneyFlow() {
    const [valores, setValores] = useState<TypeForm[]>([]);

    useEffect(() => {
        const valoresArmazenados = localStorage.getItem('valores')
        if (valoresArmazenados === null) {
            return setValores([])
        }
        setValores(JSON.parse(valoresArmazenados))
    }, [])

    const regrasFluxo = z.object({
        id: z.string().optional(),
        descricao: z.string().min(5, 'Campo obrigatório.'),
        valor: z.coerce.number().positive('Campo obrigatório com valores positivos acima de 0.'),
        tipo: z.enum(['ENTRADA', 'SAIDA'])
    })

    type TypeForm = z.infer<typeof regrasFluxo>

    const formulario = useForm<TypeForm>({
        resolver: zodResolver(regrasFluxo) as Resolver<TypeForm>
    })

    function submeterFormulario(camposFormulario: TypeForm) {
          const montarValor: TypeForm = {
        id: Math.random().toString(36).substring(2, 9),
        descricao: camposFormulario.descricao,
        valor: camposFormulario.valor,
        tipo: camposFormulario.tipo
    }
        setValores(oldState => [...oldState, montarValor])
        formulario.reset();
        localStorage.setItem('valores', JSON.stringify([...valores, montarValor]))
    }
    let saldo = 0;
    for(let i = 0; i < valores.length; i++) {
        if(valores[i].tipo === "ENTRADA") {
            saldo += valores[i].valor
        } else {
            saldo -= valores[i].valor
        }
    }

    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center bg-zinc-100 py-8">
                <h1 className="text-3xl font-bold mb-2">Página de Controle de Fluxo Financeiro</h1>
                <p className={`text-center text-xl mb-6 ${saldo < 0 ? "text-red-500" : "text-green-600"}`}>Saldo: <span className="font-semibold">R$ {saldo.toFixed(2)}</span></p>

                <div className="flex gap-6 items-start">

                <div className="border border-zinc-300 bg-white p-12 mb-6 rounded-md w-[520px] box-border">
                    <form onSubmit={formulario.handleSubmit(submeterFormulario)} className="flex flex-col gap-7 w-full">
                    
                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-medium text-zinc-700">Valor</label>
                        <input type="number" step="0.01" {...formulario.register('valor')} className="w-full border border-zinc-300 px-2 py-1 text-zinc-900" />{formulario.formState.errors.valor && <p className="text-red-500 text-xs mt-2">{formulario.formState.errors.valor.message}</p>}

                    </div>
                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-medium text-zinc-700">Descrição</label>
                        <input type="text" {...formulario.register('descricao')} className="w-full border border-zinc-300 px-2 py-1 text-zinc-900" />{formulario.formState.errors.descricao && <p className="text-red-500 text-xs mt-2">{formulario.formState.errors.descricao.message}</p>}

                    </div>
                    <div className="flex flex-col gap-1">

                        <label className="text-sm font-medium text-zinc-700">Tipo</label>
                        <select {...formulario.register('tipo')} className="w-full border border-zinc-300 px-2 py-1 text-zinc-900">
                            <option value="ENTRADA">ENTRADA</option>
                            <option value="SAIDA">SAIDA</option>
                        </select>{formulario.formState.errors.tipo && <p className="text-red-500 text-xs mt-2">{formulario.formState.errors.tipo.message}</p>}


                    </div>
                    <div className="flex justify-end mt-5">
                    <button className="border border-zinc-400 px-4 py-1 bg-zinc-800 text-white cursor-pointer" type="submit">Cadastrar</button>

                    </div>
                    </form>
                </div>
                <div className="border border-zinc-300 bg-white p-4 w-[520px] box-border rounded-md">
                    <h1 className="text-xl font-bold mb-4">Histórico de Movimentações</h1>
                   {valores.length > 0 && valores.map((valores, index) => {
                    return (
                        <>
                        <div key={valores.id} className="flex items-center justify-between gap-2">
                            <p className={valores.tipo === "SAIDA" ? "text-red-500" : "text-green-600"}>{valores.descricao} - {valores.tipo}: R$ {valores.valor.toFixed(2)}</p>

                        </div>
                        </>
                    )
                   })}
                </div>
                </div>
                

            </div>
        </>
    )
}