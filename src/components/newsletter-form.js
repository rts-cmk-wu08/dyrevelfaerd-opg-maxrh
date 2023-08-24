"use client"

import { useForm } from 'react-hook-form'
import FormError from './formError';

const NewsletterForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data); // Log the form data here
    };
   
    return (
        <div className="w-full max-w-sm ml-auto">
            <form onSubmit={handleSubmit(onSubmit)} className="text-sm ">
                <div className="">
                    <input
                        type="email"
                        placeholder="Email"
                        className="shadow appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('email', {
                            required: { value: true, message: 'Email Required' },
                            pattern: { value: /.+@.+/, message: 'Invalid Email' },
                        })}
                    />
                    {errors.email && <FormError message={errors.email.message} />}
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Navn"
                        className="shadow appearance-none border border-blue-300 rounded w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('name', {
                            required: { value: true, message: 'Name Required' },
                            minLength: { value: 2, message: 'Too Short' },                        
                        })}
                    />
                    {errors.name && <FormError message={errors.name.message} />}
                </div>
                <div className="text-right">
                    <button className="bg-blue-900 hover:bg-blue-700 text-white py-3 px-5 rounded focus:outline-none focus:shadow-outline ml-auto" type="submit">Submit</button>
                </div>
            </form>
        </div>
          
    )
}

export default NewsletterForm;