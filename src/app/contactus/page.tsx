"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { PhoneInputLayout } from "@/components/phoneInputLayout";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const CONTACT_INFO = {
  email: "faraz@indiasales.co",
  phones: ["+91 8009005768", "+91 8009494503"],
  workAddress: "18/1 A-1, Pokharpur, Jajmau, Kanpur - INDIA - 208010",
  headOffice: "40/120 Hospital Road, Parade, Kanpur - INDIA - 208001",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const fullFormData = { ...formData, phoneNumber: phone };

    try {
      const response = await axios.post("/api/contact", fullFormData);
      toast.success(response.data.message || "Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      setPhone("");
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || "Failed to send message"
        : "An error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hi, I would like to get in touch with India Sales."
    );
    window.open(
      `https://wa.me/918009005768?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-black">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        toastClassName="!bg-gray-800 !text-white"
      />

      {/* Header Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/5 via-transparent to-transparent pointer-events-none" />

        <div className="relative text-center py-12  px-4">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20">
            <MessageSquare className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-400 font-medium">
              Get In Touch
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
            Contact Us
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
            Have questions about our products? We&apos;d love to hear from you!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 lg:space-y-8">
            {/* Main Contact Card */}
            <div className=" rounded-2xl p-6 sm:p-8 border border-gray-700 shadow-xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-yellow-400" />
                </div>
                Contact Information
              </h2>

              <div className="space-y-5">
                {/* Email */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-black/30 hover:bg-black/50 text-gray-300 hover:text-yellow-400 transition-all duration-300 group border border-transparent hover:border-yellow-400/20"
                >
                  <div className="w-12 h-12 bg-yellow-400/10 rounded-xl flex items-center justify-center group-hover:bg-yellow-400/20 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500 mb-0.5">
                      Email
                    </p>
                    <p className="font-medium text-sm sm:text-base truncate">
                      {CONTACT_INFO.email}
                    </p>
                  </div>
                </a>

                {/* Phone Numbers */}
                {CONTACT_INFO.phones.map((phoneNum, index) => (
                  <a
                    key={phoneNum}
                    href={`tel:${phoneNum.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-black/30 hover:bg-black/50 text-gray-300 hover:text-green-400 transition-all duration-300 group border border-transparent hover:border-green-400/20"
                  >
                    <div className="w-12 h-12 bg-green-400/10 rounded-xl flex items-center justify-center group-hover:bg-green-400/20 transition-colors flex-shrink-0">
                      <Phone className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-gray-500 mb-0.5">
                        Phone {index + 1}
                      </p>
                      <p className="font-medium text-sm sm:text-base">
                        {phoneNum}
                      </p>
                    </div>
                  </a>
                ))}

                {/* Addresses */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 text-gray-300 border border-gray-700/30">
                  <div className="w-12 h-12 bg-blue-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      Head Office
                    </p>
                    <p className="font-medium text-sm sm:text-base leading-relaxed">
                      {CONTACT_INFO.headOffice}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 text-gray-300 border border-gray-700/30">
                  <div className="w-12 h-12 bg-purple-400/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      Work Address
                    </p>
                    <p className="font-medium text-sm sm:text-base leading-relaxed">
                      {CONTACT_INFO.workAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 sm:p-8 border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <FaWhatsapp className="text-2xl text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Quick Response
                  </h3>
                  <p className="text-sm text-gray-400">Get instant support</p>
                </div>
              </div>
              <Button
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-base sm:text-lg gap-3 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300"
              >
                <FaWhatsapp className="text-xl" />
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-200">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                Send a Message
              </h2>
              <p className="text-sm text-gray-600">
                Fill out the form and we&apos;ll get back to you shortly
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border p-4 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-400 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-400/50"
                      : "border-gray-300 focus:ring-yellow-400/50 focus:border-yellow-400"
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border p-4 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 bg-white text-gray-900 placeholder:text-gray-400 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-400/50"
                      : "border-gray-300 focus:ring-yellow-400/50 focus:border-yellow-400"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone{" "}
                  <span className="text-gray-400 text-xs">(optional)</span>
                </label>
                <PhoneInputLayout
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(value) => setPhone(value || "")}
                  className="w-full border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-yellow-400/50 focus-within:border-yellow-400 transition-all duration-300 bg-white"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full border p-4 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none bg-white text-gray-900 placeholder:text-gray-400 ${
                    errors.message
                      ? "border-red-500 focus:ring-red-400/50"
                      : "border-gray-300 focus:ring-yellow-400/50 focus:border-yellow-400"
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                />
                {errors.message && (
                  <p
                    id="message-error"
                    className="text-red-500 text-sm mt-2 flex items-center gap-1"
                  >
                    <span className="inline-block w-1 h-1 rounded-full bg-red-500"></span>
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-6 rounded-xl transition-all duration-300 gap-2 shadow-lg hover:shadow-yellow-400/25 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-gray-500 mt-4">
                We&apos;ll respond within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
