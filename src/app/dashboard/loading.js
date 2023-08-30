import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css"

export default function Loading() {
    return (
        <table className="w-full text-sm">
            <thead>
                <tr className=" text-center">
                    <th className="p-4 bg-slate-100 rounded-tl-md">Image</th>
                    <th className="p-4 bg-slate-100">Name</th>
                    <th className="p-4 bg-slate-100">Age</th>
                    <th className="p-4 bg-slate-100 text-left">Description</th>
                    <th className="p-4 bg-slate-100 rounded-tr-md">Actions</th>
                </tr>
            </thead>
            <tbody >
                {Array.from({ length: 8 }, (_, index) => (
                    <tr key={index} className="border-t text-center">
                        <td className="p-4">
                            <div className="rounded-full overflow-hidden w-20 h-20">
                                <Skeleton height="100%" borderRadius={0} containerClassName="w-full h-full object-cover" style={{ verticalAlign: 'top' }} />
                            </div>
                        </td>
                        <td className="p-4 font-medium">
                            <Skeleton width={55} />
                        </td>
                        <td className="p-4">
                            <Skeleton width={20} />
                        </td>
                        <td className="p-4 text-left w-full">
                            <Skeleton count={2.5} width="100%" containerClassName="w-full block" />
                        </td>
                        <td className="p-4">
                            <Skeleton width={30} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}            