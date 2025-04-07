export default function ChatPage() {
    return (
        <div className="flex flex-col w-full h-screen p-4">
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Log Chat</h1>
                <p className="mt-2 text-muted-foreground">
                    Chat with your logs
                </p>
            </div>
            <div className="flex-1 w-full border rounded-lg overflow-hidden">
                <iframe
                    src="http://127.0.0.1:8001/"
                    className="w-full h-full"
                    title="Log Analyzer"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                />
            </div>
        </div>
    );
}