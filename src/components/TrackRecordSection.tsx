import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TrackRecordSection() {
  const audits = [
    { name: 'Solana', logo: '🌐' },
    { name: 'Lido', logo: '🔒' },
    { name: 'Ondo', logo: '⭕' },
    { name: 'Avalanche', logo: '🏔️' },
    { name: 'Keeper', logo: '🔑' },
    { name: '+35 more', logo: '➕' }
  ];

  const projects = [
    {
      title: 'Google Research Partnership',
      subtitle: 'Chromium Browser Security',
      description: 'Developed novel malware detection techniques without system calls. Published research protects millions of Chrome users worldwide.',
      tags: ['Published Research', 'ACSAC Conference'],
      techTags: ['C++', 'Security Research', 'Academic Publication']
    },
    {
      title: 'ZK-Rollup Blockchain',
      subtitle: 'Lead ZK Cryptography Engineer',
      description: 'Designed and implemented zero-knowledge proof system for scalable Ethereum Layer-2 with custom circuit optimization.',
      tags: ['Production System', 'zkSNARKs'],
      techTags: ['zk-SNARKs', 'zkVMs', 'Rust']
    },
    {
      title: 'SAP Cloud Security',
      subtitle: 'Head of Cloud Security',
      description: 'Led cloud-native security architecture for Fortune 500 clients. Designed zero-trust frameworks and container security.',
      tags: ['Enterprise Scale', 'Zero Incidents'],
      techTags: ['Kubernetes', 'Zero-Trust', 'Enterprise']
    },
    {
      title: 'Ginlo Secure Messenger',
      subtitle: 'Blockchain PKI Development',
      description: 'Built blockchain-based public key infrastructure with end-to-end encryption and secure key distribution for enterprise messaging.',
      tags: ['Production System', 'E2E Encryption'],
      techTags: ['Cryptography', 'PKI', 'Blockchain']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Proven Track Record</h2>
        </div>

        {/* Security Audits */}
        <Card className="p-8 mb-12 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Security Audits Conducted</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {audits.map((audit, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white px-4 py-2 rounded-full shadow-sm">
                <span className="text-xl">{audit.logo}</span>
                <span className="font-medium text-slate-700">{audit.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-slate-50 to-white group">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {project.title.split(' ')[0][0]}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="default" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.techTags.map((tech, techIndex) => (
                  <Badge key={techIndex} variant="outline" className="text-slate-500 border-slate-300">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}