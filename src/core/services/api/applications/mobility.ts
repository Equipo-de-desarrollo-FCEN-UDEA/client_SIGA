import Mobility from '@/core/interfaces/applications/mobility/mobility';
const apiUrl = process.env.NEXT_PUBLIC_API_URL+'/mobility';

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

export default create;