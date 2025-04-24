import { useState, useEffect, useRef } from "react";
import { FaGithub, FaGlobe } from "react-icons/fa";

// Custom hook for detecting when an element is visible in viewport
const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

const Projects = () => {
  // References for animations
  const [headerRef, isHeaderVisible] = useIntersectionObserver({
    threshold: 0.1,
  });
  const [projectsRef, areProjectsVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  // Sample project data - replace with your actual projects
  const projectsData = [
    {
      id: 1,
      title: "DARBFs - ICCV 2025 under review",
      image: "/src/assets/projects/darbfs.png",
      description:
        "A full-stack social media application with features like user authentication, posts, comments, likes, and real-time notifications using React, Node.js, and Socket.io.",
      github: "https://github.com/viruthshaan/darb-splatting",
      liveDemo: "https://randomnerds.github.io/darbs.github.io/",
    },
    {
      id: 2,
      title: "SPLATVISTA-WebGL 3DGS Viewer",
      image: "/api/placeholder/600/400",
      description:
        "A responsive e-commerce platform with product catalog, shopping cart, user authentication, and payment integration using React, Redux, and Stripe API.",
      github: "https://github.com",
      liveDemo: "https://example.com",
    },
    {
      id: 3,
      title: "Cosmo Cruise - WebGL FPS Game",
      image: "/api/placeholder/600/400",
      description:
        "A real-time messaging application with private and group chats, file sharing, and emojis using React Native, Firebase, and WebRTC for voice calls.",
      github: "https://github.com",
      liveDemo: "https://example.com",
    },
    {
      id: 4,
      title: "KOP - Own Music Composition",
      image: "/src/assets/projects/kop.jpeg",
      description:
        "A responsive personal portfolio website showcasing skills, projects, and contact information using React and Tailwind CSS (this site!).",
      github: "https://www.youtube.com/@stavemusicalcrew2495",
      liveDemo:
        "https://www.youtube.com/watch?v=fNJUb6_OiGQ&ab_channel=STAVEMusicalCrew",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-900 text-white py-20 px-6 md:px-12 lg:px-24">
      <div className="container mx-auto">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={`mb-16 text-center transition-all duration-1000 ${
            isHeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-rose-600 mb-2 uppercase tracking-wider font-medium">
            VISIT MY PORTFOLIO AND KEEP YOUR FEEDBACK
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-300 to-teal-900 bg-clip-text text-transparent">
            Projects and Publications
          </h2>
          <div className="w-32 h-1 bg-rose-600 mx-auto"></div>
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsRef}
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-500 ${
            areProjectsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={(index % 3) * 200} // Stagger animation by column
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, delay = 0 }) => {
  const [cardRef, isCardVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <div
      ref={cardRef}
      className={`bg-zinc-800 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-sky-600/20 border border-gray-700 transform hover:-translate-y-2 hover:bg-zinc-900 ${
        isCardVisible
          ? `opacity-100 translate-y-0 delay-${delay}`
          : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Project Image */}
      <div className="relative group h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
      </div>

      {/* Project Title */}
      <h3 className="text-rose-600 font-semibold tracking-wide text-lg px-6 pt-6 pb-2">
        {project.title}
      </h3>

      {/* Project Links */}
      <div className="flex space-x-2 px-6 mb-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <FaGithub className="text-white" />
        </a>

        <a
          href={project.liveDemo}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 transition-colors"
        >
          <FaGlobe className="text-white" />
        </a>
      </div>

      {/* Project Description */}
      <p className="text-gray-300 px-6 pb-6 text-sm">{project.description}</p>
    </div>
  );
};

export default Projects;
