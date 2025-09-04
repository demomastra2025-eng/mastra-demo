import FrameworkSwitcher from './components/framework-switcher'
import { TooltipProvider } from '@/components/ui/tooltip'
import './index.css'

function App() {
    return (
        <TooltipProvider>
            <FrameworkSwitcher />
        </TooltipProvider>
    )
}

export default App
