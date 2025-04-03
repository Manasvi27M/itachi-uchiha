import { useState } from "react";
import { motion } from "framer-motion";
import CustomTabs from "./Tabs";
import SocialLinks from "./SocialLinks";
import { teamMembers } from "../data/TeamData";

export default function TeamMemberCard({ member, index, scrollY }) {
  const [activeTab, setActiveTab] = useState("bio");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: scrollY > 300 ? 1 : 0,
        y: scrollY > 300 ? 0 : 50,
      }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <div className="overflow-hidden h-full border-none rounded-lg bg-tonal-500 text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="p-0">
          <div className="relative h-[300px] overflow-hidden group">
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              fill="true"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
            </div>
          </div>

          <div className="p-6">
            <CustomTabs
              tabs={["Bio", "Skills"]}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            >
              {activeTab === "bio" && (
                <div>
                  <p className="text-muted-foreground">{member.bio}</p>
                  <SocialLinks social={member.social} />
                </div>
              )}

              {activeTab === "skills" && (
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-1 bg-transparent border-2 border-gray-300 text-black rounded-lg text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </CustomTabs>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
