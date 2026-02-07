import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Icon from "./Icon";
import { useSettings } from "../context/SettingsContext";

const About = () => {
  const { getSetting } = useSettings();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    {
      label: getSetting("stat_1_label", "Projects Completed"),
      value: getSetting("stat_1_value", "10+"),
      target: 10,
    },
    {
      label: getSetting("stat_2_label", "Happy Clients"),
      value: getSetting("stat_2_value", "5+"),
      target: 5,
    },
    {
      label: getSetting("stat_3_label", "Lines of Code"),
      value: getSetting("stat_3_value", "50k+"),
      target: 50,
    },
    {
      label: getSetting("stat_4_label", "Coffee Cups"),
      value: getSetting("stat_4_value", "Infinite"),
      target: null,
    },
  ];

  const values = [
    {
      icon: (
        <Icon
          path="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
          name="Target"
          className="text-accent w-6 h-6"
        />
      ),
      title: getSetting("value_1_title", "Result-Oriented"),
      description: getSetting(
        "value_1_desc",
        "I focus on the end-goal of your business, ensuring every line of code adds value and improves user engagement.",
      ),
    },
    {
      icon: (
        <Icon
          path="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          name="Zap"
          className="text-accent w-6 h-6"
        />
      ),
      title: getSetting("value_2_title", "High Performance"),
      description: getSetting(
        "value_2_desc",
        "Performance isn't just a feature; it's a requirement. I optimize for speed, responsiveness, and accessibility.",
      ),
    },
    {
      icon: (
        <Icon
          path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          name="Shield"
          className="text-accent w-6 h-6"
        />
      ),
      title: getSetting("value_3_title", "Clean & Secure"),
      description: getSetting(
        "value_3_desc",
        "Writing maintainable, secure code using industry standards so your application can scale without technical debt.",
      ),
    },
  ];

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="section-container bg-primary overflow-hidden"
      ref={ref}
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs text-accent font-medium tracking-wide uppercase">
              About Me
            </span>
          </motion.div>

          {/* Title with smaller font */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
          >
            {getSetting(
              "about_title",
              "Crafting Digital Excellence Since 2023",
            )}
          </motion.h2>

          {/* Description with smaller font */}
          <motion.p
            variants={itemVariants}
            className="text-textSecondary text-sm md:text-base leading-relaxed mb-4"
          >
            {getSetting(
              "about_desc_1",
              "Based in Indore, India, I started my journey with a passion for turning logic into visual reality. As a versatile Web Developer, I bridge the gap between complex backend systems and beautiful, intuitive front-end designs, regardless of the industry or technology stack.",
            )}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-textSecondary text-sm md:text-base leading-relaxed mb-8"
          >
            {getSetting(
              "about_desc_2",
              "I don't just build websites; I build business solutions. No idea is too big or too niche. From high-scale enterprise platforms to bespoke creative experiments, I ensure the technology stack is modern, scalable, and perfectly aligned with your unique vision.",
            )}
          </motion.p>

          {/* Stats Grid with animations */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} className="group">
                <div className="relative">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400 mb-1"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.9 }
                    }
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                  >
                    {stat.value}
                  </motion.h3>
                  <p className="text-textSecondary text-xs uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                  {/* Static underline */}
                  <div className="h-0.5 w-12 bg-gradient-to-r from-accent to-transparent mt-2 group-hover:w-full transition-all duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Content - Values Cards */}
        <motion.div
          className="flex-1 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="space-y-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="group glass-card p-6 flex gap-4 items-start hover:bg-white/10 transition-all cursor-default relative overflow-hidden"
                transition={{ duration: 0.2 }}
              >
                {/* Static gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon - removed rotation */}
                <div className="p-3 bg-accent/10 rounded-xl shrink-0 relative z-10">
                  {v.icon}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-textSecondary text-xs md:text-sm leading-relaxed">
                    {v.description}
                  </p>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Static decorative element */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl pointer-events-none opacity-30" />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
