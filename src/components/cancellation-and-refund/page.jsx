import React, {useEffect} from "react";
import MainLayout from "../../MainLayout";

import {
  Mail,
  Clock,
  Info,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  FileText,
  } from "lucide-react";

function CancellationRefundPolicy() {

useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // or "smooth"
}, []);
  return (
    <MainLayout>
      <div className="min-h-screenp-6 md:p-12">
      <div className="mx-auto max-w-5xl bg-white rounded-2xl shadow-md overflow-hidden">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between p-6 border-b border-gray-200">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 p-3 text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Cancellations & Refunds Policy
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: 10-10-2025</p>
            </div>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-3">
            {/* <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium shadow-sm hover:shadow focus:outline-none"
            >
              <FileText className="h-4 w-4" /> Print
            </button> */}
            <a
              href="mailto:support@wisowl.com?subject=Policy Inquiry"
              className="inline-flex items-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 text-sm font-medium shadow hover:bg-indigo-700 hover:text-white"
            >
              <Mail className="h-4 w-4" /> Contact Support
            </a>
          </div>
        </header>

        <main className="p-8 space-y-8 text-gray-800 leading-relaxed">
          <section>
            <p>
              At <span className="font-semibold">Jan Suraaj</span>, we are committed to delivering high-quality, AI-powered learning and professional growth services through our credit-based platform. This document outlines our official policy regarding cancellations and refunds.
            </p>
            <p className="mt-4">
              By purchasing, accessing, or using Jan Suraaj credits or services, you acknowledge and agree to the terms stated below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2"><Info className="h-5 w-5 text-indigo-600" />1. Understanding Our Credit System</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Jan Suraaj operates on a <span className="font-semibold">credit-based model</span>. Users purchase credits that can be redeemed for specific services, tools, and features available on the platform.</li>
              <li>Credits are <span className="font-semibold">instantly available</span> upon successful payment.</li>
              <li>Credits represent <span className="font-semibold">digital access rights</span> and are not physical goods.</li>
              <li>Once credits are applied to your account, the services are considered <span className="font-semibold">delivered and fulfilled.</span></li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2"><RefreshCw className="h-5 w-5 text-indigo-600" />2. Cancellation Policy</h2>
            <h3 className="font-semibold mt-3">2.1 No Cancellations</h3>
            <p>
              All credit purchases made through Jan Suraaj are final and non-cancellable. Once a transaction is processed and credits are credited to your account, it <span className="font-semibold">cannot be canceled, modified, or reversed.</span>
            </p>
            <p className="mt-2">Jan Suraaj <span className="font-semibold">does not entertain cancellation requests</span> for the following reasons:</p>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Change of mind</li>
              <li>Unused or partially used credits</li>
              <li>Dissatisfaction with outcomes, AI-generated content, or performance</li>
              <li>Delay or failure to utilize credits before expiration</li>
              <li>Inactivity or non-usage of the platform</li>
            </ul>
            <h3 className="font-semibold mt-3">2.2 Instant Service Fulfilment</h3>
            <p>
              Because Jan Suraaj’s credits are delivered instantly and enable immediate access to digital services, the purchase is classified as a <span className="font-semibold">completed service transaction</span>. Therefore, <span className="font-semibold">no cancellation requests</span> will be accepted after payment confirmation.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-indigo-600" />3. Refund Policy</h2>
            <h3 className="font-semibold mt-3">3.1 No Refunds</h3>
            <p>
              All payments and credit purchases on Jan Suraaj are <span className="font-semibold">non-refundable</span>, regardless of circumstances. This includes, but is not limited to:
            </p>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Unused, partially used, or expired credits</li>
              <li>Change of mind after purchase</li>
              <li>User errors or mistaken transactions</li>
              <li>Dissatisfaction with service quality, outcomes, or experience</li>
              <li>Technical issues arising from user devices, connectivity, or third-party services</li>
              <li>Delays in service usage or access</li>
            </ul>
            <p className="mt-2">
              Once credits are allocated to your account, they are <span className="font-semibold">deemed consumed digital services and are not eligible for monetary refunds.</span>
            </p>
            <h3 className="font-semibold mt-3">3.2 Duplicate Transactions</h3>
            <p>
              In rare cases of a <span className="font-semibold">proven duplicate charge</span> caused by a system error on Jan Suraaj's side:
            </p>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Users must notify <b>support@wisowl.com</b> within <span className="font-semibold">7 days</span> of the transaction.</li>
              <li>Upon verification, Jan Suraaj may, <span className="font-semibold">at its sole discretion</span>, issue a <span className="font-semibold">service credit adjustment</span> or reverse the duplicate charge.</li>
              <li>No other forms of compensation will be provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2"><Clock className="h-5 w-5 text-indigo-600" />4. Technical Issues and Resolutions</h2>
            <p>
              Jan Suraaj strives to ensure consistent uptime and service reliability. In the unlikely event of a <span className="font-semibold">verified platform-wide technical disruption</span> directly caused by Jan Suraaj that prevents service access for more than 48 consecutive hours:
            </p>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Jan Suraaj may, at its discretion, provide <span className="font-semibold">service credits or access extensions</span>.</li>
              <li><span className="font-semibold">Cash or monetary refunds will not be provided under any circumstances.</span></li>
              
            </ul>
            <p className="mt-4">Users must report such issues within <span className="font-semibold">48 hours</span> of occurrence by contacting <b>support@wisowl.com</b> with detailed documentation.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-indigo-600" />5. Credit Expiration and Account Terms</h2>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Credits have an <span className="font-semibold">expiration period</span> stated at the time of purchase.</li>
              <li><span className="font-semibold">Expired credits</span> are automatically forfeited and <span className="font-semibold">cannot be reinstated, extended, or refunded.</span></li>
              <li>If a user's account is <span className="font-semibold">terminated due to policy violations</span>, all remaining credits are immediately forfeited.</li>
              <li>Voluntary account closure does not qualify for refunds or reimbursement of unused credits.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2"><FileText className="h-5 w-5 text-indigo-600" />6. Dispute Resolution</h2>
            <h3 className="font-semibold mt-3">6.1 Internal Review Process</h3>
            <p>
              If you believe a transaction error has occurred, you may submit a request for internal review within <span className="font-semibold">7 days</span> of purchase by emailing <b>support@wisowl.com</b> with:
            </p>
            <ul className="list-disc ml-6 mt-1 space-y-1">
              <li>Registered account email and user ID </li>
              <li>Transaction reference number</li>
              <li>Detailed description of the issue</li>
              <li>Supporting documentation, if any</li>
            </ul>
            <p className="mt-2">Jan Suraaj will investigate the matter and respond within <span className="font-semibold">5-7 business days.</span></p>
            <h3 className="font-semibold mt-3">6.2 Final Decision</h3>
            <p>
              Following the review process, all decisions made by Jan Suraaj shall be <span className="font-semibold">final and binding</span>. Jan Suraaj reserves the right to reject refund or reversal requests that do not comply with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2"><Info className="h-5 w-5 text-indigo-600" />7. Policy Updates</h2>
            <p>
              Jan Suraaj reserves the right to <span className="font-semibold">update or amend this policy</span> at any time without prior notice. Updated versions will be published on our website with a revised “Last Updated” date.
            </p>
            <p>
              Continued use of Jan Suraaj services after such updates signifies your <span className="font-semibold">acceptance of the modified policy.</span>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-indigo-600" />8. Governing Law and Jurisdiction</h2>
            <p>
              This policy and any related disputes are governed by the laws of <span className="font-semibold">India</span>. All disputes arising from or relating to this policy shall be subject to the <span className="font-semibold">exclusive jurisdiction of the competent courts in New Delhi, India.</span>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold flex items-center gap-2"><Mail className="h-5 w-5 text-indigo-600" />9. Contact Information</h2>
            <p>
              For assistance or inquiries related to this policy:
              <br />📧 Email: <b>support@wisowl.com</b>
              <br />📌 Subject Line: “Policy Inquiry”
              <br />🕒 Response Time: 1-2 business days
              <br />🗓 Business Hours: Monday - Friday, 9:00 AM - 6:00 PM IST
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Please note: Requests made through social media, chat, or other informal channels will <span className="font-semibold">not</span> be processed.
            </p>
          </section>

          <section className="bg-slate-50 rounded-lg p-5">
            <h2 className="text-lg font-semibold text-gray-900">Disclaimer</h2>
            <p className="mt-2 text-gray-700">
              By purchasing credits or using Jan Suraaj’s services, you acknowledge and agree that:
              <ul className="list-disc ml-6 mt-1 space-y-1">
               <li>all purchases are <span className="font-semibold">final, non-cancellable, and non-refundable.</span></li> 
               <li>Credits constitute <span className="font-semibold">instant access to digital services</span> and are considered <span className="font-semibold">delivered upon purchase</span>.</li>
               <li>This policy ensures fairness, transparency, and operational consistency for all Jan Suraaj users.</li>
              </ul>
            </p>
          </section>
        </main>
      </div>
    </div>
    </MainLayout>
  );
}

export default CancellationRefundPolicy;
