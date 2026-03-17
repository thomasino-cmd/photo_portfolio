/**
 * Metadata Database for the Portfolio.
 * Tracks processing state (resized, scanned) and provides creative descriptions.
 */

export interface PhotoEntry {
    description?: string;
    resized: boolean;
    aiScanned: boolean;
}

// DATABASE - Stores state for specific images
export const photoDatabase: Record<string, PhotoEntry> = {
    "PORTFOLIO_SITO/DRONES/baianotturna.jpg": {
        description: "Uno sguardo inedito sulle geometrie costiere: la texture delle rocce rivela pattern grafici perfetti per il Real Estate di lusso e stampe d'arredo.",
        resized: true,
        aiScanned: true
    },
    "PORTFOLIO_SITO/DRONES/boccadasse alba.jpg": {
        description: "Il borgo di Boccadasse catturato in un'alba cinematografica. Una prospettiva aerea che valorizza il territorio, ideale per promozione turistica o una stampa da collezione.",
        resized: true,
        aiScanned: true
    }
};

// CATEGORY DESCRIPTION POOLS - Marketable and Commercial
const descriptionPools: Record<string, string[]> = {
    "NIGHTCLUBS": [
        "In un club techno, il fuori fuoco racconta l'energia della notte meglio di ogni dettaglio nitido. Luci, movimento e vibrazioni catturate nell'attimo perfetto.",
        "Dal dj set al tramonto sulla spiaggia fino ai Club più esclusivi: raccontiamo l'anima dell'evento e il calore della gente.",
        "Feste a tema e grandi produzioni: la fotografia di eventi è un'arte di reazione che trasforma il party in un ricordo iconico.",
        "Dalla drink culture agli aperitivi d'élite: catturiamo i dettagli che rendono unico ogni locale, tra neon e sorrisi autentici.",
        "Quando la gente balla sui tavoli e l'energia esplode: scatti dinamici per documentare la nightlife più ricercata e commerciale.",
        "Raccontare una festa significa catturare il battito della musica attraverso la luce: la nostra fotografia è pronta per i social e i magazine di settore."
    ],
    "DRONES": [
        "Prospettive zenitali che offrono un occhio sulla realtà invisibile da terra. Geometrie perfette per valorizzare progetti di Real Estate e architettura.",
        "La libertà di volare in alto: catturiamo la vastità del territorio con una nitidezza tecnica ideale per stampe fotografiche di grande formato.",
        "Il mondo visto da un'altra angolazione: trasformiamo il paesaggio in una scultura grafica pronta per essere appesa nel tuo living.",
        "Dettagli territoriali e mappature estetiche: il drone rivela l'ordine nascosto nel caos della natura e dell'urbanistica.",
        "Fotografia aerea professionale: non solo un volo, ma una ricerca di linee e volumi che valorizzano ogni location commerciale.",
        "Un punto di vista divino su realtà quotidiane: scatti chirurgici che esaltano il design del territorio per brochure e archivi digitali."
    ],
    "VEHICLES": [
        "Dettagli estremi e curve mozzafiato: catturiamo l'anima meccanica dei motori attraverso tagli di luce che ne esaltano la velocità.",
        "Automotive design: uno studio scultoreo su carrozzerie e riflessi per comunicare potenza, lusso e precisione ingegneristica.",
        "L'automobile non è solo un mezzo, è un oggetto d'arte in movimento. Servizi fotografici mirati per la vendita e il collezionismo.",
        "Velocità tradotta in immagine: catturiamo il dinamismo dei veicoli per contenuti pubblicitari ad alto impatto emotivo.",
        "L'estetica del dettaglio meccanico: dalle texture dei materiali ai riflessi sulla vernice, valorizziamo ogni singola linea di design.",
        "Fotografia automotive di alta classe: mettiamo in risalto l'esclusività e il carattere di ogni veicolo, dal vintage alle supercar moderne."
    ],
    "LANDSCAPE": [
        "Il sublime nella realtà locale: questi paesaggi sono pronti per diventare una stampa da appendere nel tuo salotto o nel tuo ufficio.",
        "Raccontiamo la forza della natura attraverso una luce radente che ne esalta la consistenza materica e la profondità.",
        "Scatti panoramici studiati per l'interior design: porta il respiro dei grandi spazi aperti dentro le tue pareti.",
        "L'anima del territorio catturata in un istante eterno: fotografia di paesaggio pensata per l'editoria e il fine art print.",
        "Un viaggio visivo tra orizzonti infiniti e dettagli naturali: la bellezza della terra trasformata in un'opera d'arredo.",
        "La realtà del paesaggio catturata con precisione millimetrica, perfetta per progetti di Real Estate immersi nel verde o sulla costa."
    ],
    "FOOD & DRINK": [
        "La materia prima diventa protagonista: scatti commerciali che esaltano il sapore, la freschezza e la cura di ogni preparazione.",
        "Food photography per menu e social: creiamo immagini che invitano all'assaggio, valorizzando texture e colori del piatto.",
        "Dal cocktail bar al ristorante stellato: raccontiamo l'esperienza gastronomica attraverso una luce calda e avvolgente.",
        "L'arte dell'impiattamento vista attraverso l'obiettivo: valorizziamo il lavoro dello chef con un'estetica moderna e pulita.",
        "Dettagli macro che parlano di freschezza: ogni ingrediente è trattato come un'opera d'arte per comunicare qualità e autenticità.",
        "Social content per il mondo della ristorazione: catturiamo il calore della tavola e la perfezione di ogni drink."
    ],
    "PORTRAIT": [
        "Ritratti professionali che comunicano identità e carattere. Ideali per brand identity, editoriali e profili aziendali di alto livello.",
        "Catturare l'essenza oltre la posa: la fotografia ritrattistica come strumento di comunicazione personale e professionale.",
        "Sessioni di ritratto in studio o in esterna: valorizziamo la tua immagine per renderla memorabile e autentica.",
        "Il volto come racconto: cerchiamo quel micro-secondo di verità che rende ogni persona unica davanti alla lente.",
        "Personal branding attraverso l'immagine: ritratti curati nei minimi dettagli per trasmettere fiducia, carisma e professionalità.",
        "Dagli editoriali di moda al corporate: un approccio scultoreo alla luce per esaltare i tratti somatici e la personalità."
    ],
    "STREET": [
        "Street photography per storytelling urbano: frammenti di vita quotidiana catturati per brand che vogliono un look autentico e 'raw'.",
        "L'improvvisazione coreografica della città: scatti dinamici che documentano la cultura urbana e i suoi protagonisti.",
        "Urban storytelling: catturiamo l'energia delle strade per campagne pubblicitarie moderne e fuori dagli schemi.",
        "La bellezza involontaria dei momenti rubati: fotografia di strada che racconta la società contemporanea con occhio clinico.",
        "Ritmi cittadini e architetture umane: ogni scatto è una micro-storia che attende solo di essere letta.",
        "Dagli skate park ai quartieri finanziari: documentiamo la varietà infinita della vita urbana attraverso uno stile reportage."
    ]
};

