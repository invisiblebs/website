import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function ServicesSection() {
  const services = [
    {
      title: 'Privacy-Preserving Solutions',
      subtitle: 'Zero-knowledge proofs, multi-party computation',
      description: 'Custom cryptographic solutions for private data collaboration and regulatory compliance without data exposure.',
      icon: '🔐',
      tags: ['Confidential Transactions', 'Decentralized Identity']
    },
    {
      title: 'Enterprise Blockchain Solutions',
      subtitle: 'Private networks, compliance frameworks',
      description: 'Enterprise-grade blockchain architecture with hybrid cloud integration and regulatory compliance.',
      icon: '🏢',
      tags: ['Zero-Trust Security', 'ZK', 'Sovereign Identity']
    },
    {
      title: 'Smart Contract Development',
      subtitle: 'DeFi protocols, cross-chain bridges',
      description: 'Secure protocol development with governance systems and advanced security patterns for DeFi applications.',
      icon: '⚡',
      tags: ['Stable Coins', 'Cross-Chain Solutions', 'DeFi Applications']
    },
    {
      title: 'Security & Risk Assessment',
      subtitle: 'Smart contract audits, vulnerability analysis',
      description: 'Comprehensive security assessments with penetration testing and infrastructure security reviews.',
      icon: '🛡️',
      tags: ['Protocol Security', 'Pre-launch Validation']
    },
    {
      title: 'Cyber Security',
      subtitle: 'Infrastructure protection, threat detection',
      description: 'Advanced cybersecurity solutions including network security, endpoint protection, and threat intelligence.',
      icon: '🔒',
      tags: ['Network Security', 'Threat Intelligence', 'Incident Response']
    },
    {
      title: 'Custom App Development',
      subtitle: 'Web applications, mobile solutions',
      description: 'Full-stack application development with modern frameworks and scalable architecture design.',
      icon: '📱',
      tags: ['Web Apps', 'Mobile Development', 'API Integration']
    },
    {
      title: 'AI Solutions',
      subtitle: 'Machine learning, automation',
      description: 'AI-powered solutions including machine learning models, natural language processing, and intelligent automation.',
      icon: '🤖',
      tags: ['Machine Learning', 'NLP', 'Automation']
    },
    {
      title: 'Professional Services',
      subtitle: 'Consulting, training, support',
      description: 'Expert consulting services including technical advisory, team training, and ongoing support for complex projects.',
      icon: '👥',
      tags: ['Technical Advisory', 'Training', 'Support']
    }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Core Services</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive technology solutions and consulting services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 bg-white group hover:bg-gradient-to-br hover:from-white hover:to-cyan-50">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {service.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-cyan-600 font-medium mb-3">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {service.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}