import React from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";
import { useSettings } from "../context/SettingsContext";

const About = () => {
  const { getSetting } = useSettings();

  const stats = [
    {
      label: getSetting("stat_1_label", "Projects Completed"),
      value: getSetting("stat_1_value", "10+"),
    },
    {
      label: getSetting("stat_2_label", "Happy Clients"),
      value: getSetting("stat_2_value", "5+"),
    },
    {
      label: getSetting("stat_3_label", "Lines of Code"),
      value: getSetting("stat_3_value", "50k+"),
    },
    {
      label: getSetting("stat_4_label", "Coffee Cups"),
      value: getSetting("stat_4_value", "Infinite"),
    },
  ];

  const values = [
    {
      icon: <Icon path="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" name="Target" className="text-accent w-6 h-6" />,
      title: getSetting("value_1_title", "Result-Oriented"),
      description: getSetting("value_1_desc", "I focus on the end-goal of your business, ensuring every line of code adds value and improves user engagement."),
    },
    {
      icon: <Icon path="M13 2L3 14h9l-1 8 10-12h-9l1-8z" name="Zap" className="text-accent w-6 h-6" />,
      title: getSetting("value_2_title", "High Performance"),
      description: getSetting("value_2_desc", "Performance isn't just a feature; it's a requirement. I optimize for speed, responsiveness, and accessibility."),
    },
    {
      icon: <Icon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" name="Shield" className="text-accent w-6 h-6" />,
      title: getSetting("value_3_title", "Clean & Secure"),
      description: getSetting("value_3_desc", "Writing maintainable, secure code using industry standards so your application can scale without technical debt."),
    },
  ];

  return (
    <section id="about" className="section-container bg-primary overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs text-accent font-medium tracking-wide uppercase">
              About Me
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            {getSetting("about_title", "Crafting Digital Excellence")}
          </h2>

          <p className="text-textSecondary text-lg leading-relaxed mb-6">
            {getSetting("about_desc_1", "Based in India, I started my journey with a passion for turning logic into visual reality. As a versatile Web Developer, I bridge the gap between complex backend systems and beautiful, intuitive front-end designs.")}
          </p>

          <p className="text-textSecondary text-lg leading-relaxed mb-8">
            {getSetting("about_desc_2", "I don't just build websites; I build business solutions. From high-scale enterprise platforms to bespoke creative experiments, I ensure the technology stack is modern, scalable, and perfectly aligned with your unique vision.")}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group">
                <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-accent transition-colors">
                  {stat.value}
                </h3>
                <p className="text-textSecondary text-sm uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Content - Values Cards */}
        <motion.div
          className="flex-1 w-full space-y-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {values.map((v, i) => (
            <div
              key={i}
              className="glass-card p-6 flex gap-4 items-start hover:bg-white/5 transition-all group"
            >
              <div className="p-3 bg-accent/10 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                {v.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {v.title}
                </h3>
                <p className="text-textSecondary text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
