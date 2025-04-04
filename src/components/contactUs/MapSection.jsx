import { motion } from "framer-motion";
import MapComponent from "./MapComponent.jsx";
import Button from "../shared/Button.jsx";

const MapSection = ({ scrollY }) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: scrollY > 900 ? 1 : 0,
            y: scrollY > 900 ? 0 : 20,
          }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h2 className="text-2xl font-bold mb-4">Visit Our Office</h2>
            <p className="text-muted-foreground mb-6">
              We're located in the heart of the city. Stop by for a coffee and a
              chat about how we can help your business grow.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p>123 Business Ave, Suite 100</p>
                  <p>San Francisco, CA 94107</p>
                  <p>United States</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Office Hours</h3>
                  <p>Monday - Friday: 9AM - 5PM</p>
                  <p>Saturday: 10AM - 2PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            <Button
              as="a"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              Get Directions
            </Button>
          </div>

          <div className="h-[400px]">
            <MapComponent />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MapSection;
