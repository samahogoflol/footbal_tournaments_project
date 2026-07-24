import { createClient } from '@/src/utils/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  console.log('--- CALLBACK ROUTE: Отриманий code ---', code);

  if (code) {
    const supabase = await createClient();
    
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('--- CALLBACK ROUTE: Помилка обміну коду ---', error.message);
    } else {
      console.log('--- CALLBACK ROUTE: Сесія успішно створена! ---');
    }
  } else {
    console.warn('--- CALLBACK ROUTE: Увага, code дорівнює null ---');
  }

  return NextResponse.redirect(new URL('/auth/update-password', request.url));
}