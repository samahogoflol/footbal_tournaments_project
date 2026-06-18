'use server'

import { createClient } from '@/src/utils/utils/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw new Error('Помилка входу')
  }

  revalidatePath('/', 'layout')
  redirect('/tournaments')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error('Помилка реєстрації')
  }

  revalidatePath('/', 'layout')
  redirect('/tournaments')
}

export async function resetPassword(email: string) {
  try {
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `https://footbal-tournaments-project.vercel.app/auth/callback`,
      // redirectTo: `http://localhost:3000/auth/update-password`,
    });

    if (error) {
      console.error('Supabase Reset Error:', error); // Це покаже детальну помилку в терміналі VS Code
      return { 
        success: false, 
        error: error.message || JSON.stringify(error) || 'Помилка скидання пароля' 
      };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Server catch error:', err);
    return { success: false, error: err?.message || 'Щось зламалося на сервері' };
  }
}