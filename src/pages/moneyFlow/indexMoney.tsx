import { NavLink } from "react-router-dom";

export function MoneyFlow() {

    return (
        <>
            <h1>Exemplo da página MoneyFlow</h1>
            <NavLink className='text-xs text-cyan-800 underline' to={'/'}>Link para página inicial</NavLink>
        </>
    )
}