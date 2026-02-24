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
            <nav className="bg-cyan-900 h-16 flex items-center justify-between px-8 text-zinc-100">
                <h1>TaskMaster</h1>
                <ul className="flex gap-6">
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/connectHub'}>ConnectHub</NavLink></li>
                    <li><NavLink to={'/moneyFlow'}>MoneyFlow</NavLink></li>

                </ul>
            </nav>
            <div className="w-full h-screen flex items-center justify-center flex-col">
                <form onSubmit={formulario.handleSubmit(submeterTarefa)} className="flex flex-col gap-4">
                    <div className="flex flex-col relative">
                        <label>Título da Tarefa:</label>
                        <input {...formulario.register('titulo')} type="text" className="border border-solid border-gray-400 text-zinc-900 max-w-100 rounded-sm px-2 py-1" />
                        {formulario.formState.errors.titulo && (
                            <span className="text-red-500 text-xs absolute -bottom-4 left-0">{formulario.formState.errors.titulo.message}</span>
                        )}
                    </div>
                    <div className="flex flex-col relative">
                        <label>Categoria da Tarefa:</label>
                        <input {...formulario.register('categoria')} type="text" className="border border-solid border-gray-400 text-zinc-900 max-w-100 rounded-sm px-2 py-1" />
                        {formulario.formState.errors.categoria && (
                            <span className="text-red-500 text-xs absolute -bottom-4 left-0">{formulario.formState.errors.categoria.message}</span>
                        )}
                    </div>
                    <div className="flex max-w-100 gap-4 justify-center mt-4">
                        <button type="reset" className="p-2 border border-zinc-600 rounded-sm">Reset</button>
                        <button className="p-2 border border-zinc-600 rounded-sm bg-zinc-900 text-zinc-50">Enviar</button>
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

        </>
    )
}