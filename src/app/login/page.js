"use client"

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const auth = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:4000/auth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password,
                }),
            })
            
            if (res.ok) {
                const tokenData = await res.json();
                auth.signin(tokenData, () => {
                    // Navigate to the dashboard after successful login
                    router.push('/dashboard');
                });
            } else {
                // Handle failed login, show an error message, etc.
            }
        } catch (error) {
            // Handle fetch error.
        }
    }

    return (
        <main className="flex min-h-screen flex-col border-t">
            <section className="animal-section">
                <div className="container max-w-6xl mx-auto py-12 px-6">

                    <div className="w-full max-w-xs m-auto">
                        <form  onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Brugernavn</label>
                                <input 
                                    className="shadow appearance-none border border-blue-300  rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="username" 
                                    type="text" 
                                    placeholder="Brugernavn" 
                                    {...register('username', {
                                        required: { value: true, message: 'Brugernavn Required' },
                                        minLength: { value: 2, message: 'For kort' },                        
                                    })}
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                                <input 
                                    className="shadow appearance-none border border-blue-300  rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="password" 
                                    type="password"
                                     placeholder="****" 
                                     {...register('password', {
                                        required: { value: true, message: 'Password Required' },
                                    })}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-3 px-5 rounded focus:outline-none focus:shadow-outline" 
                                    type="submit"
                                >
                                    Log ind
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    )
}