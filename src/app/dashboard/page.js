"use client"

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Tabs from './tabs'
import useAuth from '../hooks/useAuth'

export default function Dashboard() {
    const router = useRouter()
    const auth = useAuth()

    // If user is not logged in, redirect to login page

    useEffect(() => {
        if (!auth.user) { router.push('/login') }
    }, [auth.user])

    return (
        <main className="flex min-h-screen flex-col border-t">
            <section className="dashboard-section">
                <div className="container max-w-6xl mx-auto py-12 px-6">
                    <h1 className="text-5xl mb-10">/dashboard</h1>
                    <Tabs /> 
                </div>
            </section>
        </main>
    )
}