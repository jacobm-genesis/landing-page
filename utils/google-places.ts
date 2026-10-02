// Google Places (New) address lookup for the offer form. The key is restricted in Google Cloud
// (project "Genesis Website") to genesishomebuyers.co and localhost, and to the Places + Maps JS APIs.
const mapsApiKey = "AIzaSyA3uBP0Lb4W3r9ereQ1IuQSk2yadQ2Cx98";

export type AddressSuggestion = { id: string; text: string; select: () => Promise<AddressParts> };
export type AddressParts = { formatted: string; street: string; city: string; state: string; zip: string; placeId: string };

type AddressComponent = { longText: string | null; shortText: string | null; types: string[] };
type Place = { id: string; formattedAddress?: string | null; addressComponents?: AddressComponent[]; fetchFields: (o: { fields: string[] }) => Promise<unknown> };
type PlacePrediction = { placeId: string; text: { toString(): string }; toPlace: () => Place };
type PlacesLibrary = {
  AutocompleteSessionToken: new () => unknown;
  AutocompleteSuggestion: {
    fetchAutocompleteSuggestions: (request: Record<string, unknown>) => Promise<{ suggestions: { placePrediction: PlacePrediction | null }[] }>;
  };
};

declare global {
  interface Window {
    google?: { maps?: { importLibrary: (name: string) => Promise<unknown> } };
    __genesisMapsReady?: () => void;
  }
}

let placesLibrary: Promise<PlacesLibrary> | null = null;

function loadPlaces(): Promise<PlacesLibrary> {
  placesLibrary ??= new Promise<void>((resolve, reject) => {
    if (window.google?.maps?.importLibrary) return resolve();
    window.__genesisMapsReady = () => resolve();
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&v=weekly&loading=async&callback=__genesisMapsReady`;
    script.async = true;
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  }).then(() => window.google!.maps!.importLibrary("places") as Promise<PlacesLibrary>);
  placesLibrary.catch(() => (placesLibrary = null));
  return placesLibrary;
}

let sessionToken: unknown = null;

function component(parts: AddressComponent[], type: string, short = false) {
  const match = parts.find((part) => part.types.includes(type));
  return (short ? match?.shortText : match?.longText) ?? "";
}

/** Address suggestions for what the seller has typed so far (US addresses only). */
export async function suggestAddresses(input: string): Promise<AddressSuggestion[]> {
  const { AutocompleteSessionToken, AutocompleteSuggestion } = await loadPlaces();
  sessionToken ??= new AutocompleteSessionToken();
  const { suggestions } = await AutocompleteSuggestion.fetchAutocompleteSuggestions({
    input,
    sessionToken,
    includedRegionCodes: ["us"],
    includedPrimaryTypes: ["street_address", "premise", "subpremise"],
  });
  return suggestions.flatMap(({ placePrediction }) => {
    if (!placePrediction) return [];
    return [{
      id: placePrediction.placeId,
      text: placePrediction.text.toString(),
      select: async () => {
        const place = placePrediction.toPlace();
        await place.fetchFields({ fields: ["formattedAddress", "addressComponents"] });
        sessionToken = null; // A selection ends the billing session.
        const parts = place.addressComponents ?? [];
        const street = [component(parts, "street_number"), component(parts, "route")].filter(Boolean).join(" ");
        const unit = component(parts, "subpremise");
        return {
          formatted: (place.formattedAddress ?? placePrediction.text.toString()).replace(/, USA$/, ""),
          street: unit ? `${street} #${unit}` : street,
          city: component(parts, "locality") || component(parts, "sublocality") || component(parts, "postal_town"),
          state: component(parts, "administrative_area_level_1", true),
          zip: component(parts, "postal_code"),
          placeId: place.id,
        };
      },
    }];
  });
}
