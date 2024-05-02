import CartesianPlane from "@/components/CartesianPlane";
import Control from "@/components/Control";
import { RoverProvider } from "@/context/RoverContext";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RoverProvider>
        <Control />
        <CartesianPlane />
      </RoverProvider>
    </main>
  );
}
