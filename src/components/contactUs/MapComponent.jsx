import { useEffect, useRef } from "react";

export default function MapComponent() {
  const mapRef = useRef(null);

  useEffect(() => {
    // This is a simplified map representation
    // In a real application, you would integrate with Google Maps, Mapbox, etc.
    const canvas = mapRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Draw a simple map representation
    const drawMap = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw some "streets"
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 2;

      // Horizontal streets
      for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * (i / 5));
        ctx.lineTo(canvas.width, canvas.height * (i / 5));
        ctx.stroke();
      }

      // Vertical streets
      for (let i = 1; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(canvas.width * (i / 5), 0);
        ctx.lineTo(canvas.width * (i / 5), canvas.height);
        ctx.stroke();
      }

      // Draw location marker (mocked Bengaluru location)
      const centerX = canvas.width * 0.65;
      const centerY = canvas.height * 0.6;

      // Marker shadow
      ctx.beginPath();
      ctx.arc(centerX, centerY + 2, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fill();

      // Marker pin
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.fillStyle = "hsl(var(--primary))";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    };

    drawMap();
    window.addEventListener("resize", drawMap);

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("resize", drawMap);
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] rounded-lg overflow-hidden border shadow-sm">
      <canvas
        ref={mapRef}
        className="w-full h-full"
        style={{ touchAction: "none" }}
      />
    </div>
  );
}
