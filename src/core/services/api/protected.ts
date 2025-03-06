import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    // Realiza la solicitud sin pasar manualmente el token
    const response = await axios.get(`${apiUrl}/auth/protected`, {
      withCredentials: true,  // Permite que las cookies se envíen automáticamente
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    throw new Error((error as Error).message);
  }
}
