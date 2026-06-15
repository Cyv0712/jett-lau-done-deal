import HeroSection from '../components/HeroSection';
import BrandMarquee from '../components/BrandMarquee';
import FeaturedBikes from '../components/FeaturedBikes';
import AboutUs from '../components/AboutUs';
import { Helmet } from 'react-helmet-async';

import { useReveal } from '../hooks/useReveal';

const Home = () => {
  useReveal();
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MotorcycleDealer",
    "name": "Jett Lau Done Deal",
    "image": "https://jettlaudonedeal.com/static_data/jett_lau_favicon-removebg-preview.webp",
    "url": "https://jettlaudonedeal.com",
    "telephone": "09435509357",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Metro Manila",
      "addressCountry": "PH"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <>
      <Helmet>
        <title>Jett Lau Done Deal | Premium Pre-Owned Big Bikes</title>
        <meta name="description" content="Your premier destination for high-quality, second-hand adventure bigbikes in the Philippines. From the Screen to the Showroom." />
        <meta property="og:title" content="Jett Lau Done Deal | Premium Pre-Owned Big Bikes" />
        <meta property="og:description" content="Your premier destination for high-quality, second-hand adventure bigbikes in the Philippines. From the Screen to the Showroom." />
        <meta property="og:image" content="https://jettlaudonedeal.com/static_data/jett_lau_favicon-removebg-preview.webp" />
        <meta property="og:url" content="https://jettlaudonedeal.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <HeroSection />
      <BrandMarquee />
      <FeaturedBikes />
      <AboutUs />
    </>
  );
};

export default Home;
