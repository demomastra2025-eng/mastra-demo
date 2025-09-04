import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BotIcon, ExternalLinkIcon, CodeIcon, SparklesIcon } from 'lucide-react';

const CopilotKitDemo = () => {
    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-semibold">Copilot Kit Demo</h1>
                    <Badge variant="secondary" className="bg-yellow-500 text-white">
                        Coming Soon
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    AI copilot interface framework with advanced context awareness
                </p>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="max-w-2xl text-center space-y-6">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                        <BotIcon className="w-12 h-12 text-white" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold">Copilot Kit Integration</h2>
                        <p className="text-lg text-muted-foreground">
                            Build AI-powered copilots that understand your application context and provide intelligent assistance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <div className="p-6 border rounded-lg space-y-3">
                            <SparklesIcon className="w-8 h-8 text-blue-500" />
                            <h3 className="font-semibold">Context-Aware AI</h3>
                            <p className="text-sm text-muted-foreground">
                                AI that understands your app's state and provides relevant suggestions
                            </p>
                        </div>
                        <div className="p-6 border rounded-lg space-y-3">
                            <CodeIcon className="w-8 h-8 text-green-500" />
                            <h3 className="font-semibold">Easy Integration</h3>
                            <p className="text-sm text-muted-foreground">
                                Simple React hooks and components for rapid development
                            </p>
                        </div>
                    </div>

                    <div className="pt-6 space-y-4">
                        <Button asChild>
                            <a
                                href="https://copilotkit.ai"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2"
                            >
                                Learn More About Copilot Kit
                                <ExternalLinkIcon className="w-4 h-4" />
                            </a>
                        </Button>
                        <p className="text-sm text-muted-foreground">
                            This demo will be available once Copilot Kit integration is implemented.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CopilotKitDemo;
