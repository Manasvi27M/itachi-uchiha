import { motion } from "framer-motion";
import { Clock, PhoneCall, Mail } from "lucide-react";
import ContactCard from "./ContactCard";

export default function ContactInfoSection({ scrollY }) {
  const contactInfo = [
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      details: (
        <div>
          <p>Monday - Friday: 9AM - 5PM</p>
          <p>Saturday: 10AM - 2PM</p>
          <p>Sunday: Closed</p>
        </div>
      ),
    },
    {
      icon: <PhoneCall className="h-6 w-6" />,
      title: "Phone Support",
      details: (
        <div>
          <p>Sales: (123) 456-7890</p>
          <p>Support: (123) 456-7891</p>
          <p>Toll-free: 1-800-123-4567</p>
        </div>
      ),
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Us",
      details: (
        <div>
          <p>info@company.com</p>
          <p>support@company.com</p>
          <p>sales@company.com</p>
        </div>
      ),
    },
  ];

  return (
    <section id="info" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: scrollY > 500 ? 1 : 0,
            y: scrollY > 500 ? 0 : 20,
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Find Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Multiple ways to connect with our team. Choose what works best for
            you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactInfo.map((info, index) => (
            <ContactCard
              key={index}
              icon={info.icon}
              title={info.title}
              details={info.details}
              delay={index * 0.1}
              scrollY={scrollY}
              scrollTrigger={600}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
