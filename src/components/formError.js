export default function FormError({ message }) {
    return (
        <p className="text-red-500 text-xs italic mb-4">
            {message}
        </p>
    )
}