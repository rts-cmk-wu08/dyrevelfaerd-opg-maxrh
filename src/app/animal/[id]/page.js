import AnimalSlider from "../animalSlider"

export default function Animal({ params }) {

    return (
        <main className="flex min-h-screen flex-col border-t">
            <AnimalSlider params={params} />
        </main>
    )
}