import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaMedium,
  FaMailBulk,
} from "react-icons/fa";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiPython,
  SiPytorch,
  SiSpringboot,
} from "react-icons/si";
import TypingText from "../components/typingtext_navbar";
import TypingTextHome from "../components/typingtext_home";
import { FaGoogleScholar } from "react-icons/fa6";
import { GiMailShirt } from "react-icons/gi";
import { BiMailSend } from "react-icons/bi";
import { DiJava } from "react-icons/di";

const Home = () => {
  const phrases = [
    "a Professional Coder ",
    "a Full Stack Developer ",
    "an Independent Researcher ",
    "a Mobile App Developer ",
    "a Machine Learning Enthusiast ",
    "a Musician ",
    "a Music Producer ",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect for the typing animation
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(currentPhrase.substring(0, currentText.length + 1));

        // When phrase is complete, wait longer and then start deleting
        if (currentText.length === currentPhrase.length) {
          setTypingSpeed(1500); // Pause before starting to delete
          setTimeout(() => {
            setIsDeleting(true);
            setTypingSpeed(75); // Delete faster than typing
          }, 1500);
        }
      } else {
        // Deleting
        setCurrentText(currentPhrase.substring(0, currentText.length - 1));

        // When deleted, move to next phrase
        if (currentText.length === 0) {
          setIsDeleting(false);
          setTypingSpeed(150); // Reset typing speed
          setCurrentPhraseIndex((prevIndex) =>
            prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
          );
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, typingSpeed]);

  return (
    <div className="min-h-screen flex items-center bg-zinc-900 text-white px-6 md:px-12 lg:px-24">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-rose-500 text-2xl">A LITTLE ABOUT ME</p>

          <h1 className="text-5xl md:text-6xl font-bold">
            Hi, I'm <span className="text-teal-500">Vishagar Arunan</span>
          </h1>

          <h2 className="text-3xl md:text-4xl font-semibold flex items-center">
            <span className="inline-block min-h-12">{currentText}</span>
            <span className="inline-block h-8 translate-x-1 w-1 bg-rose-500 animate-bounce"></span>
          </h2>

          <p className="text-teal-50 max-w-2xl">
            Hi! I’m Vishagar, an undergraduate student pursuing Electronic and
            Telecommunication Engineering at the University of Moratuwa, Sri
            Lanka. As a Dean’s List achiever, I thrive at the intersection of
            research and practical innovation, specializing in Computer Vision,
            Machine Learning, Signal Processing, and Mathematics, leveraging
            state of the art technologies
          </p>

          <div className="flex flex-col md:flex-row justify-between pt-6 space-y-6 md:space-y-0 md:space-x-12">
            {/* Socials Section */}
            <div>
              <p className="text-rose-500 mb-4">FIND ME IN</p>
              <div className="flex space-x-4">
                <SocialIcon icon={<FaGithub />} />
                <SocialIcon icon={<FaGoogleScholar />} />
                <SocialIcon icon={<FaLinkedinIn />} />
                <SocialIcon icon={<FaMedium />} />
                <SocialIcon icon={<BiMailSend />} />
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <p className="text-rose-500 mb-4">BEST SKILL ON</p>
              <div className="flex space-x-4">
                <SocialIcon icon={<SiPython />} />
                <SocialIcon icon={<SiPytorch />} />
                <SocialIcon icon={<SiJavascript />} />
                <SocialIcon icon={<SiTailwindcss />} />
                <SocialIcon icon={<DiJava />} />
                <SocialIcon icon={<SiSpringboot />} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="hidden rounded-4xl scale-90 md:block shadow-2xl shadow-gray-800">
          <img
            src="/src/assets/profile/bg_remove.png"
            alt="Professional Portrait"
            className="max-w-full h-auto rounded"
          />
        </div>
      </div>
    </div>
  );
};

// Reusable social icon component with hover effects
const SocialIcon = ({ icon }) => {
  return (
    <div
      className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center 
                    hover:bg-teal-700 hover:scale-110 transition-all duration-300 cursor-pointer"
    >
      <div className="text-gray-300 text-xl hover:text-white">{icon}</div>
    </div>
  );
};

export default Home;
