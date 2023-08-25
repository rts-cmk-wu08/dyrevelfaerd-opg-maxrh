"use client"

import DashboardAnimals from "./dashboardAnimals"
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Dashboard() {
    const router = useRouter();
    const auth = useAuth();

    useEffect(() => {
        // Check if the user is not authenticated
        if (!auth.user) {
            router.push('/login');
        }
    }, [auth.user]);

    if (!auth.user) { return null } // If user is not authenticated, return null to prevent rendering

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