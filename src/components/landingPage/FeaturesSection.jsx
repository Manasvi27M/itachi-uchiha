import React from "react";
import { templates } from "../../lib/constants";
import { TemplatesParallax } from "../landingPage/TemplatesParallax";

export default function FeaturesSection() {
  return (
    <section>
      <TemplatesParallax products={templates} />
    </section>
  );
}
