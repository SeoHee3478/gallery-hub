import ExhibitionContainer from "./components/ExhibitionContainer";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const dynamic = "force-dynamic";

export default function ExhibitionPage() {
  return (
    <section className="flex justify-center w-full">
      <ErrorBoundary
        fallback={
          <div className="w-full flex justify-center items-center min-h-screen">
            <p className="text-xl text-red-500">에러가 발생했습니다</p>
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="w-full max-w-5xl flex justify-center items-center min-h-screen">
              <p className="text-xl">로딩 중...</p>
            </div>
          }
        >
          <ExhibitionContainer />
        </Suspense>
      </ErrorBoundary>
    </section>
  );
}
