import React from 'react';
import '../styles/Footer.css';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="social-links">
          <a 
            href="https://github.com/Raj72620" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="icon" />
          </a>
          <a 
            href="http://www.linkedin.com/in/nishanth-singh" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="icon" />
          </a>
          <a 
            href="mail to : nishanthraj9618@gmail.com" 
            aria-label="Email"
          >
            <FaEnvelope className="icon" />
          </a>
        </div>
        <div className="footer-info">
          <p>© {new Date().getFullYear()} Nishanth Raj. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;