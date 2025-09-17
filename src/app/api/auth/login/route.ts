import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Send credentials to FastAPI backend
    const response = await axios.post('http://localhost:8003/api/v1/auth/access-token', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Create response and set cookies if received from backend
    const nextResponse = NextResponse.json({ message: 'Logged in successfully' });
    
    if (response.headers['set-cookie']) {
      // Forward cookies from backend to client
      response.headers['set-cookie'].forEach((cookie: string) => {
        nextResponse.headers.append('Set-Cookie', cookie);
      });
    }

    return nextResponse;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}