# Projektdokumentation

## Opgavens navn: 

Udvikling af website 'Foreningen for Dyrevelfærd'

## Dit fulde navn: 

Max Robert Hargreave

## Holdnummer: 

[Dit Holdnummer]

## Applikation teknologi stack:

- Framework: Next.js
- CSS Framework: Tailwind CSS
- Tredjepartspakker: swr, js-cookie, react-loading-skeleton, react-hook-form, @hookform/error-message

## URL til sitet:

https://localhost:3000

## URL til login-formular:

https://localhost:3000/login

## Brugernavne og adgangskoder:

- Brugernavn: admin
- Adgangskode: 1234


## Selvvurdering af indsats og gennemførelse

Jeg vurderer min indsats og fuldførelse af opgaven inden for de opstillede rammer som tilfredsstillende. Jeg har investeret meget tid og bestræbt mig på at opfylde opgavens krav ud over forventning. Desværre må jeg også erkende, at havde misforstået afleveringsfristen og først opdagede sent tirsdag, at det allerede var om eftermiddagen, og vi ikke havde hele aftenen til rådighed, så tirsdag nåede jeg intet på projektet. Derfor er der visse finpudsnings-detaljer, som jeg gerne ville have afsluttet, men ikke fik med. Dette drejer sig primært om tilpasning til mobilvisning, der ikke er konsekvent, samt SEO og en manglende footer-tekst. Generelt ville jeg også gerne have optimeret og ensrettet mere af koden, som f.eks. fetch-funktioner gennem alle komponenter, da jeg først implementerede SWR senere i forløbet. Desuden er 'skeletvisninger' til loading kun implementeret i animalSlider.js og dashboards tabsContent.js tabellen, dette kunne udvides til formulare og andre komponenter og yderligere finpudses.


## Valg af løsningsmetoder

1. **Next.js:** Jeg valgte Next.js som frameworks for at udnytte server-side rendering og routing-funktionalitet, hvilket resulterer i en hurtigere og mere brugervenlig app.
2. **Tailwind CSS:** Jeg bruger Tailwind CSS til styling af komponenter, som kommer integreret i next.js og giver en hurtig udviklingsproces og mulighed for nem tilpasning af design. Jeg har benyttet 'copy/paste' princippet for styling af komponenter, der betyder komponentet skal kunne copy/pastes problemfrit til andre next/tailwind projekter og stadig fremstå med korrekt styling uden yderligere css.
3. **Tredjepartspakker:** Der bruges js-cookie til håndtering af cookies, react-loading-skeleton til at forbedre brugeroplevelsen under loading, react-hook-form og @hookform/error-message til håndtering af formularer og validering, samt SWR til fetch og caching.

## Oprindelse af tredjeparts kode

Anvendt tredjeparts kode er hentet via npm fra de officielle pakker. 
Alle pakker er open-source, opfylder opgavens krav og er pålidelige.

- https://www.npmjs.com/package/swr
- https://www.npmjs.com/package/js-cookie
- https://www.npmjs.com/package/react-hook-form
- https://www.npmjs.com/package/@hookform/error-message
- https://www.npmjs.com/package/react-loading-skeleton

next.js er installeret med App Router, Tailwind og Eslint.


## Design valg

- **Skrifttype:** Det udleverede design anvendte Oswald-fonten til alle tekster, hvilket resulterede i dårlig læsevenlighed i brødtekster og alle mindre tekster på siden. Af denne grund har jeg ændret brødteksten til Poppins, der fremstår skarp og læsevenlig på alle skærme og i små størrelser.

- **Kapitaler:** Det udleverede design anvendte kapitaler i overskrifterne meget inkonsekvent. De er blevet ensrettet så der nu kun benyttes kapitaler til 'Bliv Frivillig' kortets overskrift og navne i 'Dyr hos os' listen. 

- **Luftafstande:** Det udleverede design havde manglende og inkonsekvent luftafstand mellem mange af elementerne. Dette er blevet justeret for at skabe mere luft og ensartethed på hele siden.

- **Bliv frivllig cards:** Det udleverede design havde lysegrå flader oven på lyseblå flader, hvilket var uæstetisk og unødvendigt. Jeg har derfor fjernet de grå flader og skabt den samme fornemmelse af en 'card-header' ved at lade billedet strække sig over hele bredden. Til ekstra felt i bunden er den grå flade udskiftet med en svag grå streg.

- **Nyhedsbrevs form:** Form-felter er lagt i kolonne isteder for en række, det ser lidt bedre ud. 


## Særlige punkter til bedømmelse

- **Brug af komponenter:** Koden er organiseret i genanvendelige og velstrukturerede komponenter for at opnå et mere vedligeholdelsesvenlig og skalerbart website. Særligt TabsContent og TabsForm komponenterne er der brugt en del tid på at gøre generiske og dynamiske, så de tilpasser sig forskellige data input. Det betyder vi kun behøver 2 komponenter til at vise alle formulare og tabeller i dashboard.

- **Data loading med skeleton:** Der er benyttet react-loading-skeleton med et loading.js komponent i dashboard-tabeller, og implementeret inline i animalSlider.js for en mere poleret UI og bedre UX under loading.

