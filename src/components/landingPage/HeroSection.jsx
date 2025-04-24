import WordSwitcher from "../shared/WordSwitcher";
import { Brain, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HeroSection() {
    const imageRef=useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const parallaxImage = imageRef.current;

            if (parallaxImage) {
                const initialTilt = -30;
                const tiltStrength = 0.1;
                const rotateX = Math.max(initialTilt, Math.min(0, initialTilt + scrollY * tiltStrength)); 
                parallaxImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg)`;
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return(
        <div className="w-full min-h-screen bg-black text-gray-900 flex flex-col 
        [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"
        >
            <div className="mt-40 mb-8 relative flex items-center justify-center gap-4">
                <button className="px-8 py-3 bg-white text-gray-850 text-lg font-semibold rounded-md hover:bg-gray-500 transition flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Enhance Resume
                </button>
                <button className="px-8 py-3 bg-white text-gray-850 text-lg font-semibold rounded-md hover:bg-gray-500 transition flex items-center gap-3">
                    <Brain className="h-5 w-5 mr-[-8px]" />
                    Generate Resume
                </button>
            </div>

            <div className="relative mt-12 max-w-5xl mx-auto text-center font-bold justify-center text-4xl sm:text-5xl md:text-7xl text-white leading-tight ">
                <WordSwitcher words={["Enhance", "Generate"]} interval={4000} />{" "}
                Your Resume With Itachi Uchiha.
            </div>
            
            <div className="relative w-full mt-16 max-w-6xl mx-auto z-10 perspective-[1000px]">
                <div
                    className="h-auto w-full rounded-2xl gap-4 overflow-hidden transition-all"
                    style={{
                        boxShadow:
                            "rgba(0, 0, 0, 0.3) 0px 0px, rgba(0, 0, 0, 0.29) 0px 9px 20px, rgba(0, 0, 0, 0.26) 0px 37px 37px, rgba(0, 0, 0, 0.15) 0px 84px 50px, rgba(0, 0, 0, 0.04) 0px 149px 60px, rgba(0, 0, 0, 0.01) 0px 233px 65px",
                        transform: "scale(1.00089) rotateX(0.357143deg)"
                    }}
                >
                    <img
                        ref={imageRef}
                        alt="hero"
                        draggable="false"
                        loading="lazy"
                        width="1400"
                        height="720"
                        decoding="async"
                        className="mx-auto rounded-2xl object-cover h-full object-left-top transition-transform duration-300 ease-out"
                        style={{
                            transformOrigin: "bottom center",
                            color: "transparent"
                        }}
                        //srcSet="/images/itachi-uchiha.jpg 1x, /images/itachi-uchiha@2x.jpg 2x"
                        src="/itachi-uchiha.jpg"
                    />
                </div>
            </div>
        </div>
    );
}