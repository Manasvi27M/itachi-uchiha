import { motion } from "framer-motion";
import TeamMemberCard from "./TeamMemberCard";
import { teamMembers } from "../data/TeamData";

export default function TeamSection({ scrollY }) {
  return (
    <section id="team" className="py-20 px-4 bg-muted/50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 200 ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
          Meet Our Team
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              index={index}
              scrollY={scrollY}
              //   image={member.image}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
