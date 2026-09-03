import React from 'react';

export function FiltersSidebar() {
    return (
        <div className="hidden lg:block space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-lg">All Filters</h3>
                </div>

                <hr className="border-gray-100 mb-5" />

                {/* Work Mode Filter */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Work mode</h4>
                    <div className="space-y-2">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer h-4 w-4 border-gray-300 rounded text-brand-indigo focus:ring-brand-indigo/50 cursor-pointer" />
                            </div>
                            <span className="text-gray-600 text-sm group-hover:text-brand-indigo transition-colors">Remote</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer h-4 w-4 border-gray-300 rounded text-brand-indigo focus:ring-brand-indigo/50 cursor-pointer" />
                            </div>
                            <span className="text-gray-600 text-sm group-hover:text-brand-indigo transition-colors">On-site</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <div className="relative flex items-center">
                                <input type="checkbox" className="peer h-4 w-4 border-gray-300 rounded text-brand-indigo focus:ring-brand-indigo/50 cursor-pointer" />
                            </div>
                            <span className="text-gray-600 text-sm group-hover:text-brand-indigo transition-colors">Hybrid</span>
                        </label>
                    </div>
                </div>

                {/* Experience Filter */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Experience</h4>
                    <div className="space-y-2">
                        {['0-2 Yrs', '3-5 Yrs', '6-10 Yrs', '10+ Yrs'].map((exp) => (
                            <label key={exp} className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer h-4 w-4 border-gray-300 rounded text-brand-indigo focus:ring-brand-indigo/50 cursor-pointer" />
                                </div>
                                <span className="text-gray-600 text-sm group-hover:text-brand-indigo transition-colors">{exp}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Department (Static for visual) */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 text-sm">Department</h4>
                    <div className="space-y-2">
                        {['Engineering', 'Product', 'Design', 'Marketing'].map((dept) => (
                            <label key={dept} className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative flex items-center">
                                    <input type="checkbox" className="peer h-4 w-4 border-gray-300 rounded text-brand-indigo focus:ring-brand-indigo/50 cursor-pointer" />
                                </div>
                                <span className="text-gray-600 text-sm group-hover:text-brand-indigo transition-colors">{dept}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
