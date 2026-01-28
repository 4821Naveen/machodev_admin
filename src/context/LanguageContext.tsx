"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ta";

interface Translations {
    [key: string]: {
        en: string;
        ta: string;
    };
}

export const translations: Translations = {
    // Hero
    heroBadge: {
        en: "Limited Offer – Only 5 Students Selected",
        ta: "சிறப்புச் சலுகை – 5 மாணவர்கள் மட்டுமே தேர்வு செய்யப்படுவர்",
    },
    heroHeading1: {
        en: "PLACEMENT-READY",
        ta: "வேலைவாய்ப்பிற்குத் தயாரான",
    },
    heroHeading2: {
        en: "PORTFOLIO",
        ta: "போர்ட்ஃபோலியோ",
    },
    heroSub: {
        en: "Resume + Portfolio Website + Career Profile. Stand out in the campus placements with a digital presence.",
        ta: "பயோடேட்டா + போர்ட்ஃபோலியோ இணையதளம் + தொழில்முறை விவரக்குறிப்பு. டிஜிட்டல் முன்னிலையுடன் வளாக நேர்காணல்களில் தனித்து நிற்பீர்கள்.",
    },
    registerNow: {
        en: "Register Now",
        ta: "இப்போது பதிவு செய்யுங்கள்",
    },
    scroll: {
        en: "SCROLL",
        ta: "கீழே செல்லவும்",
    },
    // Features
    whatYouGet: {
        en: "WHAT YOU WILL GET",
        ta: "மாணவர்கள் பெறும் நன்மைகள்",
    },
    feat1Title: { en: "Portfolio Website", ta: "போர்ட்ஃபோலியோ இணையதளம்" },
    feat1Desc: { en: "Get a professional, shareable link to showcase your projects and skills.", ta: "உங்கள் திட்டங்கள் மற்றும் திறன்களைக் காட்ட தொழில்முறை இணைப்பைப் பெறுங்கள்." },
    feat2Title: { en: "Resume Formatting", ta: "பயோடேட்டா தயாரித்தல்" },
    feat2Desc: { en: "ATS-friendly resume templates that get you noticed by recruiters.", ta: "நிறுவனங்களால் எளிதில் அடையாளம் காணக்கூடிய பயோடேட்டா மாதிரிகள்." },
    feat3Title: { en: "LinkedIn Setup", ta: "லிங்க்ட்-இன் அமைப்பு" },
    feat3Desc: { en: "Optimize your LinkedIn profile for maximum visibility and networking.", ta: "அதிகப்படியான வேலைவாய்ப்புகளுக்காக உங்கள் லிங்க்ட்-இன் சுயவிவரத்தை மேம்படுத்துங்கள்." },
    feat4Title: { en: "Interview Tips", ta: "நேர்காணல் குறிப்புகள்" },
    feat4Desc: { en: "Expert tips on how to share your portfolio and crack interviews.", ta: "போர்ட்ஃபோலியோவை பகிர்வது மற்றும் நேர்காணல்களை எதிர்கொள்வது பற்றிய நிபுணர் குறிப்புகள்." },
    feat5Title: { en: "WhatsApp Support", ta: "வாட்ஸ்அப் ஆதரவு" },
    feat5Desc: { en: "Direct access to our team for any career or technical queries.", ta: "தொழில்முறை அல்லது தொழில்நுட்ப சந்தேகங்களுக்கு எங்களை நேரடியாகத் தொடர்பு கொள்ளலாம்." },
    // Offer
    limitedOffer: { en: "LIMITED SELECTION OFFER", ta: "குறுகிய காலத் தேர்வுச் சலுகை" },
    offerNote: { en: "Random selection from registered students", ta: "பதிவு செய்த மாணவர்களிலிருந்து சீரற்ற முறையில் தேர்ந்தெடுக்கப்படுவர்" },
    offerWarning: { en: "Note: Registration does not guarantee selection", ta: "குறிப்பு: பதிவு செய்வது தேர்வை உறுதிப்படுத்தாது" },
    priceOld: { en: "₹1,499", ta: "₹1,499" },
    priceNew: { en: "₹999", ta: "₹999" },
    onlyFor5: { en: "ONLY FOR 5 SELECTED STUDENTS", ta: "தேர்ந்தெடுக்கப்பட்ட 5 மாணவர்களுக்கு மட்டும்" },
    waitlist: { en: "Waitlist filling fast", ta: "இடங்கள் விரைவாக நிரம்பி வருகின்றன" },
    // Form
    secureSpot: { en: "SECURE YOUR SPOT", ta: "உங்கள் இடத்தை உறுதி செய்யுங்கள்" },
    fullName: { en: "Full Name", ta: "முழு பெயர்" },
    mobile: { en: "Mobile Number", ta: "மொபைல் எண்" },
    email: { en: "Email ID", ta: "மின்னஞ்சல்" },
    college: { en: "College Name", ta: "கல்லூரி பெயர்" },
    degree: { en: "Degree & Dept", ta: "படிப்பு மற்றும் துறை" },
    year: { en: "Year", ta: "படிக்கும் ஆண்டு" },
    skills: { en: "Skills", ta: "திறன்கள்" },
    careerGoal: { en: "Career Goal", ta: "எதிர்காலத் திட்டம்" },
    agree: { en: "I agree to receive career-related updates via WhatsApp/Email.", ta: "வாட்ஸ்அப் அல்லது மின்னஞ்சல் வழியாக வேலைவாய்ப்பு தகவல்களைப் பெற ஒப்புக்கொள்கிறேன்." },
    submit: { en: "SUBMIT REGISTRATION", ta: "முன்பதிவு செய்" },
    successTitle: { en: "REGISTRATION SUCCESSFUL!", ta: "பதிவு வெற்றிகரமாக முடிந்தது!" },
    successSub: { en: "We will contact you soon if you are selected.", ta: "நீங்கள் தேர்ந்தெடுக்கப்பட்டால் விரைவில் உங்களுக்குத் தகவல் தெரிவிக்கப்படும்." },
    helpFriends: { en: "HELP YOUR FRIENDS TOO", ta: "உங்கள் நண்பர்களுக்கும் உதவுங்கள்" },
    shareWA: { en: "Share on WhatsApp", ta: "வாட்ஸ்அப்பில் பகிரவும்" },
    copyLink: { en: "Copy Link", ta: "இணைப்பை நகலெடுக்கவும்" },
    linkCopied: { en: "Link copied!", ta: "இணைப்பு நகலெடுக்கப்பட்டது!" },
    // Options
    year2: { en: "2nd Year", ta: "இரண்டாம் ஆண்டு" },
    year3: { en: "3rd Year", ta: "மூன்றாம் ஆண்டு" },
    yearFinal: { en: "Final Year", ta: "இறுதி ஆண்டு" },
    goalJob: { en: "Job", ta: "வேலை" },
    goalIntern: { en: "Internship", ta: "பயிற்சி" },
    goalHigher: { en: "Higher Studies", ta: "மேற்படிப்பு" },
    // Status
    regClosedTitle: { en: "REGISTRATION COMPLETED", ta: "முன்பதிவு முடிவடைந்தது" },
    regClosedDesc: { en: "We have reached our limit of 100 students or registration is closed by admin.", ta: "100 இடங்களும் நிரம்பிவிட்டன அல்லது நிர்வாகியால் முன்பதிவு நிறுத்தப்பட்டுள்ளது." },
    techErrorTitle: { en: "TECHNICAL DIFFICULTY", ta: "தொழில்நுட்பக் கோளாறு" },
    techErrorDesc: { en: "The registration system is currently offline.", ta: "முன்பதிவு முறை தற்போது முடக்கப்பட்டுள்ளது." },
    connecting: { en: "Connecting to Vault...", ta: "தரவுத்தளத்துடன் இணைக்கப்படுகிறது..." },
    errorDetails: { en: "Error Details:", ta: "பிழை விவரங்கள்:" },
    unknownError: { en: "Unknown Connection Error", ta: "தெரியாத இணைப்பு பிழை" },
    // Trust
    trustTitle: { en: "TRANSPARENCY & TRUST", ta: "வெளிப்படைத்தன்மை மற்றும் நம்பிக்கை" },
    trustDesc: { en: "Your data is safe with us. We collect your details only to provide you with the best career guidance, portfolio building services, and updates about internships and projects.", ta: "உங்கள் தரவு எங்களிடம் பாதுகாப்பாக உள்ளது. சிறந்த தொழில் வழிகாட்டுதல், போர்ட்ஃபோலியோ உருவாக்கம் மற்றும் வேலைவாய்ப்பு தகவல்களை வழங்க மட்டுமே உங்கள் விவரங்களைச் சேகரிக்கிறோம்." },
    trustNoData: { en: "No Data Selling. No Spam. No Dark Patterns.", ta: "தரவு விற்பனை இல்லை. ஸ்பேம் இல்லை. தவறான விளம்பரங்கள் இல்லை." },
    // Footer
    footerDesc: { en: "Building professional technology solutions for the next generation of engineers and businesses.", ta: "அடுத்த தலைமுறை பொறியாளர்கள் மற்றும் வணிகங்களுக்கான மேம்பட்ட தொழில்நுட்ப தீர்வுகளை உருவாக்குதல்." },
    quickLinks: { en: "QUICK LINKS", ta: "விரைவான இணைப்புகள்" },
    privacyPolicy: { en: "PRIVACY POLICY", ta: "தனியுரிமைக் கொள்கை" },
    termsService: { en: "TERMS OF SERVICE", ta: "சேவை விதிமுறைகள்" },
    disclaimer: { en: "Disclaimer: This is an independent student support initiative. Not affiliated with any college.", ta: "பொறுப்புத் துறப்பு: இது ஒரு சுயாதீனமான மாணவர் நல முன்னெடுப்பு. எந்தக் கல்லூரியுடனும் இணைக்கப்படவில்லை." },
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    const t = (key: string) => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
