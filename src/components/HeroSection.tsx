import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HeroSection() {
  const stats = [
    { value: '40+', label: 'Security Audits' },
    { value: '$50B+', label: 'TVL Secured' },
    { value: '15', label: 'Years Experience' },
    { value: '10+', label: 'Research Papers' }
  ];

  const partners = [
    { name: 'Google', logo: '🔍' },
    { name: 'SAP', logo: '📊' },
    { name: 'Solana', logo: '🌐' },
    { name: 'Lido', logo: '🔒' },
    { name: 'Ondo', logo: '⭕' },
    { name: 'Zircuit', logo: '🔺' },
    { name: 'Quantstamp', logo: '🛡️' }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center mr-4 p-2">
              <img
                src="/invisible-bits.png"
                alt="Invisible Bits logo"
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Invisible Bits
            </h1>
          </div>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Secure Blockchain Development & Zero-Knowledge Systems
          </p>
          <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-8">
            We Build Secure Blockchain Systems
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-300 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Partners */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <p className="text-slate-400 mb-8">Trusted partnerships across Web3 and enterprise</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center space-x-2 text-slate-300 hover:text-cyan-400 transition-colors">
                <span className="text-2xl">{partner.logo}</span>
                <span className="font-medium">{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-slate-800/30 border-cyan-500/30 backdrop-blur-sm p-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4">
              We Build Secure Blockchain Systems
            </h2>
            <p className="text-slate-300 max-w-4xl mx-auto mb-6">
              Expert development of zero-knowledge systems, privacy-preserving protocols, and secure Web3 infrastructure. 
              Backed by 40+ successful security audits including Solana Core, Lido Finance, and Ondo Finance.
            </p>
            <p className="text-slate-300 max-w-4xl mx-auto">
              Leading blockchain security consulting with expertise in enterprise solutions, 
              custom application development, AI integration, and comprehensive professional services.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
