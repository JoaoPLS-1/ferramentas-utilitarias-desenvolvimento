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
        valor: z.coerce.number().positive('Campo obrigatório com valores positivos.'),
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
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <h1 className="text-4xl text-center">Página de Controle de Fluxo Financeiro</h1>
                <h1 className={`text-center text-4xl mt-5 ${saldo < 0 ? "text-red-500" : "text-green-600"}`}>Saldo: R$ {saldo.toFixed(2)}</h1>
                
                <div className="w-full max-w-xl bg-white shadow rounded-2xl p-6 mt-6 flex flex-col gap-4">
                    <form onSubmit={formulario.handleSubmit(submeterFormulario)} className="flex flex-col gap-4">
                    
                    <div className="flex flex-col relative justify-center items-center gap-2">

                        <label className="text-center mt-3 text-2xl">Valor</label>
                        <input type="number" step="0.01" {...formulario.register('valor')} className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 text-center" />{formulario.formState.errors.valor && <p className="text-red-500 text-xs mt-4 absolute -bottom-4 left-0">{formulario.formState.errors.valor.message}</p>}

                    </div>
                    <div className="flex flex-col relative justify-center items-center gap-2">

                        <label className="text-center mt-3 text-2xl">Descrição</label>
                        <input type="text" {...formulario.register('descricao')} className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 text-center" />{formulario.formState.errors.descricao && <p className="text-red-500 text-xs mt-2 absolute -bottom-4 left-0">{formulario.formState.errors.descricao.message}</p>}

                    </div>
                    <div className="flex flex-col relative justify-center items-center gap-2">

                        <label className="text-center mt-3 text-2xl">Tipo</label>
                        <select {...formulario.register('tipo')} className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 text-center">
                            <option value="ENTRADA">ENTRADA</option>
                            <option value="SAIDA">SAIDA</option>
                        </select>{formulario.formState.errors.tipo && <p className="text-red-500 text-xs mt-2 absolute -bottom-4 left-0">{formulario.formState.errors.tipo.message}</p>}


                    </div>
                    <div className="flex justify-end mt-5">
                    <button className="max-w-24 px-1 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium" type="submit">Cadastrar</button>

                    </div>
                    </form>
                </div>
                <div className="flex gap-2 flex-col p-4">
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
        </>
    )
}