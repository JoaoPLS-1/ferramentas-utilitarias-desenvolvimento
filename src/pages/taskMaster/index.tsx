import { NavLink } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
        titulo: z.string().min(5, 'Mínimo 5 caracteres.'),
        categoria: z.string().min(3, 'Minimo 3 caracteres.'),
        id: z.string().optional(),
        concluido: z.boolean().optional()
    })
    type TypeForm = z.infer<typeof regrasTarefas>
    const formulario = useForm<TypeForm>({
        resolver: zodResolver(regrasTarefas)
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
            <div className="w-full h-screen flex items-center justify-center flex-col">
                <div className="w-full max-w-xl bg-white shadow rounded-2xl p-6 mt-6 flex flex-col gap-4">
                <h1 className="text-4xl text-center">Página de Controle de Tarefas</h1>
                <form onSubmit={formulario.handleSubmit(submeterTarefa)} className="flex flex-col gap-4">
                    <div className="flex flex-col relative">
                        <label className="text-center mt-3 text-2xl">Título da Tarefa:</label>
                        <input {...formulario.register('titulo')} type="text" className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 text-center" />
                        {formulario.formState.errors.titulo && (
                            <span className="text-red-500 text-xs absolute -bottom-4 left-0">{formulario.formState.errors.titulo.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col relative">
                        <label className="text-center mt-3 text-2xl">Categoria da Tarefa:</label>
                        <input {...formulario.register('categoria')} type="text" className="w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 text-center mt-1" />
                        {formulario.formState.errors.categoria && (
                            <span className="text-red-500 text-xs absolute -bottom-4 left-0">{formulario.formState.errors.categoria.message}</span>
                        )}
                    </div>
                    <div className="flex gap-4 justify-end mt-4">
                        <button type="reset" className="p-2 border border-zinc-600 hover:bg-zinc-200 rounded-sm">Reset</button>
                        <button className="p-2 border border-zinc-600 rounded-sm bg-blue-600 hover:bg-blue-700 text-zinc-50">Enviar</button>
                    </div>
                </form>
                <div className="flex gap-2 flex-col p-4">
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