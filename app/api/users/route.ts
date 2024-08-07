import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(request);
  return NextResponse.json({ ok: true });
}

// 로그인창에서 사용자가 정보를 입력하고 로그인 버튼을 누르면 사용하는 POST
export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log('log the user in!!!');
  return NextResponse.json(data);
}

// export async function POST(request: NextRequest) {}

// export async function PUT(request: NextRequest) {}

// export async function DELETE(request: NextRequest) {}

// export async function PATCH(request: NextRequest) {}
