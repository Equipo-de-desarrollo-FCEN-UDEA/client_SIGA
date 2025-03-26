import TextInput from '@/components/atoms/inputs/TextInput'
import React from 'react'
import { UseFormSetValue } from 'react-hook-form'

type Material = {
  name: string
  quantity: string
  unit_price: string
}

type MaterialsProps = {
  materials: Material[]
  setValue: UseFormSetValue<any>
  error?: string
}

const Materials = ({ materials, error, setValue }: MaterialsProps) => {
  const [tempMaterial, setTempMaterial] = React.useState<Material>({
    name: '',
    quantity: '',
    unit_price: '',
  })
  const [materialError, setMaterialError] = React.useState<string | null>(null)
  const handleInputChange = (field: keyof Material) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempMaterial({ ...tempMaterial, [field]: e.target.value })
  }

  const handleAddMaterial = () => {
    if (!tempMaterial.name || !tempMaterial.quantity || !tempMaterial.unit_price) {
      setMaterialError('Debes ingresar todos los campos para agregar un material')
      return
    }
    setMaterialError(null)

    const updatedMaterials = [...materials, tempMaterial];

    setValue('stepFour.materials', updatedMaterials, { shouldValidate: true });
    setTempMaterial({ name: '', quantity: '', unit_price: '' });
  };

  const handleRemoveMaterial = (index: number) => {
    const updatedMaterials = materials.filter((_, i) => i !== index)
    setValue('stepFour.materials', updatedMaterials, { shouldValidate: true })
  }

  return (
    <div className="flex flex-col gap-4">
      <TextInput
        label="Material"
        placeholder="Ingrese el nombre del material"
        value={tempMaterial.name}
        onChange={handleInputChange('name')}
      />
      <TextInput
        label="Cantidad"
        placeholder="Ingrese la cantidad del material"
        value={String(tempMaterial.quantity) ?? ''}
        onChange={handleInputChange('quantity')}
        type='number'
      />
      <TextInput
        label="Precio unitario"
        placeholder="Ingrese el precio del material"
        value={String(tempMaterial.unit_price) ?? ''}
        onChange={handleInputChange('unit_price')}
        type='number'
      />

      <button
        type='button'
        onClick={handleAddMaterial}
        className="w-fit px-4 py-1 rounded bg-green-600 text-white"
      >
        Agregar
      </button>

      <span className="text-red-500 text-sm">{error ?? ''}</span>
      {materialError && <span className="text-red-500 text-sm">{materialError}</span>}

      {/* Lista de materiales */}

      {materials.length > 0 && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-500">
              <tr>
                <th className="text-left px-4 py-2">Material</th>
                <th className="text-right px-4 py-2">Cantidad</th>
                <th className="text-right px-4 py-2">Precio unitario</th>
                <th className="text-center px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((mat, index) => (
                <tr key={mat.name} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm">{mat.name}</td>
                  <td className="px-4 py-2 text-sm text-right">{mat.quantity}</td>
                  <td className="px-4 py-2 text-sm text-right">${mat.unit_price}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleRemoveMaterial(index)}
                      className="text-red-600 hover:text-red-800 font-medium text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Materials
