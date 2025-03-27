import React from "react";
import { MessageSquare, Github, Linkedin, Mail } from "lucide-react";

export default function AboutUsPage() {
  const team = [
    {
      name: "Manasvi M",
      role: "Full Stack Developer",
      bio: "Passionate about creating beautiful and functional web applications. Specializes in modern frontend frameworks and scalable backend solutions.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
      social: {
        github: "https://github.com/manasvi",
        linkedin: "https://linkedin.com/in/manasvi",
        email: "mailto:manasvi@pagedone.com",
      },
    },
    {
      name: "Pranav Keshav",
      role: "Software Architect",
      bio: "Experienced in building robust and scalable applications. Focuses on system design and implementing best practices in software development.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
      social: {
        github: "https://github.com/pranavkeshav",
        linkedin: "https://linkedin.com/in/pranavkeshav",
        email: "mailto:pranav@pagedone.com",
      },
    },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-[2rem] p-8 w-full animate-fadeIn">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Meet Our Team</h1>
          <p className="text-xl text-indigo-600 mb-6">
            The minds behind Resume Builder
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're passionate about creating tools that help professionals
            showcase their talents. Our platform is built with love and
            attention to detail by our dedicated team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-6 ring-4 ring-indigo-50"
                />
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="text-indigo-600 mb-4">{member.role}</p>
                <p className="text-gray-600 text-center mb-6">{member.bio}</p>

                <div className="flex gap-4">
                  <a
                    href={member.social.github}
                    className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.email}
                    className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-16">
          <a
            href="/"
            className="text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
          >
            ← Back to Sign In
          </a>
        </div> */}
      </div>
    </div>
  );
}
