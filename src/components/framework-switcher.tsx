import React, { useState } from 'react'
import { Sidebar, SidebarHeader, SidebarContent, SidebarItem } from '@/components/ui/sidebar'
import { Badge } from '@/components/ui/badge'
import {
    BotIcon,
    CodeIcon,
    SparklesIcon,
    MessageSquareIcon
} from 'lucide-react'

// Import demo components
import AISdkDemo from './demos/aisdk-demo'
import CopilotKitDemo from './demos/copilot-kit-demo'
import AssistantUIDemo from './demos/assistant-ui-demo'

type Framework = 'aisdk' | 'copilot-kit' | 'assistant-ui'

const frameworks = [
    {
        id: 'aisdk' as Framework,
        name: 'AI SDK React',
        description: 'Mastra with AI SDK React',
        icon: SparklesIcon,
        status: 'Active',
        statusColor: 'bg-green-500'
    },
    {
        id: 'copilot-kit' as Framework,
        name: 'Copilot Kit',
        description: 'Mastra + AGUI',
        icon: BotIcon,
        status: 'Coming Soon',
        statusColor: 'bg-yellow-500'
    },
    {
        id: 'assistant-ui' as Framework,
        name: 'Assistant UI',
        description: 'Mastra + Assistant UI',
        icon: MessageSquareIcon,
        status: 'Active',
        statusColor: 'bg-green-500'
    }
]

const FrameworkSwitcher: React.FC = () => {
    const [activeFramework, setActiveFramework] = useState<Framework>('aisdk')

    const renderDemo = () => {
        switch (activeFramework) {
            case 'aisdk':
                return <AISdkDemo />
            case 'copilot-kit':
                return <CopilotKitDemo />
            case 'assistant-ui':
                return <AssistantUIDemo />
            default:
                return <AISdkDemo />
        }
    }

    return (
        <div className="flex h-screen bg-background">
            <Sidebar>
                <SidebarHeader>
                    <CodeIcon className="h-6 w-6" />
                    <div>
                        <h2 className="text-lg font-semibold">UI Frameworks</h2>
                        <p className="text-sm text-muted-foreground">Choose a chatbot implementation</p>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <div className="space-y-2">
                        {frameworks.map((framework) => {
                            const Icon = framework.icon
                            return (
                                <SidebarItem
                                    key={framework.id}
                                    active={activeFramework === framework.id}
                                    onClick={() => setActiveFramework(framework.id)}
                                    className="flex-col items-start gap-2"
                                >
                                    <div className="flex w-full items-center gap-3">
                                        <Icon className="h-5 w-5 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium truncate">{framework.name}</span>
                                                <Badge
                                                    variant="secondary"
                                                    className={`text-xs ${framework.statusColor} text-white`}
                                                >
                                                    {framework.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {framework.description}
                                            </p>
                                        </div>
                                    </div>
                                </SidebarItem>
                            )
                        })}
                    </div>
                </SidebarContent>
            </Sidebar>

            <main className="flex-1 overflow-hidden">
                {renderDemo()}
            </main>
        </div>
    )
}

export default FrameworkSwitcher
