import EsportsEventSection from '@/components/home/EsportEventSection'
import FAQSection from '@/components/home/FAQSection'
import GalllerySection from '@/components/home/GalllerySection'
import LandingSection from '@/components/home/LandingSection'
import SponsorSection from '@/components/home/SponsorSection'
import TechlavyaEventSection from '@/components/home/TechlavyaEventSection'
import TimelineSection from '@/components/home/TimelineSection'
import TshirtSection from '@/components/home/TshirtSection'

const Home = () => {
  return (
    <div className="relative">
      <LandingSection />
      <TimelineSection />
      <TechlavyaEventSection />
      <TshirtSection />
      <GalllerySection />
      <FAQSection />
      <SponsorSection />
    </div>
  )
}

export default Home