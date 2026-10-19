import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navigation: {
        home: "Home",
        about: "About",
        services: "Services",
        platforms: "Platforms",
        portfolio: "Portfolio",
        blog: "Blog",
        careers: "Careers",
        contact: "Contact",
        getQuote: "Get Quote",
        login: "Login"
      },
      hero: {
        title: "Empowering Africa's Digital Evolution through Custom Software & Innovation",
        subtitle: "Full-service software agency building innovative digital products for Africa and beyond",
        requestQuote: "Request a Quote",
        viewPlatforms: "View Our Platforms",
        becomeInvestor: "Become an Investor"
      },
      footer: {
        company: "Company",
        services: "Services",
        platforms: "Platforms",
        support: "Support",
        legal: "Legal",
        newsletter: "Newsletter",
        newsletterText: "Stay updated with our latest insights",
        subscribe: "Subscribe",
        rights: "All rights reserved",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        cookies: "Cookie Policy"
      }
    }
  },
  fr: {
    translation: {
      navigation: {
        home: "Accueil",
        about: "À Propos",
        services: "Services",
        platforms: "Plateformes",
        portfolio: "Portfolio",
        blog: "Blog",
        careers: "Carrières",
        contact: "Contact",
        getQuote: "Obtenir un Devis",
        login: "Connexion"
      },
      hero: {
        title: "Autonomiser l'Évolution Numérique de l'Afrique grâce aux Logiciels Personnalisés et à l'Innovation",
        subtitle: "Agence de logiciels full-service créant des produits numériques innovants pour l'Afrique et au-delà",
        requestQuote: "Demander un Devis",
        viewPlatforms: "Voir Nos Plateformes",
        becomeInvestor: "Devenir Investisseur"
      },
      footer: {
        company: "Entreprise",
        services: "Services",
        platforms: "Plateformes",
        support: "Support",
        legal: "Juridique",
        newsletter: "Newsletter",
        newsletterText: "Restez informé de nos dernières analyses",
        subscribe: "S'abonner",
        rights: "Tous droits réservés",
        privacy: "Politique de Confidentialité",
        terms: "Conditions de Service",
        cookies: "Politique des Cookies"
      }
    }
  },
  sw: {
    translation: {
      navigation: {
        home: "Nyumbani",
        about: "Kuhusu",
        services: "Huduma",
        platforms: "Majukwaa",
        portfolio: "Kazi",
        blog: "Blogu",
        careers: "Kazi",
        contact: "Wasiliana",
        getQuote: "Pata Nukuu",
        login: "Ingia"
      },
      hero: {
        title: "Kuongoza Mageuzi ya Kidijiti ya Afrika kupitia Programu za Kawaida na Uvumbuzi",
        subtitle: "Wakala kamili wa programu unaounda bidhaa za kidijiti za uvumbuzi kwa Afrika na zaidi",
        requestQuote: "Omba Nukuu",
        viewPlatforms: "Ona Majukwaa Yetu",
        becomeInvestor: "Kuwa Mwekezaji"
      },
      footer: {
        company: "Kampuni",
        services: "Huduma",
        platforms: "Majukwaa",
        support: "Msaada",
        legal: "Kisheria",
        newsletter: "Jarida",
        newsletterText: "Baki ukijua habari za hivi karibuni",
        subscribe: "Jiunge",
        rights: "Haki zote zimehifadhiwa",
        privacy: "Sera ya Faragha",
        terms: "Masharti ya Huduma",
        cookies: "Sera ya Kuki"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;