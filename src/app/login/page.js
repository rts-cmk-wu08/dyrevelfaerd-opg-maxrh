"use client"

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import useAuth from '../hooks/useAuth';

export default function Login() {

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
                // Now you can use the token to set the user as authenticated.
                auth.signin(tokenData, () => {
                    // Do something after successful login, like redirecting.
                })
                console.log(tokenData)

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
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
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
                                    className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                    id="password" 
                                    type="password"
                                     placeholder="************" 
                                     {...register('password', {
                                        required: { value: true, message: 'Password Required' },
                                        minLength: { value: 2, message: 'For kort' },                        
                                    })}
                                />
                                <p className="text-red-500 text-xs italic">Vælg venligst et password.</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button 
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                    type="submit"
                                >
                                    Log ind
                                </button>
                                <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                    Opret bruger
                                </Link>
                            </div>
                        </form>

                            <p className="text-center text-gray-500 text-xs">
                                &copy;2020 Acme Corp. All rights reserved.
                            </p>

                    </div>
                </div>
            </section>
        </main>
    )
}