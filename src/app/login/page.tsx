import AuthForm from '@/src/components/AuthForm';
import { login } from '../actions/auth';

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-zinc-900 ">
      <AuthForm type="login" action={login} />
    </div>
  );
}