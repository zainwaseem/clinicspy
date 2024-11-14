import Header from "@/components/Header";
import ErrorBoundary from "./ErrorBoundary";

export default function Home() {
  return (
    <div>
      <ErrorBoundary>
        <Header />
      </ErrorBoundary>
    </div>
  );
}
