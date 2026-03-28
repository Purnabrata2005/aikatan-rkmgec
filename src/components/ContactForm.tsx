'use client';

import React, { useState } from 'react';
import Title from './Title';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formBody = new FormData();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('phone', formData.phone);
      formBody.append('subject', formData.subject);
      formBody.append('message', formData.message);

      const response = await fetch('https://formsubmit.co/ajax/techfest@rkmgec.ac.in', {
        method: 'POST',
        body: formBody,
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Title 
          title="INITIALIZE CONTACT" 
          className="from-accent via-highlight to-primary mb-6"
        />
        <p className="text-center font-kodeMono tracking-widest text-muted-foreground text-sm uppercase mb-16">
          TRANSMIT YOUR INQUIRIES TO THE CORE MAINFRAME
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 mb-16">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-orbitron font-bold text-highlight tracking-widest mb-8 border-b border-accent/20 pb-4 inline-block">SYSTEM DIRECTORY</h3>

            {/* Email */}
            <div className="group p-6 rounded-[20px] border border-accent/10 bg-secondary-bg/20 backdrop-blur-md hover:border-primary/40 hover:bg-secondary-bg/40 hover:shadow-[0_10px_30px_rgba(184,92,56,0.15)] transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <div className="flex items-start gap-5 relative z-10">
                <div className="p-3.5 rounded-xl bg-background border border-accent/10 text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(184,92,56,0.3)] transition-all duration-300">
                  <Mail size={22} />
                </div>
                <div className="flex flex-col justify-center pt-1">
                  <h4 className="text-accent/60 font-kodeMono text-[10px] tracking-[0.2em] mb-1 uppercase">Comm_Link</h4>
                  <a href="mailto:techfest@rkmgec.ac.in" className="text-foreground font-inter hover:text-highlight transition-colors text-sm sm:text-base tracking-wide">
                    techfest@rkmgec.ac.in
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group p-6 rounded-[20px] border border-accent/10 bg-secondary-bg/20 backdrop-blur-md hover:border-primary/40 hover:bg-secondary-bg/40 hover:shadow-[0_10px_30px_rgba(184,92,56,0.15)] transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <div className="flex items-start gap-5 relative z-10">
                <div className="p-3.5 rounded-xl bg-background border border-accent/10 text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(184,92,56,0.3)] transition-all duration-300">
                  <Phone size={22} />
                </div>
                <div className="flex flex-col justify-center pt-1">
                  <h4 className="text-accent/60 font-kodeMono text-[10px] tracking-[0.2em] mb-1 uppercase">Voice_Channel</h4>
                  <a href="tel:+919876543210" className="text-foreground font-inter hover:text-highlight transition-colors text-sm sm:text-base tracking-wide">
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="group p-6 rounded-[20px] border border-accent/10 bg-secondary-bg/20 backdrop-blur-md hover:border-primary/40 hover:bg-secondary-bg/40 hover:shadow-[0_10px_30px_rgba(184,92,56,0.15)] transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <div className="flex items-start gap-5 relative z-10">
                <div className="p-3.5 rounded-xl bg-background border border-accent/10 text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(184,92,56,0.3)] transition-all duration-300">
                  <MapPin size={22} />
                </div>
                <div className="flex flex-col justify-center pt-1">
                  <h4 className="text-accent/60 font-kodeMono text-[10px] tracking-[0.2em] mb-1 uppercase">Physical_Node</h4>
                  <p className="text-foreground font-inter text-sm sm:text-base tracking-wide leading-relaxed">
                    Ramkrishna Mahato Government Engineering College, Purulia
                  </p>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="group p-6 rounded-[20px] border border-accent/10 bg-secondary-bg/20 backdrop-blur-md hover:border-primary/40 hover:bg-secondary-bg/40 hover:shadow-[0_10px_30px_rgba(184,92,56,0.15)] transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <div className="flex items-start gap-5 relative z-10">
                <div className="p-3.5 rounded-xl bg-background border border-accent/10 text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_15px_rgba(184,92,56,0.3)] transition-all duration-300">
                  <Clock size={22} />
                </div>
                <div className="flex flex-col justify-center pt-1">
                  <h4 className="text-accent/60 font-kodeMono text-[10px] tracking-[0.2em] mb-1 uppercase">Latency</h4>
                  <p className="text-foreground font-inter text-sm sm:text-base tracking-wide">
                    Standard Response ≈ 24-48 HRS
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-[24px] border border-accent/20 bg-secondary-bg/30 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
              
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-primary/40 rounded-tl-[24px]" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-accent/40 rounded-br-[24px]" />

              <h3 className="text-xl font-orbitron font-bold text-highlight tracking-widest mb-8">DATA TRANSMISSION</h3>

              {success && (
                <div className="mb-8 p-4 rounded-lg bg-primary/10 border border-primary/50 text-highlight text-sm font-kodeMono tracking-widest uppercase text-center flex items-center justify-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Transmission Successful
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-accent/70 font-kodeMono text-[10px] tracking-[0.2em] uppercase">
                     IDENTIFIER *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter designation"
                    className="w-full px-5 py-3 rounded-xl bg-background border border-accent/20 text-foreground placeholder-muted-foreground focus:border-primary focus:bg-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-inter"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-accent/70 font-kodeMono text-[10px] tracking-[0.2em] uppercase">
                    RETURN ADDRESS *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="mail@protocol.com"
                    className="w-full px-5 py-3 rounded-xl bg-background border border-accent/20 text-foreground placeholder-muted-foreground focus:border-primary focus:bg-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-inter"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-accent/70 font-kodeMono text-[10px] tracking-[0.2em] uppercase">
                    COM FREQUENCY
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-5 py-3 rounded-xl bg-background border border-accent/20 text-foreground placeholder-muted-foreground focus:border-primary focus:bg-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-inter"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-accent/70 font-kodeMono text-[10px] tracking-[0.2em] uppercase">
                    TRANSMISSION TYPE *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    aria-label="Subject"
                    title="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="contact-form-select w-full px-5 py-3 rounded-xl bg-background border border-accent/20 text-foreground focus:border-primary focus:bg-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-inter appearance-none"
                  >
                    <option value="" disabled>Select Protocol...</option>
                    <option value="Registration">Event Registration</option>
                    <option value="Sponsorship">Sponsorship Matrix</option>
                    <option value="Technical">System Support</option>
                    <option value="General">General Inquiry</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 mb-8">
                <label className="block text-accent/70 font-kodeMono text-[10px] tracking-[0.2em] uppercase">
                  PAYLOAD *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Initiate message encoding..."
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl bg-background border border-accent/20 text-foreground placeholder-muted-foreground focus:border-primary focus:bg-primary/5 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-inter"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-primary/10 border border-primary text-primary font-kodeMono font-bold tracking-[0.2em] uppercase rounded-xl hover:bg-primary hover:text-background disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_0_20px_rgba(184,92,56,0.15)] hover:shadow-[0_0_30px_rgba(184,92,56,0.5)] flex items-center justify-center gap-3 group"
              >
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                {loading ? 'UPLOADING...' : 'TRANSMIT'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
