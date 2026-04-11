import FAQSection from '@/components/home/FAQSection'
import GalllerySection from '@/components/home/GalllerySection'
import LandingSection from '@/components/home/LandingSection'
import SponsorSection from '@/components/home/SponsorSection'
import TimelineSection from '@/components/home/TimelineSection'
import TshirtSection from '@/components/home/TshirtSection'

const Home = () => {
  return (
    <div className="relative">
      <LandingSection />
      <TimelineSection />
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 my-10">
        <div className="rounded-3xl border border-accent/20 bg-secondary-bg/30 backdrop-blur-md p-10 md:p-16 text-center">
          <p className="text-accent/70 text-xs md:text-sm tracking-[0.25em] uppercase mb-4">Events</p>
          <h2 className="text-3xl md:text-5xl font-bold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-fest-gold to-fest-saffron">
            Coming Soon
          </h2>
          <p className="mt-4 text-muted-foreground font-outfit tracking-wide">
            New event details will be revealed shortly.
          </p>
        </div>
      </section>
      <TshirtSection />
      <GalllerySection />
      <FAQSection />
      <SponsorSection />
    </div>
  )
}

export default Home