import { NavLink } from "react-router-dom";

export function Home() {

    return (
        <>  
       
        <div className="w-full h-screen flex flex-col items-center justify-center gap-8 relative">
            <h1 className="absolute top-5 text-6xl">Ferramentas Utilitárias</h1>
            <div className="flex gap-4">

            <div className="flex ">
           
            <NavLink className='text-black text-4xl font-bold no-underline bg-gray-700 rounded-2xl w-64 h-32 flex items-center justify-center' to={'/taskMaster'}>TaskMaster</NavLink>

            </div>
            <div className="flex ">
            
            <NavLink className='text-black text-4xl font-bold no-underline bg-gray-700 rounded-2xl w-64 h-32 flex items-center justify-center ' to={'/connectHub'}>ConnectHub</NavLink>

            </div>
            <div className="flex ">
            
            <NavLink className='text-black text-4xl font-bold no-underline bg-gray-700 rounded-2xl w-64 h-32 flex items-center justify-center ' to={'/moneyFlow'}>MoneyFlow</NavLink>

            </div>
            </div>
        </div>
        </>
    )
}