import { NavLink } from "react-router-dom";

export function Home() {

    return (
        <>  
       
        <div className="w-full h-screen flex flex-col items-center justify-center gap-1 relative">
            <h1 className="text-4xl">Bem vindo a Ferramentas Utilitárias</h1>
            <p className="text-xl text-gray-500">Selecione uma ferramenta abaixo:</p>
            <div className="flex gap-4 mt-12">

            <div className="flex ">
           
            <NavLink className='text-black text-4xl font-semi no-underline bg-blue-500 rounded-2xl w-64 h-32 flex items-center justify-center flex-col' to={'/taskMaster'}>TaskMaster
            <p className="text-xs mt-2 text-black font-bold">Adição, listagem e remoção de tarefas</p>
            </NavLink>

            </div>
            <div className="flex ">
            
            <NavLink className='text-black text-4xl font-semi no-underline bg-blue-500 rounded-2xl w-64 h-32 flex items-center justify-center flex-col' to={'/connectHub'}>ConnectHub
            <p className="text-xs mt-2 text-black font-bold">Conexão entre usuários</p>
            </NavLink>

            </div>
            <div className="flex ">
            
            <NavLink className='text-black text-4xl font-semi no-underline bg-blue-500 rounded-2xl w-64 h-32 flex items-center justify-center flex-col' to={'/moneyFlow'}>MoneyFlow
            <p className="text-xs mt-2 text-black font-bold">Controle de fluxo financeiro</p>
            </NavLink>

            </div>
            </div>
        </div>
        </>
    )
}