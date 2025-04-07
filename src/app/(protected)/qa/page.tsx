export default function QaPage() {
    return (
        <div className="flex flex-col w-full h-screen p-4">
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Log Analyzer Interface</h1>
                <p className="mt-2 text-muted-foreground">
                    Interactive log analysis dashboard
                </p>
            </div>
            <div className="flex-1 w-full border rounded-lg overflow-hidden">
                <iframe
                    src="http://127.0.0.1:8000/"
                    className="w-full h-full"
                    title="Log Analyzer"
                    sandbox="allow-same-origin allow-scripts allow-forms"
                />
            </div>
        </div>
    );
}