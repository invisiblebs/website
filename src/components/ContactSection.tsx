import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function ContactSection() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    // Reset form
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const ContactForm = ({ serviceType }: { serviceType: string }) => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="message">Project Details</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder={`Tell us about your ${serviceType.toLowerCase()} requirements...`}
          className="mt-1"
          rows={4}
        />
      </div>
      <Button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600">
        Submit Request
      </Button>
    </form>
  );

  const services = [
    {
      title: 'Free Consultation',
      duration: '30 minutes',
      description: 'Discuss your project and security requirements',
      cta: 'Schedule Free Consultation',
      primary: true
    },
    {
      title: 'Security Audit',
      duration: '2-4 weeks',
      description: 'Comprehensive security assessment with vulnerability analysis',
      cta: 'Request Audit',
      primary: false
    },
    {
      title: 'Secure Development',
      duration: '8-16 weeks',
      description: 'Build secure blockchain systems and ZK implementations',
      cta: 'Start Project',
      primary: false
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Build Secure Blockchain Systems
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Proven expertise in secure development, architecture design, and security validation
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm p-8 text-center hover:bg-slate-800/70 transition-all duration-300 flex flex-col h-full">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-300 font-medium mb-4">
                  {service.duration}
                </p>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {service.description}
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className={service.primary 
                      ? "w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium" 
                      : "w-full !bg-transparent !hover:bg-transparent border-slate-600 text-slate-300 hover:text-white hover:border-slate-500"
                    }
                    variant={service.primary ? "default" : "outline"}
                  >
                    {service.cta}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{service.title}</DialogTitle>
                  </DialogHeader>
                  {showSuccessMessage ? (
                    <div className="text-center py-8">
                      <div className="text-green-600 text-6xl mb-4">✓</div>
                      <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                      <p className="text-slate-600">We will contact you soon to discuss your requirements.</p>
                      <Button 
                        onClick={() => setShowSuccessMessage(false)}
                        className="mt-4"
                        variant="outline"
                      >
                        Close
                      </Button>
                    </div>
                  ) : (
                    <ContactForm serviceType={service.title} />
                  )}
                </DialogContent>
              </Dialog>
            </Card>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="text-center mb-16">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-medium px-8 py-3"
                >
                  Schedule Free Consultation
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Free Consultation</DialogTitle>
                </DialogHeader>
                {showSuccessMessage ? (
                  <div className="text-center py-8">
                    <div className="text-green-600 text-6xl mb-4">✓</div>
                    <h3 className="text-xl font-semibold mb-2">Thank you!</h3>
                    <p className="text-slate-600">We will contact you soon to discuss your requirements.</p>
                    <Button 
                      onClick={() => setShowSuccessMessage(false)}
                      className="mt-4"
                      variant="outline"
                    >
                      Close
                    </Button>
                  </div>
                ) : (
                  <ContactForm serviceType="Free Consultation" />
                )}
              </DialogContent>
            </Dialog>
          
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center border-t border-slate-700 pt-12">
          <div className="mb-6">
            <p className="text-slate-300 mb-2">
              <strong className="text-white">Contact:</strong> contact@invisible-bits.com | +971 58 842 2820 | Dubai, UAE
            </p>
            <p className="text-slate-400 text-sm">
              Invisible Bits - FZCO | License: 57216 | FZA | Building A1, Dubai Digital Park, Dubai Silicon Oasis, UAE
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
