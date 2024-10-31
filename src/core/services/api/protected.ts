import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Realiza la solicitud sin pasar manualmente el token
    const response = await axios.get('http://localhost:8003/api/v1/auth/protected', {
      withCredentials: true,  // Permite que las cookies se envíen automáticamente
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
}
