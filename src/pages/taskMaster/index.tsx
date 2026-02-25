import { NavLink } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import * as z from 'zod'
import { LuCheck, LuTrash } from 'react-icons/lu'
export function TaskMaster() {
    const [tarefas, setTarefas] = useState<TypeForm[]>([]);
    useEffect(() => {
        const tarefasArmazenadas = localStorage.getItem('tarefas')

        if (tarefasArmazenadas === null) {
            return setTarefas([])
        }
        setTarefas(JSON.parse(tarefasArmazenadas))
    }, [])

    const regrasTarefas = z.object({
        titulo: z.string().min(5,'Campo origatório.' ),
        categoria: z.string().min(3, 'Campo origatório.'),
        id: z.string().optional(),
        concluido: z.boolean().optional()
    })
    type TypeForm = z.infer<typeof regrasTarefas>
    const formulario = useForm<TypeForm>({
        resolver: zodResolver(regrasTarefas) as Resolver<TypeForm>
    })
    function submeterTarefa(camposTarefas: TypeForm) {

        const montarTarefa: TypeForm = {
            id: Math.random().toString(36).substring(2, 9),
            titulo: camposTarefas.titulo,
            categoria: camposTarefas.categoria,
            concluido: false
        }
        setTarefas(oldState => [...oldState, montarTarefa])
        formulario.reset();
        localStorage.setItem('tarefas', JSON.stringify([...tarefas, montarTarefa]))
    }

    interface IAjustarTarefa {
        id: string,
        tipo: "ATUALIZAR" | "EXCLUIR"
    }



    function ajustarTarefa({ id, tipo }: IAjustarTarefa): void {
        if (tipo === "ATUALIZAR") {
            const novoArrayTarefas = tarefas.map(tarefa => {
                if (tarefa.id === id) {
                    return { ...tarefa, concluido: true }
                }
                return { ...tarefa }
            }
            )
            return setTarefas(novoArrayTarefas)
        }
        if (tipo === "EXCLUIR") {
            const novoArrayTarefas = tarefas.filter(tarefa => tarefa.id !== id)
            return setTarefas(novoArrayTarefas)
        }
    }

    return (
        <>
            <div className="w-full min-h-screen flex flex-col items-center bg-zinc-100 py-8">
                <h1 className="text-2xl font-bold mb-2">Página de Controle de Tarefas</h1>

                <div className="flex gap-6 items-start">

                    <div className="border border-zinc-300 bg-white p-12 mb-6 rounded-md w-[520px] box-border">
                        <form onSubmit={formulario.handleSubmit(submeterTarefa)} className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-zinc-700">Título da Tarefa:</label>
                                <input {...formulario.register('titulo')} type="text" className="w-full border border-zinc-300 px-2 py-1 text-zinc-900" />
                                {formulario.formState.errors.titulo && (
                                    <p className="text-red-500 text-xs mt-2">{formulario.formState.errors.titulo.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-zinc-700">Categoria da Tarefa:</label>
                                <input {...formulario.register('categoria')} type="text" className="w-full border border-zinc-300 px-2 py-1 text-zinc-900 mt-1" />
                                {formulario.formState.errors.categoria && (
                                    <p className="text-red-500 text-xs mt-2">{formulario.formState.errors.categoria.message}</p>
                                )}
                            </div>
                            <div className="flex gap-4 justify-end mt-4">
                                <button type="reset" className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition font-medium">Reset</button>
                                <button className="border border-zinc-400 px-4 py-1 bg-zinc-800 text-white">Enviar</button>
                            </div>
                        </form>
                    </div>
                    <div className="border border-zinc-300 bg-white p-4 w-[520px] box-border rounded-md">
                        <h1 className="text-lg font-bold mb-2">Tarefas Cadastradas</h1>
                        {tarefas.length > 0 && tarefas.map((tarefas, index) => {
                            return (
                                <>
                                    <div key={tarefas.id} className="flex items-center justify-between gap-2">
                                        <p className={tarefas.concluido ? "line-through opacity-70" : ""}>{`Tarefa ${index + 1}: ${tarefas.titulo} - Categoria: ${tarefas.categoria}`}
                                        </p>

                                        <div className="flex gap-2"><LuCheck style={{ cursor: "pointer" }} onClick={() => ajustarTarefa({ id: tarefas.id!, tipo: "ATUALIZAR" })} /><LuTrash style={{ cursor: "pointer" }} onClick={() => ajustarTarefa({ id: tarefas.id!, tipo: "EXCLUIR" })} />
                                        </div>
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