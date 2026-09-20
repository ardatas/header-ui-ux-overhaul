import { motion, useReducedMotion } from "framer-motion";
import { testimonial } from "@/lib/content";
export function Testimonial() {
  const reducedMotion = useReducedMotion();
  return (
    <section
      id="testimonial"
      className="testimonial-section section-wrap"
      aria-label="Reader testimonial"
    >
      <motion.figure
        className="testimonial-card"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={reducedMotion ? undefined : { y: -8, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 200, damping: 24 }}
      >
        <blockquote>{testimonial.quote}</blockquote>
        <figcaption>
          <span className="testimonial-avatar" aria-hidden="true">
            HA
          </span>
          <div>
            <strong>{testimonial.name}</strong>
            <span>{testimonial.role}</span>
          </div>
        </figcaption>
      </motion.figure>
    </section>
  );
}
