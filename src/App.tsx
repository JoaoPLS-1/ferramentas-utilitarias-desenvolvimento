import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Home } from './pages/home'
import { TaskMaster } from './pages/taskMaster'
import { ConnectHub } from './pages/connectHub/indexConnect'
import { MoneyFlow } from './pages/moneyFlow/indexMoney'
export function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/taskMaster' element={<TaskMaster />} />
                <Route path='connectHub' element={<ConnectHub />}/>
                <Route path='moneyFlow' element={<MoneyFlow />} />
            </Routes>
        </BrowserRouter>
    )
}