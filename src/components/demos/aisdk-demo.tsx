'use client';
import { DefaultChatTransport } from 'ai';
import { Fragment } from 'react';
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import {
    PromptInput,
    PromptInputButton,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { useChat } from "@ai-sdk/react";
import {
    Actions,
    Action,
} from '@/components/ai-elements/actions';
import { useState } from 'react';
import { Response } from '@/components/ai-elements/response';
import { CopyIcon, GlobeIcon, RefreshCcwIcon } from 'lucide-react';
import {
    Source,
    Sources,
    SourcesContent,
    SourcesTrigger,
} from '@/components/ai-elements/sources';
import {
    Reasoning,
    ReasoningContent,
    ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Loader } from '@/components/ai-elements/loader';
import { Badge } from '@/components/ui/badge';

const models = [
    {
        name: 'GPT 4o',
        value: 'openai/gpt-4o',
    },
    {
        name: 'Deepseek R1',
        value: 'deepseek/deepseek-r1',
    },
];

const AISdkDemo = () => {
    const [input, setInput] = useState('');
    const [model, setModel] = useState<string>(models[0].value);
    const [webSearch, setWebSearch] = useState(false);

    const { error, status, sendMessage, messages, regenerate, stop } =
        useChat({
            transport: new DefaultChatTransport({
                api: 'http://localhost:4111/chat/ghibliAgent',
            }),
        });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(
                { text: input },
                {
                    body: {
                        model: model,
                        webSearch: webSearch,
                    },
                },
            );
            setInput('');
        }
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 py-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-semibold">AI SDK React Demo</h1>
                    <Badge variant="secondary" className="bg-green-500 text-white">
                        Active
                    </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    Built with Vercel AI SDK and React hooks
                </p>
            </div>

            {/* Chat Interface */}
            <div className="flex-1 p-6 overflow-hidden">
                <div className="max-w-4xl mx-auto h-full flex flex-col">
                    <Conversation className="h-full">
                        <ConversationContent>
                            {messages.map((message) => (
                                <div key={message.id}>
                                    {message.role === 'assistant' && message.parts.filter((part) => part.type === 'source-url').length > 0 && (
                                        <Sources>
                                            <SourcesTrigger
                                                count={
                                                    message.parts.filter(
                                                        (part) => part.type === 'source-url',
                                                    ).length
                                                }
                                            />
                                            {message.parts.filter((part) => part.type === 'source-url').map((part, i) => (
                                                <SourcesContent key={`${message.id}-${i}`}>
                                                    <Source
                                                        key={`${message.id}-${i}`}
                                                        href={part.url}
                                                        title={part.url}
                                                    />
                                                </SourcesContent>
                                            ))}
                                        </Sources>
                                    )}
                                    {message.parts.map((part, i) => {
                                        switch (part.type) {
                                            case 'text':
                                                return (
                                                    <Fragment key={`${message.id}-${i}`}>
                                                        <Message from={message.role}>
                                                            <MessageContent>
                                                                <Response>
                                                                    {part.text}
                                                                </Response>
                                                            </MessageContent>
                                                        </Message>
                                                        {message.role === 'assistant' && i === messages.length - 1 && (
                                                            <Actions className="mt-2">
                                                                <Action
                                                                    onClick={() => regenerate()}
                                                                    label="Retry"
                                                                >
                                                                    <RefreshCcwIcon className="size-3" />
                                                                </Action>
                                                                <Action
                                                                    onClick={() =>
                                                                        navigator.clipboard.writeText(part.text)
                                                                    }
                                                                    label="Copy"
                                                                >
                                                                    <CopyIcon className="size-3" />
                                                                </Action>
                                                            </Actions>
                                                        )}
                                                    </Fragment>
                                                );
                                            case 'reasoning':
                                                return (
                                                    <Reasoning
                                                        key={`${message.id}-${i}`}
                                                        className="w-full"
                                                        isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                                                    >
                                                        <ReasoningTrigger />
                                                        <ReasoningContent>{part.text}</ReasoningContent>
                                                    </Reasoning>
                                                );
                                            default:
                                                return null;
                                        }
                                    })}
                                </div>
                            ))}
                            {status === 'submitted' && <Loader />}
                        </ConversationContent>
                        <ConversationScrollButton />
                    </Conversation>

                    <PromptInput onSubmit={handleSubmit} className="mt-4">
                        <PromptInputTextarea
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            placeholder="Ask me anything about Studio Ghibli..."
                        />
                        <PromptInputToolbar>
                            <PromptInputTools>
                                <PromptInputButton
                                    variant={webSearch ? 'default' : 'ghost'}
                                    onClick={() => setWebSearch(!webSearch)}
                                >
                                    <GlobeIcon size={16} />
                                    <span>Search</span>
                                </PromptInputButton>
                                <PromptInputModelSelect
                                    onValueChange={(value) => {
                                        setModel(value);
                                    }}
                                    value={model}
                                >
                                    <PromptInputModelSelectTrigger>
                                        <PromptInputModelSelectValue />
                                    </PromptInputModelSelectTrigger>
                                    <PromptInputModelSelectContent>
                                        {models.map((model) => (
                                            <PromptInputModelSelectItem key={model.value} value={model.value}>
                                                {model.name}
                                            </PromptInputModelSelectItem>
                                        ))}
                                    </PromptInputModelSelectContent>
                                </PromptInputModelSelect>
                            </PromptInputTools>
                            <PromptInputSubmit disabled={!input} status={status} />
                        </PromptInputToolbar>
                    </PromptInput>
                </div>
            </div>
        </div>
    );
};

export default AISdkDemo;
