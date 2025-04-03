import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import Button from "../shared/Button";

export default function SocialLinks({ social }) {
  return (
    <div className="flex mt-6 space-x-3">
      <a
        href={social.twitter}
        target="_blank"
        rel="noopener noreferrer"
        // className=" cursor-pointer"
      >
        <Button
          variant="icon"
          className="h-12 w-12 p-0 rounded-full cursor-pointer"
        >
          <Twitter className="h-8 w-8 text-primary-400" />
          <span className="sr-only">Twitter</span>
        </Button>
      </a>
      <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
        <Button
          variant="icon"
          className="h-12 w-12 p-0 rounded-full cursor-pointer"
        >
          <Linkedin className="h-8 w-8 text-primary-400" />
          <span className="sr-only">LinkedIn</span>
        </Button>
      </a>
      <a href={social.github} target="_blank" rel="noopener noreferrer">
        <Button
          variant="icon"
          className="h-12 w-12 p-0 rounded-full cursor-pointer"
        >
          <Github className="h-8 w-8 text-primary-400" />
          <span className="sr-only">GitHub</span>
        </Button>
      </a>
      <a href={social.email}>
        <Button
          variant="icon"
          className="h-12 w-12 p-0 rounded-full cursor-pointer"
        >
          <Mail className="h-8 w-8 text-primary-400" />
          <span className="sr-only">Email</span>
        </Button>
      </a>
    </div>
  );
}
