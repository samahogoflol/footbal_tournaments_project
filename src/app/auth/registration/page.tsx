import AuthForm from '@/src/components/AuthForm';
import { signup } from '../../actions/auth';

export default function RegistrationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-zinc-900">
      <AuthForm type="registration" action={signup} />
    </div>
  );
}