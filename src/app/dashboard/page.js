import DashboardAnimals from "./dashboardAnimals"

export default function Dashboard() {

    return (
        <main className="flex min-h-screen flex-col border-t">
            
            <section className="dashboard-section">
                <div className="container max-w-6xl mx-auto py-12 px-6">
                    This is the dashboard



                    <DashboardAnimals />

                </div>
            </section>
        </main>
    )
}