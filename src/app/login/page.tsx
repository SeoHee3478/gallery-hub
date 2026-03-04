import { LoginForm } from "./components/Form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center w-full max-w-md">
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
