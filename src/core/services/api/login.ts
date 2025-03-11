import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Solo permite métodos POST
  }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    // Envía las credenciales al backend de FastAPI
    const response = await axios.post(`${apiUrl}/auth/access-token`, req.body, {
      withCredentials: true, // Permite que las cookies se manejen en el backend
    });

    if (response.headers['set-cookie']) {
        res.setHeader('Set-Cookie', response.headers['set-cookie']);
      }      
    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
    throw new Error((error as Error).message);
  }
}
