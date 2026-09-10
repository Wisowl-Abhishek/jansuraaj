import React from 'react';
import { UserAuth } from "../../context/AuthContext";
import { useLanguage } from "../../context/LanguageContext";

const Hero = ({ setShowSignin }) => {
    const { appUrl } = UserAuth();
    const { t, language } = useLanguage();

    return (
        <section className="hero relative">
            {/* <div
                className="pointer-events-none absolute -top-32 -right-2 h-[1000px] w-[1000px] rounded-full opacity-30 z-10"
                style={{
                background:
                    "radial-gradient(circle, #fdd34e 0%, transparent 70%)",
                }}
            /> */}

            <div
                className="pointer-events-none absolute bottom-0 -left-34 h-[1000px] w-[1000px] rounded-full opacity-20 z-10"
                style={{
                background:
                    "radial-gradient(circle, #fdd34e 0%, transparent 70%)",
                }}
            />

            <div className="container text-center text-white relative z-20">

                <div className="hero__logo">
                        <img src="/jansuraajlogo.png" alt="logo" className="mx-auto" />
                </div>

                <div className="hero__trusted-line text-brand-gold font-normal mb-3 text-sm sm:text-lg">
                    {t.hero.tagline}
                </div>

                <h1 className={`hero__tag-line first-letter mb-4 ${language === "hi" ? "hero__tag-line--hi" : ""}`}>
                    {t.hero.headlineLine1}
                    <br />
                    {t.hero.headlineLine2}
                </h1>

                <div className='text-md sm:text-2xl leading-6 sm:leading-9 mb-8 sm:mb-8 max-w-3xl mx-auto'>
                    {t.hero.subheadline}
                </div>

                <button
                    onClick={() => {
                        if (typeof window !== "undefined" && window.gtag) {
                            window.gtag("event", "ClickSignUpFreeButtonHero", { event_category: "LandingPage" });
                        }
                        window.open(`${appUrl}/signup`, "_blank");
                    }}
                    className="inline-flex items-center justify-center bg-brand-gold text-brand-midnight px-9 py-4 rounded-full text-base font-bold transition-all hover:bg-brand-amber hover:-translate-y-0.5"
                >
                    {t.hero.cta}
                </button>
            </div>
        </section>
    )
};

export default Hero;
