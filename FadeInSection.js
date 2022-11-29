import React from "react";

const fade_in_section = {
  opacity: 0,
  transform: "translateY(20vh)",
  visibility: "hidden",
  transition:
    "opacity 1200ms ease-out,transform 600ms ease-out, visibility 1200ms ease-out",
  willChange: "opacity, transform, visibility",
};
const is_visible = {
  opacity: 1,
  transform: "none",
  visibility: "visible",
};

export default function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(true);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    return () => observer.unobserve(domRef.current);
  }, []);
  return (
    <div
      // className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      style={{...fade_in_section, ...(isVisible ? is_visible : null) }}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}
