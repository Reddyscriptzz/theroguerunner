
import { Shield, Lock, Eye, FileCheck, Wallet, Users } from 'lucide-react';

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: "256-bit Encryption",
      description: "All data is protected with military-grade encryption ensuring your information remains completely secure.",
      color: "text-green-400"
    },
    {
      icon: Wallet,
      title: "Secure Wallets",
      description: "Your funds are stored in secure, isolated wallets with multi-signature technology and cold storage protection.",
      color: "text-blue-400"
    },
    {
      icon: Eye,
      title: "Privacy Protection",
      description: "Your personal information is never shared with third parties. We maintain strict privacy policies.",
      color: "text-purple-400"
    },
    {
      icon: FileCheck,
      title: "Audited Code",
      description: "Our trading algorithms are regularly audited for security by certified blockchain security firms.",
      color: "text-cyan-400"
    },
    {
      icon: Shield,
      title: "Insurance Coverage",
      description: "Additional fund protection through comprehensive insurance coverage for maximum peace of mind.",
      color: "text-yellow-400"
    },
    {
      icon: Users,
      title: "Two-Factor Authentication",
      description: "Enhanced account security with 2FA, biometric authentication, and advanced login protection.",
      color: "text-red-400"
    }
  ];

  return (
    <section id="security" className="py-16 px-6 relative z-10 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-white font-orbitron">Security & Trust</h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-exo">
            Your security is our top priority. We implement industry-leading security measures to protect your assets and data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gray-800 ${feature.color} group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white font-orbitron">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-exo">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gray-900/30 border border-gray-800 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4 font-orbitron">Security Certifications</h3>
            <div className="grid md:grid-cols-3 gap-6 text-gray-400 font-exo">
              <div>
                <div className="text-cyan-400 font-semibold">SOC 2 Type II</div>
                <div className="text-sm">Compliance Certified</div>
              </div>
              <div>
                <div className="text-cyan-400 font-semibold">ISO 27001</div>
                <div className="text-sm">Security Management</div>
              </div>
              <div>
                <div className="text-cyan-400 font-semibold">PCI DSS</div>
                <div className="text-sm">Payment Security</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
