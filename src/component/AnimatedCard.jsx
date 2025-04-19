import { motion } from "framer-motion";

const animations = [
  { x: -100, opacity: 0 },  // slide from left
  { y: 100, opacity: 0 },  // slide from top
  { x: -100, opacity: 0 },   // slide from right
  { y: 100, opacity: 0 },   // slide from bottom
  { scale: 0.5, opacity: 0 }, // scale in
  { rotate: -45, opacity: 0 } // rotate in
];

export default function AnimatedRowOfCards() {
  return (
    <div className="container py-5">
      <div className="d-flex flex-row flex-wrap justify-content-between gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={animations[i]}
            whileInView={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="card shadow-sm p-3"
            style={{ width: "15rem", minHeight: "10rem" }}
          >
            <div className="card-body">
              <h5 className="card-title">Card {i + 1}</h5>
              <p className="card-text">Scroll to animate!</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
