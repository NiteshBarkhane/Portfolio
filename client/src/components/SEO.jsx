import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
    title = 'Nitesh Barkhane - MERN Stack Developer | Web Development Services',
    description = 'Professional MERN Stack Developer in Indore, India. Specializing in full-stack web development, React applications, and custom web solutions for businesses.',
    keywords = 'web developer, MERN stack, React developer, Node.js, MongoDB, full-stack developer, Indore, freelance developer',
    image = 'https://yourportfolio.com/og-image.jpg',
    url = 'https://yourportfolio.com'
}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            
            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            
            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Nitesh Barkhane",
                    "jobTitle": "MERN Stack Developer",
                    "url": url,
                    "sameAs": [
                        "https://github.com/NiteshBarkhane",
                        "https://www.linkedin.com/in/nitesh-barkhane-66060b342/"
                    ],
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Indore",
                        "addressCountry": "India"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
