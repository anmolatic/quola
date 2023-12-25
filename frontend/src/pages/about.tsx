import ComingSoon from "@/components/coming-soon";
import SparklesCore from "@/components/ui/Sparkets";
import React from "react";

const About = () => {
  return (
    <div className="relative">
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
      <ComingSoon />
    </div>
  );
};

export default About;
