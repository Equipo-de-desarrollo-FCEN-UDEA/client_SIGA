import React from 'react'

interface InfoError {
    code: number;
    message: string;
}

const ErrorCode = (infoError: InfoError) => {
    if (infoError.code === 401) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-red-500 text-white p-4 rounded shadow-md">
                    {infoError.message}
                </div>
            </div>
        );
    }
    return null;
}

export default ErrorCode
