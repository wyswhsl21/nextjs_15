import { NextRequest, NextResponse } from 'next/server';

export default function handler(req: NextRequest, res: NextResponse) {
  const date = new Date();
  res.json({ time: date.toLocaleString() });
}

//api 설정 하는 방법
