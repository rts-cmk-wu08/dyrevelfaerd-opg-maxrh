export default function Animal({ params }) {
    return (
        <main className="flex min-h-screen flex-col">
            <div className="container max-w-6xl mx-auto py-12 px-6">My animal: {params.id}</div>
        </main>
    )
}