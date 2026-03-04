import { Suspense } from "react";
import SignupForm from "./components/Form";

export default function SignupPage() {
  return (
    <div className="flex items-center w-full max-w-md">
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