/**
 * Consistently picks a stable description from a pool based on filename hash.
 */
const getStableSample = (pool: string[], filename: string) => {
    let hash = 0;
    for (let i = 0; i < filename.length; i++) {
        hash = filename.charCodeAt(i) + ((hash << 5) - hash);
    }
    return pool[Math.abs(hash) % pool.length];
};

/**
 * Gets metadata for a specific photo URL.
 */
export const getPhotoMetadata = (url: string) => {
    // Decodifica l'URL per gestire caratteri come %20 (spazio) o %26 (&)
    const decodedUrl = decodeURIComponent(url);
    const cleanUrl = decodedUrl.startsWith('/') ? decodedUrl.slice(1) : decodedUrl;

    // Check database
    const entry = photoDatabase[cleanUrl];
    if (entry?.description) return { ...entry, aiScanned: true };

    // Determine category logically
    // Cerchiamo la corrispondenza ignorando il case
    const upperUrl = cleanUrl.toUpperCase();
    const categoryKey = Object.keys(descriptionPools).find(cat => upperUrl.includes(cat));

    const pool = categoryKey ? descriptionPools[categoryKey] : null;

    return {
        description: entry?.description || (pool ? getStableSample(pool, cleanUrl) : "Un'approfondita ricerca sull'estetica contemporanea, dove ogni scatto è finalizzato alla valorizzazione del soggetto per uso commerciale ed editoriale."),
        resized: entry?.resized || false,
        aiScanned: entry?.aiScanned || (!!entry?.description),
    };
};
