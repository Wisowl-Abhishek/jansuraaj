import React from 'react';
import { UserAuth } from "../../context/AuthContext";
import HeroSearchJobBar from './HeroSearchJobBar';
import EyeFollowOwl from '../EyeFollowOwl';

const Hero = ({ setShowSignin }) => {
    const { appUrl } = UserAuth();

    return (
        <section className="hero relative">
            <div
                className="pointer-events-none absolute -top-32 -right-2 h-[1000px] w-[1000px] rounded-full opacity-30 z-10"
                style={{
                background:
                    "radial-gradient(circle, #ffde59 0%, transparent 70%)",
                }}
            />

            <div
                className="pointer-events-none absolute bottom-0 -left-34 h-[1000px] w-[1000px] rounded-full opacity-20 z-10"
                style={{
                background:
                    "radial-gradient(circle, #ffde59 0%, transparent 70%)",
                }}
            />
            <div className="container text-center text-white relative z-20">

                <div className="hero__logo">
                        <EyeFollowOwl />
                </div>

                <div className="hero__trusted-line text-brand-gold font-normal mb-3 text-sm sm:text-lg">
                    Join 1000+ job seekers who landed their dream jobs
                </div>

                <h1 className="hero__tag-line first-letter mb-8">Find Your Dream Job <br />
                    <i className='text-brand-gold'>3x Faster</i> with AI
                </h1>

                <div className='max-w-5xl mx-auto mb-4 sm:mb-8'>
                    <HeroSearchJobBar />
                </div>

                <div className='text-md sm:text-2xl leading-6 sm:leading-9 mb-8 sm:mb-5'>
                    Stop wasting time on endless job apps.<br />
                    Find perfect job matches using AI.
                </div>

                <div className="hero__feature-list mb-6 sm:mb-8 text-sm sm:text-md">
                    <ul>
                        <li className=' text-md sm:text-lg'>All Jobs at One Place</li>
                        <li className=' text-md sm:text-lg'>Personalised Jobs</li>
                        <li className=' text-md sm:text-lg'>AI Resume Builder</li>
                        {/* <li>Auto Apply*</li> */}
                    </ul>
                </div>
            </div>
        </section>
    )
};

export default Hero;
