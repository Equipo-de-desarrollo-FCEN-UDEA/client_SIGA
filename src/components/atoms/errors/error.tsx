import React from 'react'

const Error = ({ errorCode }: { errorCode: number }) => {
    if (errorCode === 401) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-500 text-white p-4 rounded shadow-md">
                    Acceso no autorizado
                </div>
            </div>
        );
    }
    return null;
}

export default Error
