"use client"

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth'

export default function AnimalsForm({ items, selectedId, onDataUpdate }) {
    const [itemId, setItemId] = useState(selectedId)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submissionError, setSubmissionError] = useState(null)
    const [submissionSuccess, setSubmissionSuccess] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

    const auth = useAuth()

    const defaultAssetUrl = 'http://localhost:4000/file-bucket/1589743596506amina.jpg'
    const defaultAssetId = 2

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue, 
        watch, 
        reset,
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true)
            const url = itemId
                ? `http://localhost:4000/api/v1/animals/${itemId}` 
                : 'http://localhost:4000/api/v1/animals'

            const method = itemId ? 'PUT' : 'POST'
            const modifiedData = itemId
                ? { ...data,
                    assetId: watch('assetId') === null ? defaultAssetId : watch('assetId'),
                    asset: { url: watch('asset.url') === null ? defaultAssetUrl : watch('asset.url')},
                    age: parseInt(watch('age')),
                } : { ...data, assetId: defaultAssetId, asset: { url: defaultAssetUrl }, age: parseInt(watch('age')) }

            const res = await fetch(url, {
                method,
                body: JSON.stringify(modifiedData),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.user.accessToken}`,
                },
            })

            if (!res.ok) { throw new Error('An error occurred while processing the request') }

            setSubmissionSuccess(true)
            setIsSubmitting(false)
            onDataUpdate()
        } catch (error) {
            console.error(error)
            setSubmissionError(error.message)
            setIsSubmitting(false)
        }
    }

    const selectedItem = items.find(item => item.id === itemId)

    useEffect(() => {
        setItemId(selectedId)
        setIsDeleteSuccess(false)
    }, [selectedId]);

    useEffect(() => {   
         if (selectedItem) {
            setValue('name', selectedItem?.name)
            setValue('age', selectedItem?.age)
            setValue('description', selectedItem?.description)
            setValue('assetId', selectedItem?.assetId)
            setValue('asset.url', selectedItem.asset?.url)
        }
    }, [selectedItem, setValue])

    const handleDelete = async (id) => {
        try {
            setIsDeleting(true)
            const url = `http://localhost:4000/api/v1/animals/${id}`
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.user.accessToken}`,
                },
            })
            if (!res.ok) { throw new Error('An error occurred while deleting the animal')}
            setIsDeleting(false)
            setIsDeleteSuccess(true)
            reset()
            onDataUpdate()
        } catch (error) {
            console.error(error)
            setIsDeleting(false)
        }
    }

    useEffect(() => {
        if (submissionSuccess || isDeleteSuccess) {
            const successTimeout = setTimeout(() => {
                setSubmissionSuccess(false)
                setIsDeleteSuccess(false)
            }, 3000)
            return () => clearTimeout(successTimeout);
        }
    }, [submissionSuccess, isDeleteSuccess]);

    return (
        <div className="bg-slate-100 mx-auto p-6 rounded-md md:p-8" >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm" >
                <div className="flex space-x-4">
                    <div className="w-full md:w-1/2">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            className="mt-1 py-3 px-4 w-full rounded-md border border-slate-200 focus:outline-none focus:border-slate-400"
                            {...register('name', {
                                required: { value: true, message: 'Name Required' },
                                minLength: { value: 2, message: 'Too Short' },                        
                            })}
                        />
                        {errors.name && <p className="text-red-500 mt-2">{errors.name.message}</p>}

                    </div>
                    <div className="w-24">
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Age"
                            className="mt-1 py-3 px-4 w-full rounded-md border border-slate-200 focus:outline-none focus:border-slate-400"
                            {...register('age', {
                                required: { value: true, message: 'Age Required' },
                                max: { value: 100, message: 'Too old' },                     
                            })}
                        />
                        {errors.age && <p className="text-red-500 mt-2">{errors.age.message}</p>}

                    </div>
                </div>
                <div>
                    <textarea
                        id="description"
                        name="description"
                        rows="8"
                        placeholder="Description"
                        className="py-3 px-4 w-full rounded-md border border-slate-200 focus:outline-none focus:border-slate-400"
                        {...register('description', {
                            required: { value: true, message: 'Description Required' },
                            minLength: { value: 10, message: 'Too short' },                        
                        })}
                    />
                    {errors.description && <p className="text-red-500 mt-2">{errors.description.message}</p>}
                </div>
                
                <div className='form-submit flex'>
                    <button
                        type="submit"
                        className={`inline-block py-3 px-6 rounded-md mr-4 ${
                            isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : submissionSuccess
                                ? 'bg-green-600 text-white'
                                : itemId
                                ? 'bg-blue-900 text-white hover:bg-blue-600'
                                : 'bg-blue-900 text-white hover:bg-blue-600'
                        }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? 'Submitting...'
                            : submissionSuccess
                            ? 'Submitted Successfully'
                            : itemId // Update button text for editing
                            ? 'Update'
                            : 'Add New'
                        }
                    </button>

                    {itemId && (
                        <button
                            type="button"
                            className={`inline-block py-3 px-6 rounded-md mr-4 ${
                                isDeleting
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-slate-200 hover:text-white hover:bg-red-600'
                            }`}
                            onClick={() => handleDelete(itemId)}
                            disabled={isDeleting}
                        >
                        {isDeleting
                            ? 'Deleting...'
                            : isDeleteSuccess
                            ? 'Deleted Successfully'
                            : 'Delete'
                        }
                        </button>
                    )}

                    <button
                        type="button"
                        className={"inline-block py-3 px-6 rounded-md mr-4 bg-slate-200 hover:bg-slate-300" }
                        disabled={isSubmitting}
                        onClick={() => {
                            clearErrors()
                            reset()
                            setItemId(null)
                        }}
                    >
                        Clear
                    </button>
                    
                </div>
                {submissionError  && (
                    <p className="text-red-500 mt-2">{submissionError}</p>
                )}
            </form>
        </div>
    )
}

