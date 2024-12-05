import { useState, useEffect } from 'react';
import { UseFormRegister } from "react-hook-form";

interface PaisesProps {
    register: UseFormRegister<any>; // Recibe el register como prop
  }

const Paises:React.FC<PaisesProps> = ({register}) => {
    const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [selectedCountry, setSelectedCountry] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Filtrar la lista de países
        const filtered = countries.filter((country) =>
            country.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    const handleCountrySelect = (countryName: string) => {
        setSelectedCountry(countryName);
        setSearchTerm(countryName); // Rellenar el input con el país seleccionado
        setFilteredCountries([]); // Ocultar la lista después de seleccionar
      };

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

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700">País destino</label>
            <input
            type="text"
            value={searchTerm}
            placeholder="Escribe el nombre del país"
            className="w-full border rounded p-2"
            {...register("destination_country", { 
            required: true, 
            onChange: (e) => {
            handleSearchChange(e);
            }
            })}
            onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                const currentIndex = filteredCountries.findIndex(country => country.name === selectedCountry);
                let nextIndex = currentIndex;
                if (e.key === "ArrowDown") {
                nextIndex = (currentIndex + 1) % filteredCountries.length;
                } else if (e.key === "ArrowUp") {
                nextIndex = (currentIndex - 1 + filteredCountries.length) % filteredCountries.length;
                }
                setSelectedCountry(filteredCountries[nextIndex].name);
            } else if (e.key === "Enter" && selectedCountry) {
                e.preventDefault(); // Prevenir el comportamiento predeterminado de "Enter"
                handleCountrySelect(selectedCountry);
            }
            }}
            />
            {filteredCountries.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto">
            {filteredCountries.map((country, index) => (
            <li
                key={index}
                onClick={() => handleCountrySelect(country.name)}
                className={`p-2 hover:bg-blue-100 cursor-pointer ${country.name === selectedCountry ? 'bg-blue-100' : ''}`}
            >
                {country.name}
            </li>
            ))}
            </ul>
            )}
        </div>
    );
};

export default Paises;