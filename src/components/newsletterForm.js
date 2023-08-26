"use client"

import { useForm } from 'react-hook-form'

export default function NewsletterForm() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const res = await fetch('http://localhost:4000/api/v1/subscribers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            if (!res.ok) {
                if (res.status === 500) {
                    console.log('Subscriber already exists');
                } else {
                    throw new Error('An error occurred while processing the request');
                }
            } else {
                console.log('Successfully subscribed');
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full max-w-sm ml-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
                <div>
                    <input
                        type="text"
                        placeholder="Navn"
                        className="shadow appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('name', {
                            required: { value: true, message: 'Name Required' },
                            minLength: { value: 2, message: 'Too Short' },                        
                        })}
                    />
                    {errors.name && <p className="text-red-500 text-xs italic mb-4">{errors.name?.message}</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Email"
                        className="shadow appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('email', {
                            required: { value: true, message: 'Email Required' },
                            pattern: { value: /.+@.+/, message: 'Invalid Email' },
                        })}
                    />
                    {errors.email && <p className="text-red-500 text-xs italic mb-4">{errors.email?.message}</p>}
                </div>
                <div className="text-right">
                    <button className="bg-blue-900 hover:bg-blue-700 text-white py-3 px-5 rounded focus:outline-none focus:shadow-outline ml-auto" type="submit">Submit</button>
                </div>
            </form>
        </div>
          
    )
}