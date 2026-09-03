'use client';

import React, {useState, useEffect} from 'react';
import {
  Check,
  X,
  UserPlus,
  Copy
} from 'lucide-react';
import MainLayout from '@/MainLayout';
import TopCompaniesSection from '@/components/homepage/TopCompaniesSection';
import Button from '@/components/common/Button';

const Refer = () => {

const [name, setName] = useState("");
const [refUrl, setRefUrl] = useState("");
const [copied, setCopied] = useState(false);

// Update referral URL whenever name changes
useEffect(() => {
    if (!name) {
    setRefUrl("");
    return;
    }

    const BASE_URL = window.location.origin;

    const sanitizedName = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");

    setRefUrl(`${BASE_URL}/?referee=${sanitizedName}`);
}, [name]);

const handleCopy = async () => {
    if (!refUrl) return;

    await navigator.clipboard.writeText(refUrl);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
};
useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // or "smooth"
}, []);
  return (
    <MainLayout>
       
      <div className="mx-auto max-w-md bg-white pt-15 space-y-6 text-center min-h-[500px]">

        {/* Heading */}
        <h2 className="flex items-center justify-center gap-2 text-3xl font-normal mb-10">
            <UserPlus className="h-8 w-8" />
            Refer a Friend
        </h2>

        {/* Name Input */}
        <div className="space-y-2 text-left">
            <label className="text-md font-medium text-gray-700">
            Your Name
            </label>
            <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        {/* Referral URL */}
        <div className="space-y-2 text-left">
            <label className="text-md font-medium text-gray-700">
            Your Referral Link
            </label>

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={refUrl}
                    readOnly
                    placeholder="Referral link will appear here"
                    className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm bg-gray-50"
                />

                <button
                    onClick={handleCopy}
                    disabled={!refUrl}
                    className="flex items-center gap-2 bg-blue-500 px-4 py-2 rounded-md text-white"
                >
                    {copied ? (
                    <>
                        <Check className="h-4 w-4" />
                        Copied
                    </>
                    ) : (
                    <>
                        <Copy className="h-4 w-4" />
                        Copy
                    </>
                    )}
                </button>
            </div>
        </div>

        {/* Helper text */}
        <p className="text-xs text-gray-500">
        Share this link with friends to invite them to WisOwl.
        </p>
        </div>
    </MainLayout>
  );
};

export default Refer;