- **Generisk og dynamisk rendring af kolonner og form-felter i dashboard:** Vi bruger funktionen hasData, der tjekker for data til det pågældende form-felt eller kolonne før den vises, samt columnConfigs & fieldsToUpdate arrays, der definere mulige kolonner og form-felter.

- **Brug af SWR og Mutate til datahåndtering i dashboard:** Der er anvendt SWR til at optimere datahentning og håndtering, hvilket bidrager til en mere flydende UX. Igennem mutate-funktionen holdes klienten opdateret, så ny data vises uden at skulle genindlæse browseren.

- **Slider/Pager** Enkel slider/pager inklusiv fetch med loading- og fejl-håndtering på 7 linjers kode.


## Kodeeksempler

```jsx

// Dette eksempel viser en generisk og dynamisk tabel header fra TabsContent.js komponentet. Vi definerer alle mulige kolonner i vores "columnConfigs" array, og ved hjælp af "hasData" funktionen sikrer vi, at kun kolonner med data vises, og med Class attributterne kan vi stadig tilføje styling til specifikke kolonner efter behov.

    const hasData = (key) => sortedItems.some((item) => item[key])

    const columnConfigs = [
        { key: 'asset', label: 'Image' },
        { key: 'name', label: 'Name', tBodyClass: 'font-medium'   },
        { key: 'title', label: 'Title', tBodyClass: 'font-medium'   },
        { key: 'email', label: 'Email' },
        { key: 'age', label: 'Age' },
        { key: 'description', label: 'Description', theadClass: 'w-full text-left', tbodyClass: 'text-left' },
        { key: 'content', label: 'Content', theadClass: 'w-2/3 text-left', tbodyClass: 'text-left'   },
        { key: 'extra', label: 'Extra', theadClass: 'w-1/3 text-left', tbodyClass: ' text-left'   },
    ]

    <thead>
        <tr className="text-center">
            {columnConfigs.map((columnConfig, index) => (
                hasData(columnConfig.key) && (
                    <th key={index} className={`p-4 bg-slate-100 ${columnConfig.theadClass}`}>
                        {columnConfig.label}
                    </th>
                )
            ))}
            <th className="p-4 bg-slate-100 rounded-tr-md">Actions</th>
        </tr>
    </thead>

```

```jsx

// Dette eksempel viser en simpel pager/slider-funktion fra animalSlider.js. Vi bruger SWR til fetch og react-loading-skeleton til forbedret UX/UI ved loading. Selve slider-funktionaliteten er kun 4 linjer, den identificerer det aktuelle element i 'data' ud fra params. Derefter bliver de relevante data indsat i 'item', 'prevItem' og 'nextItem', hvilket gør det muligt nemt og hurtigt at navigere mellem elementerne, samt kun at vise navigations-knapper hvis der er flere sider tilgængelige.

    const fetcher = url => fetch(url).then(r => r.json())
    const {data, error, isLoading} = useSWR("http://localhost:4000/api/v1/animals", fetcher)
    if (error) { throw new Error('Failed to fetch data') }

    const currentIndex = isLoading ? null : data.findIndex(animal => animal.id === parseInt(params.id))
    const item = isLoading ? null : data[currentIndex]
    const prevItem = isLoading ? null : currentIndex > 0 ? data[currentIndex - 1] : null
    const nextItem = isLoading ? null : currentIndex < data.length - 1 ? data[currentIndex + 1] : null

    return (

        // ... Pager/slider navigation ...

        { isLoading ? ( <Skeleton width={32} containerClassName="mr-auto py-2 px-4" /> ) : prevItem && ( 
            <Link href={`/animal/${prevItem.id}`} className="text-blue-900 hover:text-blue-500 py-2 px-4 flex items-center mr-auto">&lt; Forrige</Link> 
        )}

        { isLoading ? ( <Skeleton width={32} containerClassName="ml-auto py-2 px-4" /> ) : nextItem && (
            <Link href={`/animal/${nextItem.id}`} className="text-blue-900 hover:text-blue-500 py-2 px-4 ml-auto">Næste &gt;</Link>
        )}
    )

```

```jsx

// Dette eksempel viser SWR-fetch med auth til vores dashboard-formularer. Funktionen "handleDataUpdate" sendes som prop til TabsForm og bruges til at opdatere client cache med ny data fra serveren ved hjælp af mutate-funktionen, når vi indsender en formular. Dette gør, at den opdaterede data vises med det samme til brugeren.


    const [items, setItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const fetcher = (url) => fetch(url, { 
        headers: { Authorization: `Bearer ${auth.user.accessToken}` } 
    }).then((r) => r.json())

    const { data, error, isValidating, mutate } = useSWR(`http://localhost:4000/api/v1/${endpoint}`, fetcher)

    useEffect(() => {
        if (data) { setItems(data) }
        if (error) { throw new Error('Failed to fetch data') }
    }, [data, error])

    const handleDataUpdate = () => { mutate() }

    return (
        <TabsForm 
            items={items} 
            selectedId={selectedId} 
            onDataUpdate={handleDataUpdate} 
            endpoint={endpoint} 
            hasData={hasData} 
        />
    )

```

