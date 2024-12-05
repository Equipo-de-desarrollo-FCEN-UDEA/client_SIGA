import React, { useState, useEffect, useRef } from 'react';
import { UseFormRegister } from "react-hook-form";

const Paises = React.forwardRef<HTMLInputElement, {}>(
    (props, ref) => {
        const inputRef = ref as React.MutableRefObject<HTMLInputElement>;
        const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
        const [searchTerm, setSearchTerm] = useState("");
        const [filteredCountries, setFilteredCountries] = useState(countries);
        const [selectedCountry, setSelectedCountry] = useState("");
        const wrapperRef = useRef<HTMLDivElement>(null);

        const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setSearchTerm(value);

            // Filtrar la lista de países
            const filtered = countries.filter((country) =>
                country.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCountries(filtered);
        }

        const handleCountrySelect = (countryName: string) => {
            setSelectedCountry(countryName);
            setSearchTerm(countryName); // Rellenar el input con el país seleccionado
            setFilteredCountries([]); // Ocultar la lista después de seleccionar
        }

        useEffect(() => {
            const fetchCountries = async () => {
                const response = await fetch("https://restcountries.com/v3.1/all?fields=name");
                const data = await response.json();
                const formattedCountries = data.map((country: any) => ({
                    code: country.cca2,
                    name: country.name.common,
                }));
                setCountries(formattedCountries);
            };
            fetchCountries();
        }, []);

        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setFilteredCountries([]);
            }
        };

        useEffect(() => {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, []);

        return (
            <div ref={wrapperRef} className="relative">
                <input
                    type="text"
                    value={searchTerm}
                    ref={inputRef}
                    placeholder="Escribe el nombre del país"
                    className="w-full border rounded p-2"
                />
                {filteredCountries.length > 0 && (
                    <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto w-full">
                        {filteredCountries.map((country, index) => (
                            <li
                                key={index}
                                onClick={() => handleCountrySelect(country.name)}
                                className="p-2 hover:bg-blue-100 cursor-pointer"
                            >
                                {country.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
);

export default Paises;