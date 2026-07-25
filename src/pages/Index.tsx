import Navigation from '@/components/Navigation'
import MinaleHero from '@/components/MinaleHero'
import MasonryGallery from '@/components/MasonryGallery'
import AboutBlock from '@/components/AboutBlock'
import ContactBlock from '@/components/ContactBlock'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import PageTransition from '@/components/PageTransition'
import FilmGrain from '@/components/FilmGrain'

const Index = () => {
  return (
    <PageTransition>
      <SmoothScroll>
        <FilmGrain />
        <Navigation />

        <main className="bg-background">
          <MinaleHero isReady />
          <MasonryGallery />
          <AboutBlock />
          <ContactBlock />
          <Footer />
        </main>
      </SmoothScroll>
    </PageTransition>
  )
}

export default Index
