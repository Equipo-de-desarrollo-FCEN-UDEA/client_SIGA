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
        <div className="">
            <label className="block text-sm font-medium text-gray-700">País destino</label>
            <input
                {...register("destination_country", { required: true })}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Escribe el nombre del país"
                className="w-full border rounded p-2"
            />
            {filteredCountries.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto">
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
};

export default Paises;