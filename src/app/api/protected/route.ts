import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    // Get cookies from the request
    const cookieHeader = request.headers.get('cookie');
    
    // Make request to backend with cookies
    const response = await axios.get('http://localhost:8003/api/v1/auth/protected', {
      headers: {
        ...(cookieHeader && { Cookie: cookieHeader }),
      },
      withCredentials: true,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Protected route error:', error);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}