import React, {useEffect} from "react";
import MainLayout from "../../MainLayout";
import {
  Package,
  CreditCard,
  Clock,
  Globe,
  AlertTriangle,
  Info,
  Mail,
  Smartphone,
  CheckCircle,
} from "lucide-react";

function ShippingDeliveryPolicy() {
useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" }); // or "smooth"
}, []);
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto p-6 md:p-10 text-gray-800 space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-600" />
          Shipping and Delivery Policy
        </h1>
        <p className="text-sm text-gray-500">Last updated: 01 September 2025</p>

        {/* Digital Service Delivery */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-purple-500" />
            Digital Service Delivery
          </h2>
          <p>
            WisOwl provides digital services and credit-based solutions delivered electronically. This policy outlines our delivery procedures and timelines for all digital products and services.
          </p>
        </section>

        {/* Service Delivery Method */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-500" />
            Service Delivery Method
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>All WisOwl services are delivered digitally through our online platform.</li>
            <li>No physical products are shipped or mailed.</li>
            <li>Credits and services are typically activated immediately upon payment.</li>
            <li>All purchases are linked to your registered WisOwl account.</li>
          </ul>
        </section>

        {/* Delivery Process */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-500" />
            Delivery Process
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Payment Confirmation:</strong> Delivery begins after payment verification.</li>
            <li><strong>Account Activation:</strong> Credits automatically added to your account.</li>
            <li><strong>Email Notification:</strong> Confirmation sent to your registered email.</li>
            <li><strong>Platform Access:</strong> Immediate access via dashboard.</li>
          </ul>
        </section>

        {/* Delivery Timeframes */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            Delivery Timeframes
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Credit Purchases:</strong> Instant delivery (within 5 minutes).</li>
            <li><strong>Account Upgrades & Service Features:</strong> Available immediately.</li>
            <li><strong>Potential Delays:</strong> Payment gateway, account verification, technical maintenance, or bank processing may cause delays.</li>
            <li><strong>Maximum Delivery Time:</strong> Standard purchases within 1 hour; large packages or first-time customers up to 24 hours.</li>
          </ul>
        </section>

        {/* Delivery Confirmation */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            Delivery Confirmation
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Email confirmation with purchase details.</li>
            <li>Dashboard update showing new credit balance.</li>
            <li>Transaction receipt for your records.</li>
            <li>Service activation notice if applicable.</li>
          </ul>
        </section>

        {/* Failed Delivery */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Failed Delivery
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>You will be notified via email within 2 hours.</li>
            <li>Support team investigates automatically.</li>
            <li>Resolution provided within 24 hours.</li>
            <li>Alternative delivery methods may be offered if needed.</li>
          </ul>
        </section>

        {/* Geographic Coverage */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            Geographic Coverage
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>WisOwl digital services are available globally with no restrictions.</li>
            <li>Services delivered to any location with internet access, 24/7.</li>
            <li>Regional variations may apply due to regulations, taxes, or payment methods.</li>
          </ul>
        </section>

        {/* Technical Requirements */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-purple-500" />
            Technical Requirements
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Stable internet connection required.</li>
            <li>Valid WisOwl account with verified email.</li>
            <li>Modern browser (Chrome, Firefox, Safari, Edge).</li>
            <li>Email access to receive confirmations.</li>
            <li>Platform is web-based, mobile-friendly, cross-platform.</li>
          </ul>
        </section>

        {/* Support and Refunds */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-500" />
            Delivery Issues & Support
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>If credits not received, check dashboard, email, or wait 30 mins for payment processing.</li>
            <li>For technical issues, clear cache, try another browser/device, check internet, or contact support.</li>
            <li>Support: [support@wisowl.com] | Response: within 2 hours (business hours)</li>
            <li>Emergency critical issues addressed within 1 hour.</li>
          </ul>
        </section>

        {/* Billing & Address */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Billing and Delivery Address
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>No shipping address required; delivery is digital.</li>
            <li>Billing address used for verification and tax calculation.</li>
            <li>Email serves as primary delivery confirmation.</li>
            <li>Changes require verification; major changes may need account ownership confirmation.</li>
          </ul>
        </section>

        {/* Data Protection */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Data Protection and Privacy
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Delivery confirmations contain only necessary transaction details.</li>
            <li>Email communications secured and encrypted.</li>
            <li>Account access logs maintained for security.</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Mail className="w-5 h-5 text-green-500" />
            Contact Information
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Primary Support: [support@wisowl.com] (Delivery Issues: "DELIVERY PROBLEM")</li>
            <li>Technical Support: [tech@wisowl.com]</li>
            <li>Business Hours: Monday - Friday, 9:00 AM - 6:00 PM EST</li>
          </ul>
        </section>
      </div>
    </MainLayout>
  );
}

export default ShippingDeliveryPolicy;
