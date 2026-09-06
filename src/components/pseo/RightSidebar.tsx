import React from 'react';

interface RightSidebarProps {
    marketSnapshot?: string;
    salaryRange?: {
        low: string;
        high: string;
        raw?: string;
    } | any;
    jobCount?: number;
    role?: string;
    location?: string;
}

export function RightSidebar({ marketSnapshot, salaryRange, jobCount, role, location }: RightSidebarProps) {
    // Helper to extract numeric values for graph visualization
    const low = parseFloat(salaryRange?.low) || 0;
    const high = parseFloat(salaryRange?.high) || 0;
    const heightLow = low ? Math.min(Math.max((low / 50) * 100, 20), 80) : 30;
    const heightHigh = high ? Math.min(Math.max((high / 50) * 100, 20), 100) : 60;

    const locationSuffix = location ? ` in ${location}` : '';

    return (
        <div className="space-y-6">
            {/* Market Snapshot Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-brand-indigo/10 rounded-lg text-brand-indigo">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900">Market Snapshot</h3>
                </div>
                {jobCount !== undefined && jobCount > 0 ? (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-brand-indigo/5 rounded-lg p-3">
                            <span className="text-xs text-gray-500 font-medium">Active Openings</span>
                            <span className="text-lg font-bold text-brand-indigo">{jobCount.toLocaleString('en-IN')}+</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {role && `There are ${jobCount.toLocaleString('en-IN')}+ active ${role} positions${locationSuffix}. The market shows strong demand for this role.`}
                        </p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {marketSnapshot || "Loading market trends..."}
                    </p>
                )}
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                    <span>Updated recently</span>
                    <span>Jan Suraaj Analytics</span>
                </div>
            </div>

            {/* Resume Optimizer CTA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-3 mb-5">
                    <div className="p-2 bg-brand-gold/15 rounded-lg">
                        <svg className="w-5 h-5 text-brand-indigo" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9.75m-1.5 3h7.5M7.5 21h9a2.25 2.25 0 002.25-2.25V8.844a2.25 2.25 0 00-.659-1.591l-4.844-4.844A2.25 2.25 0 0011.656 1.5H7.5A2.25 2.25 0 005.25 3.75v15A2.25 2.25 0 007.5 21z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">
                        How to get hired{location ? ` in ${location}` : ''}
                    </h3>
                </div>
                <a
                    href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://jansuraajapp.wisowl.com'}/resume-builder`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center text-xs font-semibold text-brand-midnight  bg-brand-gold rounded-full py-3 hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Optimize My Resume for this Market
                </a>
            </div>

            {/* Salary Trends Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Salary Trends</h3>
                        <p className="text-xs text-gray-500">Average salary range</p>
                    </div>
                </div>

                {/* Line Chart Visualization */}
                {(() => {
                    // Generate simulated salary data points (2023-2027)
                    // Base it on the current avg salary, with realistic growth
                    const baseSalary = low > 0 ? low : 5;
                    const currentSalary = high > 0 ? high : 10;
                    const growthRate = 0.08; // ~8% annual growth

                    // Work backwards from current to estimate past values
                    const s2023 = Math.round(baseSalary * 0.82);
                    const s2024 = Math.round(baseSalary * 0.90);
                    const s2025 = Math.round(baseSalary);
                    const s2026 = Math.round(currentSalary);
                    const s2027 = Math.round(currentSalary * (1 + growthRate)); // predicted

                    const points = [s2023, s2024, s2025, s2026, s2027];
                    const maxVal = Math.max(...points) * 1.15;
                    const minVal = Math.min(...points) * 0.85;
                    const range = maxVal - minVal || 1;

                    // SVG dimensions
                    const W = 220;
                    const H = 120;
                    const padX = 15;
                    const padY = 12;
                    const chartW = W - padX * 2;
                    const chartH = H - padY * 2;

                    // Convert data to SVG coordinates
                    const coords = points.map((val, i) => ({
                        x: padX + (i / 4) * chartW,
                        y: padY + chartH - ((val - minVal) / range) * chartH,
                        val,
                    }));

                    // Build path segments
                    const actualPath = coords.slice(0, 4).map((c, i) => (i === 0 ? `M${c.x},${c.y}` : `L${c.x},${c.y}`)).join(' ');
                    const predictedPath = `M${coords[3].x},${coords[3].y} L${coords[4].x},${coords[4].y}`;

                    // Gradient fill under the actual line
                    const fillPath = `${actualPath} L${coords[3].x},${H - padY} L${coords[0].x},${H - padY} Z`;

                    return (
                        <div className="h-36 mb-3 relative">
                            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <linearGradient id="salaryGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                                    </linearGradient>
                                </defs>

                                {/* Horizontal grid lines */}
                                {[0.25, 0.5, 0.75].map((frac) => (
                                    <line key={frac} x1={padX} y1={padY + chartH * (1 - frac)} x2={W - padX} y2={padY + chartH * (1 - frac)} stroke="#f3f4f6" strokeWidth="1" />
                                ))}

                                {/* Gradient fill under actual line */}
                                <path d={fillPath} fill="url(#salaryGradient)" />

                                {/* Actual trend line (2023–2026) - solid */}
                                <path d={actualPath} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                                {/* Predicted line (2026–2027) - dotted */}
                                <path d={predictedPath} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 4" opacity="0.7" />

                                {/* Data point dots */}
                                {coords.map((c, i) => (
                                    <g key={i}>
                                        {/* Outer ring */}
                                        <circle cx={c.x} cy={c.y} r={i === 4 ? 5 : 4} fill="white" stroke={i === 4 ? '#10b981' : '#10b981'} strokeWidth={i === 4 ? 1.5 : 1.5} strokeDasharray={i === 4 ? '2 2' : 'none'} opacity={i === 4 ? 0.7 : 1} />
                                        {/* Inner dot */}
                                        <circle cx={c.x} cy={c.y} r="2" fill="#10b981" opacity={i === 4 ? 0.5 : 1} />
                                    </g>
                                ))}

                                {/* "Predicted" label near 2027 dot */}
                                <text x={coords[4].x} y={coords[4].y - 10} textAnchor="middle" fontSize="7" fill="#6b7280" fontStyle="italic">Predicted</text>
                            </svg>
                        </div>
                    );
                })()}

                <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>2023</span>
                    <span>2024</span>
                    <span>2025</span>
                    <span>2026</span>
                    <span className="text-emerald-500 italic">2027</span>
                </div>

                <div className="mt-4 bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed">
                    {salaryRange?.low !== 'N/A' && low > 0
                        ? `The average salary for this role ranges from ₹${salaryRange?.low} to ₹${salaryRange?.high} per annum, depending on experience and skill level.`
                        : "Salary data is not widely disclosed for this role. Login to see personalized insights."}
                </div>
            </div>


        </div>
    );
}
