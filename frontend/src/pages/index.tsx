import SparklesCore from "@/components/ui/Sparkets";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 h-screen w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="relative z-20 w-4/6 text-center text-3xl font-bold text-white md:text-7xl lg:text-6xl">
        <h1>Get Instantly Verified and Register for the Christmas Suprise</h1>
        <div className="mt-5 font-mono text-base font-normal">
          <p>
            Christmas is here and we are giving out a surprise gift to our
            customers. Get verified and stand a chance to win a gift from us.
          </p>
        </div>
        <Button
          onClick={() => router.push("/upload")}
          className="mb-2 rounded-lg p-5 py-6 font-mono text-base font-light transition-all duration-150 active:-translate-y-[2px]"
        >
          <span>Get Verified</span>
        </Button>
        <span className="absolute inset-x-0 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500  to-transparent" />
      </div>
    </div>
  );
}
