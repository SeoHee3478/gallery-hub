import { Suspense } from "react";
import SignupForm from "./components/Form";

export default function SignupPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
