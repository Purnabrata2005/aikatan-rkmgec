'use client';

import { useState } from 'react';
import { FAQData } from '@/data/faq';
import Title from '../Title';
import {  Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>('1');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get unique categories
  const categories = ['All', ...Array.from(new Set(FAQData.map(faq => faq.category).filter(Boolean))) as string[]];

  // Filter FAQs based on selected category
  const filteredData = selectedCategory && selectedCategory !== 'All'
    ? FAQData.filter(faq => faq.category === selectedCategory)
    : FAQData;

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative w-full py-24 px-4 sm:px-6 lg:px-8">

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Title */}
        <Title 
          title="F.A.Q." 
          className="from-accent to-primary mb-16"
        />

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === 'All' ? null : category)}
              className={`px-6 py-2.5 outline-none rounded-lg text-xs font-kodeMono uppercase tracking-widest transition-all duration-300 border ${
                (category === 'All' && selectedCategory === null) ||
                selectedCategory === category
                  ? 'bg-primary/20 border-primary text-highlight shadow-[0_0_15px_rgba(184,92,56,0.3)] backdrop-blur-sm'
                  : 'bg-secondary-bg/30 border-accent/20 text-accent/70 hover:border-accent/60 hover:text-accent backdrop-blur-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQs Grid */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredData.length > 0 ? (
              filteredData.map((faq, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  key={faq.id}
                  className="group rounded-[16px] overflow-hidden transition-all duration-500 bg-secondary-bg/30 backdrop-blur-xl border border-accent/20 hover:border-primary/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-300 outline-none"
                  >
                    <div className="flex-1 pr-8">
                      <div className="flex items-center gap-3 mb-2">
                        {faq.category && (
                          <span className="text-[10px] font-kodeMono tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(184,92,56,0.1)]">
                            {faq.category}
                          </span>
                        )}
                      </div>
                      <h3 className={`text-base sm:text-lg font-spaceGrotesk tracking-wide transition-colors duration-300 ${openId === faq.id ? 'text-highlight' : 'text-foreground group-hover:text-accent'}`}>
                        {faq.question}
                      </h3>
                    </div>
                    
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${openId === faq.id ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_var(--primary)]' : 'bg-transparent border-accent/30 text-accent group-hover:border-accent group-hover:text-highlight'}`}>
                      {openId === faq.id ? (
                        <Minus size={16} />
                      ) : (
                        <Plus size={16} />
                      )}
                    </div>
                  </button>

                  {/* Answer */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-6 pb-6 pt-2 text-muted-foreground text-sm sm:text-base leading-relaxed font-inter border-t border-accent/10 mx-6">
                      <div className="pt-4">{faq.answer}</div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 border border-dashed border-accent/20 rounded-2xl bg-secondary-bg/20"
              >
                <p className="text-accent/50 font-kodeMono tracking-widest uppercase text-sm">No protocols found for this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-[24px] border border-accent/20 bg-gradient-to-br from-secondary-bg/80 to-background/90 text-center relative overflow-hidden backdrop-blur-xl">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-[50px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent/10 rounded-full blur-[50px] pointer-events-none" />

          <h4 className="text-2xl sm:text-3xl font-orbitron font-bold text-highlight tracking-widest mb-4 relative z-10">
            STILL HAVE QUESTIONS?
          </h4>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base font-inter max-w-lg mx-auto relative z-10">
            Our support matrix is online. Reach out to the core team to get your queries resolved immediately.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary/10 border border-primary text-primary font-kodeMono font-bold tracking-widest uppercase rounded-lg hover:bg-primary hover:text-background transition-all duration-500 shadow-[0_0_20px_rgba(184,92,56,0.2)] hover:shadow-[0_0_30px_rgba(184,92,56,0.5)] text-sm sm:text-base cursor-pointer relative z-10 hover-target"
          >
            Initiate Contact
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
