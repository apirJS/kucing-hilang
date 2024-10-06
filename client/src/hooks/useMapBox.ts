import { ElementRef, useEffect, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { Suggestion, SearchResults } from '@/lib/types';

const DEFAULT_MAP_ZOOM = 15;
mapboxgl.accessToken = 'pk.eyJ1IjoiYXBpciIsImEiOiJjbTF1enN2cXIwNnFwMmpweGJtM3l3MzBkIn0.esbh1Il-Sei2aAqXYWc1nQ';

export function useMapBox() {
  const mapContainerRef = useRef<ElementRef<'div'>>(null);
  const [lng, setLng] = useState<number>(110.362512);
  const [lat, setLat] = useState<number>(-7.742624);
  const [zoom, setZoom] = useState(DEFAULT_MAP_ZOOM);
  const [mapInstance, setMapInstance] = useState<Map | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const initialLat = useRef(lat);
  const initialLng = useRef(lng);
  const initialZoom = useRef(zoom);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLDivElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [initialLng.current, initialLat.current],
      zoom: initialZoom.current,
    });

    setMapInstance(map);
  }, []);

  useEffect(() => {
    if (mapInstance) {
      mapInstance.addControl(new mapboxgl.NavigationControl(), 'top-right');
      mapInstance.on('move', () => {
        setLng(mapInstance.getCenter().lng);
        setLat(mapInstance.getCenter().lat);
        setZoom(mapInstance.getZoom());
      });

      return () => {
        mapInstance.remove();
      };
    }
  }, [mapInstance]);

  async function handleSearch() {
    if (!searchQuery) return;

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        searchQuery
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data: SearchResults = await response.json();
    const place = data.features[0];

    if (place && mapInstance) {
      const [newLng, newLat] = place.center;
      setLat(newLat);
      setLng(newLng);
      mapInstance.setCenter([newLng, newLat]);
      mapInstance.setZoom(DEFAULT_MAP_ZOOM);
    }
  }

  async function fetchSuggestions(query: string) {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${mapboxgl.accessToken}`
    );
    const data: SearchResults = await response.json();
    setSuggestions(data.features);
  }

  async function askLocationPermission() {
    return navigator.geolocation.getCurrentPosition(
      async (position) => {
        const newLat = position.coords.latitude;
        const newLng = position.coords.longitude;
        setLat(newLat);
        setLng(newLng);
        if (mapInstance) {
          mapInstance.setCenter([newLng, newLat]);
          mapInstance.setZoom(DEFAULT_MAP_ZOOM);
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('Permintaan Lokasi tidak di izinkan.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Lokasi tidak ditemukan.');
            break;
          case error.TIMEOUT:
            alert('Timeout tercapai.');
            break;
          default:
            alert('An unknown error occurred.');
            break;
        }
      }
    );
  }
  
  function handleSuggestionClick(suggestion: Suggestion) {
    if (mapInstance) {
      mapInstance.setCenter(suggestion.center)
      mapInstance.setZoom(DEFAULT_MAP_ZOOM)
    }
    setSearchQuery("")
    setSuggestions([])
  }

  return {
    mapContainerRef,
    lng,
    lat,
    zoom,
    searchQuery,
    setSearchQuery,
    suggestions,
    handleSearch,
    askLocationPermission,
    fetchSuggestions,
    handleSuggestionClick
  };
}