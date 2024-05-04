import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const BASE_URL = "http://localhost:9000";
export const CitiesContext = createContext(null)

export default function CitiesProvider({ children }) {
    const [cities, setCities] = useState();
    const [isLoading, setIsLoading] = useState();
    const [currentCity, setCurrentCity] = useState();

    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data)
            } catch {
                alert("There was an error")
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);


    async function getCity(id) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data)
        } catch {
            alert("There was an error")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCity
            }}>
            {children}
        </CitiesContext.Provider>
    )
}


export function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined) throw new Error("CitiesContext is not available")
    return context
}