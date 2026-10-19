import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { FaXTwitter, FaTiktok } from "react-icons/fa6";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Simulate newsletter subscription
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Web Development", href: "/services/web-app-development" },
    { name: "Mobile Apps", href: "/services/mobile-app-development" },
    { name: "Blockchain", href: "/services/blockchain-solutions" },
    { name: "AI Solutions", href: "/services/ai-integration" },
    { name: "MVP Launch", href: "/services/mvp-launch-services" },
    { name: "Fintech", href: "/services/fintech-and-wallet-systems" },
  ];

  const platforms = [
    { name: "ExAfrik P2P Exchange", href: "/platforms/exafrik-exchange" },
    { name: "AgriTech SaaS", href: "/platforms/agritech" },
    { name: "EduConnect Platform", href: "/platforms/educonnect" },
  ];

  return (
    <footer className="bg-primary-dark text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-glow to-white rounded-lg flex items-center justify-center">
                <span className="text-primary-dark font-bold text-lg">TB</span>
              </div>
              <span className="text-2xl font-bold">Techbravery</span>
            </Link>

            <p className="text-white/80 leading-relaxed mb-6 max-w-md">
              Empowering Africa's digital evolution through custom software and
              innovation. Building the future, one solution at a time.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-glow" />
                <span className="text-white/80">info@techbravery.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-glow" />
                <span className="text-white/80">+234 805 066 7156</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-glow" />
                <span className="text-white/80">
                  Lagos, Nigeria • Nairobi, Kenya
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-primary-glow transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-white/70 hover:text-primary-glow transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Platforms</h3>
            <ul className="space-y-2 mb-6">
              {platforms.map((platform) => (
                <li key={platform.name}>
                  <Link
                    to={platform.href}
                    className="text-white/70 hover:text-primary-glow transition-colors"
                  >
                    {platform.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div>
              <h4 className="font-medium mb-3">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button
                  size="sm"
                  className="bg-primary-glow hover:bg-primary-glow/90"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & CTAs */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-glow/20 transition-colors"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-glow/20 transition-colors"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-glow/20 transition-colors"
              >
                <FaTiktok className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary-glow/20 transition-colors"
              >
                <FaFacebookF className="w-5 h-5" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex space-x-4">
              <Button
                className="bg-white text-primary-dark hover:bg-white/90 transition-all opacity-100"
                asChild
              >
                <Link to="/quote">
                  <span className="opacity-100">Get Quote</span>
                </Link>
              </Button>
              <Button
                className="bg-white text-primary-dark hover:bg-white/90 transition-all opacity-100"
                asChild
              >
                <Link to="/platforms">
                  <span className="opacity-100">View Our Platforms</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-primary-dark/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <div>
              © 2024 Techbravery. All rights reserved. • Built with 💚 in Africa
            </div>
            <div className="flex space-x-6 mt-2 md:mt-0">
              <Link
                to="/privacy"
                className="hover:text-primary-glow transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary-glow transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="hover:text-primary-glow transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
