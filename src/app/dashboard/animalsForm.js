"use client"

import { useForm } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth'

export default function AnimalsForm({ items, selectedId, onDataUpdate }) {
    const [submissionError, setSubmissionError] = useState(null)
    const [deleteState, setDeleteState] = useState({ isDeleting: false, isDeleteSuccessful: false })
    const [submitState, setSubmitState] = useState({ isSubmitting: false, isSubmitSuccessful: false })

    const [itemId, setItemId] = useState(selectedId)
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
            setSubmitState({ ...submitState, isSubmitting: true })
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

            if (!res.ok) { 
                throw new Error('An error occurred while processing the request') 
            }
            setSubmitState({ ...submitState, isSubmitting: false, isSubmitSuccessful: true })
            onDataUpdate()
        } catch (error) {
            console.error(error)
            setSubmissionError(error.message)
            setSubmitState({ ...submitState, isSubmitting: false, isSubmitSuccessful: false })
        }
    }

    const handleDelete = async (id) => {
        try {
            setDeleteState({ ...deleteState, isDeleting: true })
            const url = `http://localhost:4000/api/v1/animals/${id}`
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.user.accessToken}`,
                },
            })
            if (!res.ok) { throw new Error('An error occurred while deleting the animal')}

            setDeleteState({ ...deleteState, isDeleting: false, isDeleteSuccessful: true})
            onDataUpdate()
        } catch (error) {
            console.error(error)
            setSubmissionError(error.message)
            setDeleteState({ ...deleteState, isDeleting: false, isDeleteSuccessful: false})
        }
    }

    useEffect(() => {
        setItemId(selectedId)
    }, [selectedId])

    const selectedItem = items.find(item => item.id === itemId)

    useEffect(() => {   
         if (selectedItem) {
            setValue('name', selectedItem?.name)
            setValue('age', selectedItem?.age)
            setValue('description', selectedItem?.description)
            setValue('assetId', selectedItem?.assetId)
            setValue('asset.url', selectedItem.asset?.url)
        }
    }, [selectedItem])

    useEffect(() => {
        if (submitState.isSubmitSuccessful || deleteState.isDeleteSuccessful) {
            const successTimeout = setTimeout(() => {
                setSubmitState({ ...submitState, isSubmitSuccessful: false })
                setDeleteState({ ...deleteState, isDeleteSuccessful: false })
            }, 3000)
            return () => clearTimeout(successTimeout)
        }
    }, [submitState.isSubmitSuccessful, deleteState.isDeleteSuccessful])

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
                        <ErrorMessage errors={errors} name="name" render={({ message }) => <p className='text-red-500 mt-2'>{message}</p>} />
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
                        <ErrorMessage errors={errors} name="age" render={({ message }) => <p className='text-red-500 mt-2'>{message}</p>} />
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
                    <ErrorMessage errors={errors} name="description" render={({ message }) => <p className='text-red-500 mt-2'>{message}</p>} />
                </div>
                
                <div className='form-submit flex'>
                    <button
                        type="submit"
                        className={`inline-block py-3 px-6 rounded-md mr-4 ${
                            submitState.isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : submitState.isSubmitSuccessful
                                ? 'bg-green-600 text-white'
                                : itemId
                                ? 'bg-blue-900 text-white hover:bg-blue-600'
                                : 'bg-blue-900 text-white hover:bg-blue-600'
                        }`}
                        disabled={submitState.isSubmitting}
                    >
                        {submitState.isSubmitting
                            ? 'Submitting...'
                            : submitState.isSubmitSuccessful
                            ? 'Submitted Successfully'
                            : itemId 
                            ? 'Update'
                            : 'Add New'
                        }
                    </button>

                    {itemId && (
                        <button
                            type="button"
                            className={`inline-block py-3 px-6 rounded-md mr-4 ${
                                deleteState.isDeleting
                                    ? 'bg-slate-200 cursor-not-allowed'
                                    : deleteState.isDeleteSuccessful
                                    ? 'bg-red-900 text-white hover:bg-red-600'
                                    : 'bg-red-900 text-white hover:bg-red-600'
                            }`}
                            onClick={() => handleDelete(itemId)}
                            disabled={deleteState.isDeleting}
                        >
                        {deleteState.isDeleting
                            ? 'Deleting...'
                            : deleteState.isDeleteSuccessful
                            ? 'Deleted Successfully'
                            : 'Delete'
                        }
                        </button>
                    )}

                    <button
                        type="button"
                        className={"inline-block py-3 px-6 rounded-md mr-4 bg-slate-200 hover:bg-slate-300" }
                        onClick={() => {
                            clearErrors()
                            reset()
                            setItemId(null)
                            setDeleteState({ ...deleteState, isDeleting: false, isDeleteSuccessful: false})
                            setSubmitState({ ...submitState, isSubmitting: false, isSubmitSuccessful: false })
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

