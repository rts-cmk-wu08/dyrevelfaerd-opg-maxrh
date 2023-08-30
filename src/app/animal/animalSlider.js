"use client"

import Link from "next/link"
import useSWR from "swr"
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"

export default function AnimalSlider({ params }) {

    const fetcher = url => fetch(url).then(r => r.json())
    const {data, error, isLoading} = useSWR("http://localhost:4000/api/v1/animals", fetcher)
    if (error) { throw new Error('Failed to fetch data') }

    const currentIndex = isLoading ? null : data.findIndex(animal => animal.id === parseInt(params.id))
    const item = isLoading ? null : data[currentIndex]
    const prevItem = isLoading ? null : currentIndex > 0 ? data[currentIndex - 1] : null
    const nextItem = isLoading ? null : currentIndex < data.length - 1 ? data[currentIndex + 1] : null

    return (
        <section className="section">
            <div className="container max-w-6xl mx-auto py-6 md:py-12 px-4 md:px-6">
                <div className="animalSlider">
                    <article className="flex flex-col bg-white rounded overflow-hidden shadow-lg z-10 relative md:flex-row"> 
                        <div className="md:w-1/3">
                            <div className="relative w-full h-0 pb-[50%] md:h-full">
                                {isLoading ? (
                                    <Skeleton height="100%" borderRadius={0} containerClassName="absolute w-full h-full object-cover" style={{ verticalAlign: 'top' }} />
                                ) : (
                                    <img
                                        className="absolute w-full h-full object-cover"
                                        src={`${item?.asset.url}`}
                                        alt={`Image of ${item?.name}`}
                                    /> 
                                )}
                            </div>
                        </div>
                        <div className="flex-1 p-8 md:p-12 relative"> 
                            <span className="absolute top-0 right-0 p-6 text-xs tracking-wider"> 
                                {isLoading ? (
                                    <Skeleton width={28} /> 
                                ) : (
                                    <>{currentIndex + 1} / {data?.length}</>
                                )}
                            </span>
                            <h2 className="uppercase mb-3 font-bold text-lg tracking-wider"> 
                                {isLoading ? <Skeleton width={48} /> : item?.name}
                            </h2>
                            <p className="mb-4 leading-relaxed">{isLoading ? <Skeleton count={3.5} /> : item?.description}</p>
                            <p className="text-sm text-gray-500">
                                {isLoading ? <Skeleton width={32} /> : <>Age: {item?.age}</>}
                            </p>
                        </div>
                    </article>

                    <div className="flex mt-4">
                        {isLoading ? (
                            <Skeleton width={32} containerClassName="mr-auto py-2 px-4" /> 
                        ) : prevItem && (
                            <Link
                                href={`/animal/${prevItem.id}`}
                                className="text-blue-900 hover:text-blue-500 py-2 px-4 flex items-center mr-auto"
                            >
                                &lt; Forrige
                            </Link>
                        )}
                        {isLoading ? (
                            <Skeleton width={32} containerClassName="ml-auto py-2 px-4" /> 
                        ) : nextItem && (
                            <Link
                                href={`/animal/${nextItem.id}`}
                                className="text-blue-900 hover:text-blue-500 py-2 px-4 ml-auto"
                            >
                                Næste &gt;
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}