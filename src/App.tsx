import { useState } from 'react'
import { Play, Star, Calendar, CheckCircle, ArrowRight, Users, TrendingUp, Award, X } from 'lucide-react'
import { InlineWidget } from 'react-calendly'

function App() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)

  const clientLogos = [
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "IBM", logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
    { name: "Oracle", logo: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
    { name: "SAP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" },
    { name: "Accenture", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" }
  ]

  const testimonials = [
    {
      name: "Carlos Mendoza",
      position: "CEO, TechCorp LATAM",
      company: "TechCorp",
      content: "Working with Roberto transformed our entire business strategy. His 30+ years of experience in LATAM markets was invaluable. We increased revenue by 340% in just 18 months.",
      rating: 5,
      image: "https://ugc.same-assets.com/vwE0JPIkjudQ16Tov2D438ljNR4q4NEi.jpeg"
    },
    {
      name: "Maria Santos",
      position: "VP Operations, Global Industries",
      company: "Global Industries",
      content: "Roberto's coaching methodology is unparalleled. He helped us navigate complex LATAM regulations and cultural nuances that saved us millions in potential mistakes.",
      rating: 5,
      image: "https://ugc.same-assets.com/f3pHuCA9P_uxyH76bWAwC-JyaMa3auI5.jpeg"
    },
    {
      name: "Diego Rodriguez",
      position: "Founder, InnovateNow",
      company: "InnovateNow",
      content: "The strategic insights Roberto provided were game-changing. His deep understanding of Latin American markets helped us expand to 12 countries successfully.",
      rating: 5,
      image: "https://ugc.same-assets.com/g0STpEGQPKoI8eJPnqfERoupFEldZMcU.jpeg"
    }
  ]

  const stats = [
    { number: "500+", label: "Companies Transformed" },
    { number: "30+", label: "Years of Experience" },
    { number: "20", label: "Countries in LATAM" },
    { number: "95%", label: "Client Success Rate" }
  ]

  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-amber-400" />,
      title: "Revenue Growth",
      description: "Average 250% revenue increase within 24 months of implementation"
    },
    {
      icon: <Users className="h-8 w-8 text-amber-400" />,
      title: "Market Expansion",
      description: "Successfully enter and dominate new LATAM markets with proven strategies"
    },
    {
      icon: <Award className="h-8 w-8 text-amber-400" />,
      title: "Competitive Advantage",
      description: "Gain insider knowledge of cultural nuances and regulatory landscapes"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-green-900">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transform Your B2B Business in
              <span className="text-amber-400"> LATAM Markets</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover the proven strategies that helped 500+ companies achieve explosive growth
              across Latin America with 30+ years of insider expertise
            </p>

            {/* Video Player */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  {!isVideoPlaying ? (
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="group flex flex-col items-center space-y-4 p-8"
                    >
                      <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center group-hover:bg-amber-300 transition-colors">
                        <Play className="h-8 w-8 text-gray-900 ml-1" />
                      </div>
                      <span className="text-lg font-semibold">Watch the Exclusive Training</span>
                      <span className="text-sm text-gray-400">21 minutes • Free</span>
                    </button>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-lg mb-4">Video would play here</p>
                      <p className="text-sm text-gray-400">
                        "The 3 Hidden Strategies That Generated $500M+ in LATAM Revenue"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main CTA */}
            <button
              onClick={() => setShowCalendly(true)}
              className="bg-amber-400 hover:bg-amber-300 text-gray-900 text-xl font-bold py-4 px-8 rounded-lg transition-colors shadow-lg inline-flex items-center space-x-2"
            >
              <Calendar className="h-6 w-6" />
              <span>Book Your Strategy Session</span>
              <ArrowRight className="h-6 w-6" />
            </button>
            <p className="text-sm text-gray-400 mt-3">Limited spots available • Free consultation</p>
          </div>
        </div>
      </section>

      {/* Social Proof - Client Logos */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h3 className="text-center text-gray-400 text-lg mb-8">Trusted by Industry Leaders</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {clientLogos.map((client) => (
              <div key={client.name} className="opacity-60 hover:opacity-100 transition-opacity">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto filter brightness-0 invert"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Meet Roberto Fernández
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  The LATAM Business Transformation Expert
                </p>
                <div className="space-y-4 text-lg text-gray-300">
                  <p>
                    For over three decades, Roberto has been the secret weapon behind Latin America's
                    most successful business transformations. From small startups to Fortune 500 companies,
                    his proven methodologies have generated over $2 billion in combined revenue.
                  </p>
                  <p>
                    Born and raised in Mexico City, with extensive experience across all 20 LATAM countries,
                    Roberto understands the cultural nuances, regulatory landscapes, and market dynamics
                    that make or break businesses in this region.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Harvard Business School Alumni</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>Former McKinsey Partner</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span>LATAM Business Association Board Member</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://ugc.same-assets.com/VlpV24vOQqeBq0m2uV3wdwUL8jPfn-VF.jpeg"
                  alt="Roberto Fernández"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-amber-400 text-gray-900 p-4 rounded-lg font-bold">
                  30+ Years Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What You'll Achieve
            </h2>
            <p className="text-xl text-gray-300">
              The measurable results our clients consistently experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center p-8 bg-gray-800 rounded-lg">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real Results, Real Impact
            </h2>
            <p className="text-xl text-gray-300">
              See how we've transformed businesses across Latin America
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-amber-400">TechCorp LATAM Expansion</h3>
              <div className="space-y-4 text-gray-300">
                <p><strong>Challenge:</strong> US software company struggling to penetrate Brazilian market</p>
                <p><strong>Solution:</strong> Cultural adaptation strategy + regulatory compliance framework</p>
                <p><strong>Results:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>340% revenue increase in 18 months</li>
                  <li>Expanded to 8 additional LATAM countries</li>
                  <li>$50M+ in new contracts secured</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-amber-400">Global Industries Transformation</h3>
              <div className="space-y-4 text-gray-300">
                <p><strong>Challenge:</strong> Manufacturing company facing regulatory obstacles in Mexico</p>
                <p><strong>Solution:</strong> Government relations strategy + operational restructuring</p>
                <p><strong>Results:</strong></p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>$25M saved in regulatory penalties</li>
                  <li>200% faster market entry process</li>
                  <li>Partnership with 3 government agencies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Leaders Are Saying
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-900 p-6 rounded-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={`star-${testimonial.name}-${i}`} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.position}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Investment Options
            </h2>
            <p className="text-xl text-gray-300">
              Choose the right level of support for your LATAM expansion
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Strategy Session</h3>
              <div className="text-4xl font-bold text-amber-400 mb-6">FREE</div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li>✓ 60-minute consultation</li>
                <li>✓ Market opportunity assessment</li>
                <li>✓ Personalized roadmap</li>
                <li>✓ Risk analysis</li>
              </ul>
              <button
                onClick={() => setShowCalendly(true)}
                className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Book Now
              </button>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-8 rounded-lg text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Market Entry Program</h3>
              <div className="text-4xl font-bold text-gray-900 mb-6">$25,000</div>
              <ul className="space-y-3 text-gray-900 mb-8">
                <li>✓ Complete market entry strategy</li>
                <li>✓ 90-day implementation plan</li>
                <li>✓ Regulatory compliance guidance</li>
                <li>✓ Cultural adaptation framework</li>
                <li>✓ Monthly strategy sessions</li>
              </ul>
              <button
                onClick={() => setShowCalendly(true)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Get Started
              </button>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Full Transformation</h3>
              <div className="text-4xl font-bold text-amber-400 mb-6">$75,000</div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li>✓ Everything in Market Entry</li>
                <li>✓ 12-month intensive program</li>
                <li>✓ Weekly executive coaching</li>
                <li>✓ Team training & development</li>
                <li>✓ Government relations support</li>
                <li>✓ Guaranteed ROI framework</li>
              </ul>
              <button
                onClick={() => setShowCalendly(true)}
                className="w-full bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the exclusive group of leaders who've unlocked the LATAM market potential.
              Book your complimentary strategy session now.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => setShowCalendly(true)}
                className="bg-amber-400 hover:bg-amber-300 text-gray-900 text-2xl font-bold py-6 px-12 rounded-lg transition-colors shadow-lg inline-flex items-center space-x-3"
              >
                <Calendar className="h-8 w-8" />
                <span>Schedule Your Free Strategy Session</span>
                <ArrowRight className="h-8 w-8" />
              </button>
              <p className="text-gray-400">
                ✓ 60-minute deep-dive session<br />
                ✓ Personalized market analysis<br />
                ✓ Zero-obligation consultation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 Roberto Fernández Consulting. All rights reserved.</p>
          <p className="text-sm mt-2">Transforming businesses across Latin America for over 30 years.</p>
        </div>
      </footer>

      {/* Calendly Modal */}
      {showCalendly && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
            <button
              onClick={() => setShowCalendly(false)}
              className="absolute top-4 right-4 z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="h-[80vh]">
              <InlineWidget
                url="https://calendly.com/roberto-fernandez-consulting/strategy-session"
                styles={{ height: '100%' }}
                pageSettings={{
                  backgroundColor: 'ffffff',
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: 'f59e0b',
                  textColor: '4a5568'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
