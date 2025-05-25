"use client"
import { useState, useRef, useEffect } from "react"

export interface FilterType<T> {
  id: keyof T
  label: string
  placeholder: string
}

interface FilterSectionProps<T> {
  filterTypes: FilterType<T>[]
  onFilter: (filters: Partial<T>) => void
}

function FilterSection<T extends Record<string, any>>({
  filterTypes,
  onFilter,
}: FilterSectionProps<T>) {
  const [inputValue, setInputValue] = useState("")
  const [showFilterTypes, setShowFilterTypes] = useState(false)
  const [selectedFilterType, setSelectedFilterType] = useState<keyof T>(filterTypes[0].id)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowFilterTypes(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = () => {
    const filters: Partial<T> = {}
    if (inputValue.trim()) {
      filters[selectedFilterType] = inputValue.trim() as any
    }
    onFilter(filters)
  }

  const getPlaceholder = () => {
    return filterTypes.find((type) => type.id === selectedFilterType)?.placeholder || "Buscar"
  }

  const handleFilterTypeChange = (type: keyof T) => {
    setSelectedFilterType(type)
    setShowFilterTypes(false)
    setInputValue("")
  }

  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 mb-4">
      <div className="flex flex-1 gap-2">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowFilterTypes(!showFilterTypes)}
            className="bg-darkGreen text-white px-3 py-2 rounded-l hover:bg-darkGreen/90 flex items-center"
            style={{ minWidth: "120px" }}
          >
            <span className="flex-1 text-left">
              {filterTypes.find((type) => type.id === selectedFilterType)?.label || "Filtrar por"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>

          {showFilterTypes && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
              {filterTypes.map((type) => (
                <button
                  key={String(type.id)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    selectedFilterType === type.id ? "bg-gray-100 font-medium" : ""
                  }`}
                  onClick={() => handleFilterTypeChange(type.id)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <input
          className="flex-1 border px-4 py-2 rounded-r focus:outline-none focus:ring-2 focus:ring-darkGreen"
          placeholder={getPlaceholder()}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-darkGreen text-white px-4 py-2 rounded hover:bg-darkGreen/90 flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
        </svg>
        Filtrar
      </button>
    </div>
  )
}

export default FilterSection
