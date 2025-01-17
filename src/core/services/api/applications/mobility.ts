import Mobility from '@/core/interfaces/applications/mobility/mobility';
const apiUrl = process.env.NEXT_PUBLIC_API_URL+'/mobility';

export const read = async (id: string | string[]) => {
    try {
        const response = await fetch(apiUrl+'/read/'+id);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener la movilidad: ', error);
    }
};

const create = async (data: Mobility) => {
    
    console.log(JSON.stringify({ ...data, status: [] }));
    try {
        const response = await fetch(apiUrl+'/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ ...data, status: [] }),
        });

        if (response.ok) {
            alert('Formulario enviado correctamente');
        } else {
            console.error('Error al enviar el formulario', await response.text());
        }
    } catch (error) {
        console.error('Error al enviar el formulario', error);
    }
};

export const edit = async (data: Mobility) => {
    try {
        const response = await fetch(apiUrl+'/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Formulario enviado correctamente');
        } else {
            console.error('Error al enviar el formulario', await response.text());
        }
    } catch (error) {
        console.error('Error al enviar el formulario', error);
    }
};

export default create;