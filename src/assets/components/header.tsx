import { NavLink, useLocation } from "react-router-dom"



export function Header() {
    const { pathname } = useLocation()
    const routeSelecionada = pathname

    const selecionadoCss = 'py-2 px-4 rounded-xl bg-zinc-100 '

    return (
        <>
            <header className="w-[100%] h-[8vh] bg-white flex items-center justify-between fixed shadow-md relative">
                <h1 className="text-3 text-black flex font-bold px-45 ">Ferramentas Utilitárias</h1>
                <ul className="flex justify-center items-center gap-4 px-6">
                    <li className="text-gray-700  font-bold "><NavLink to="/" className={`${routeSelecionada === '/' ? selecionadoCss : ''}`}>Home</NavLink></li>
                    <li className="text-gray-700 font-bold  "><NavLink to="/taskMaster" className={`${routeSelecionada === '/taskMaster' ? selecionadoCss : ''}`}>TaskMaster</NavLink></li>
                    <li className="text-gray-700 font-bold "><NavLink to="/connectHub" className={`${routeSelecionada === '/connectHub' ? selecionadoCss : ''}`}>ConnectHub</NavLink> </li>
                    <li className="text-gray-700   font-bold" ><NavLink to="/moneyFlow" className={`${routeSelecionada === '/moneyFlow' ? selecionadoCss : ''}`}>MoneyFlow</NavLink></li>
                </ul>
            </header>
        </>
    )
}