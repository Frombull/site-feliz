import { Mail, Phone, Briefcase, Code, GraduationCap, Star, User, Download, Github, ExternalLink, Award, Calendar, ArrowUpCircle, Terminal, Cpu, Zap, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Footer } from '@/components/Footer/Footer';
import { GlitchText, FloatingParticles } from '@/components/CyberEffects/CyberEffects';

const CyberIconText = ({ icon, children, className = "" }) => (
  <div className={`flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group ${className}`}>
    <div className="p-2 border border-cyan-500/30 rounded bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
      {icon}
    </div>
    <span className="cyber-text font-medium">{children}</span>
  </div>
);

const CyberSectionCard = ({ title, icon, children, id, className = "" }) => (
  <div id={id} className={`cyber-card p-6 mb-6 animate-fade-in-cyber ${className}`}>
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 border border-cyan-500 rounded-lg bg-cyan-500/10 animate-neon-pulse">
        {icon}
      </div>
      <h2 className="text-2xl font-bold cyber-title">{title}</h2>
    </div>
    <div className="space-y-6">
      {children}
    </div>
  </div>
);

const CyberProjectCard = ({ title, description, logo, githubUrl, demoUrl }) => (
  <div className="cyber-card p-4 group hover:animate-glitch">
    <div className="flex items-start gap-4">
      {logo && (
        <div className="w-16 h-16 border border-cyan-500/30 rounded-lg bg-cyan-500/5 p-2 flex items-center justify-center">
          <img src={logo} alt={`${title} logo`} className="w-full h-full object-contain" />
        </div>
      )}
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg cyber-subtitle mb-2">{title}</h3>
            <p className="cyber-text text-sm leading-relaxed">{description}</p>
          </div>
          <div className="flex gap-2 ml-4">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 border border-cyan-500/30 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all">
                <Github size={18} />
              </a>
            )}
            {demoUrl && (
              <a href={demoUrl} target="_blank" rel="noopener noreferrer"
                className="p-2 border border-cyan-500/30 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CyberExperienceCard = ({ role, company, duration, description, logo }) => (
  <div className="cyber-card p-4 group">
    <div className="flex items-start gap-4">
      {logo && (
        <div className="w-16 h-16 border border-cyan-500/30 rounded-lg bg-cyan-500/5 p-2 flex items-center justify-center">
          <img src={logo} alt={`${company} logo`} className="w-full h-full object-contain" />
        </div>
      )}
      <div className="flex-1">
        <h3 className="font-bold text-lg cyber-subtitle">{role}</h3>
        <p className="font-semibold text-cyan-300 text-base">{company}</p>
        <p className="text-sm text-cyan-400/70 mb-3">{duration}</p>
        <p className="cyber-text text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const CyberSkillBadge = ({ children, category }) => {
  const categoryClasses = {
    frontend: "cyber-badge frontend",
    backend: "cyber-badge backend",
    qa: "cyber-badge qa",
    devops: "cyber-badge devops",
    default: "cyber-badge"
  };

  const badgeClass = categoryClasses[category] || categoryClasses.default;

  return (
    <span className={`${badgeClass} cursor-pointer hover:scale-105 transition-transform`}>
      {children}
    </span>
  );
};

const CyberCertificateCard = ({ title, issuer, date, credentialId, credentialUrl }) => (
  <div className="cyber-card p-4 group">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center border border-yellow-400/50">
          <Award className="text-black" size={24} />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg cyber-subtitle">{title}</h3>
            <p className="cyber-text font-medium">{issuer}</p>
            <div className="flex items-center gap-2 mt-2">
              <Calendar size={14} className="text-cyan-400" />
              <p className="text-sm text-cyan-400/70">{date}</p>
            </div>
            {credentialId && (
              <p className="text-xs text-cyan-400/50 mt-1 font-mono">
                ID: {credentialId}
              </p>
            )}
          </div>
          {credentialUrl && (
            <a href={credentialUrl} target="_blank" rel="noopener noreferrer"
              className="p-2 border border-cyan-500/30 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-all">
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default function Home() {
  const t = useTranslations('HomePage');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen cyber-grid">
      {/* Floating Particles */}
      <FloatingParticles />

      {/* Cyber Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <main className="container mx-auto p-4 pt-24 md:pt-28 md:px-8 relative z-10">
        {/* --- Cyber Header --- */}
        <header className="text-center mb-16 animate-fade-in-cyber">
          <div className="relative inline-block mb-8">
            <div className="w-40 h-40 rounded-full mx-auto cyber-profile">
              <Image
                src="/profile_picture.png"
                alt={t('profilePictureAlt')}
                width={320}
                height={320}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            {/* Floating particles around profile */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold cyber-title mb-4">
            <GlitchText>{t('title')}</GlitchText>
          </h1>
          <p className="text-xl md:text-2xl cyber-subtitle mb-8">
            <GlitchText className="cyber-hover">{t('subtitle')}</GlitchText>
          </p>

          <div className="flex justify-center items-center flex-wrap gap-6 mb-12">
            <CyberIconText icon={<Mail size={20} />}>
              marco.renzo@ges.inatel.br
            </CyberIconText>
            <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer">
              <CyberIconText icon={<ExternalLink size={20} />}>
                linkedin.com/in/marcoditoro
              </CyberIconText>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Main Content --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* --- About Me --- */}
            <CyberSectionCard
              title={t('aboutMe')}
              icon={<User className="text-cyan-400" size={24} />}
              id="about"
              className="animate-slide-in-left"
            >
              <div className="space-y-4">
                <p className="cyber-text text-lg leading-relaxed">
                  {t('aboutMeP1')}
                </p>
                <p className="cyber-text text-lg leading-relaxed">
                  {t('aboutMeP2')}
                </p>
              </div>
            </CyberSectionCard>

            {/* --- Experience --- */}
            <CyberSectionCard
              title={t('professionalExperience')}
              icon={<Briefcase className="text-cyan-400" size={24} />}
              id="experience"
              className="animate-slide-in-left"
            >
              <CyberExperienceCard
                role={t('experience1.role')}
                company={t('experience1.company')}
                duration={t('experience1.duration')}
                description={t('experience1.description')}
                logo="/logos/VBL_LOGO_2.png"
              />
              <CyberExperienceCard
                role={t('experience2.role')}
                company={t('experience2.company')}
                duration={t('experience2.duration')}
                description={t('experience2.description')}
                logo="/logos/WG_LOGO.jpg"
              />
            </CyberSectionCard>

            {/* --- Projects --- */}
            <CyberSectionCard
              title={t('projects')}
              icon={<Code className="text-cyan-400" size={24} />}
              id="projects"
              className="animate-slide-in-left"
            >
              <CyberProjectCard
                title={t('project1.title')}
                description={t('project1.description')}
                logo="/logos/INATEL_LOGO.png"
                githubUrl="https://github.com/Frombull"
                demoUrl="https://pixelforge.com"
              />
              <CyberProjectCard
                title={t('project2.title')}
                description={t('project2.description')}
                logo="/logos/ETE_LOGO.jpg"
                githubUrl="https://github.com/Frombull"
                demoUrl=""
              />
              <CyberProjectCard
                title={t('project3.title')}
                description={t('project3.description')}
                logo="/logos/ETE_LOGO.jpg"
                githubUrl="https://github.com/Frombull"
                demoUrl=""
              />
              <CyberProjectCard
                title={t('project4.title')}
                description={t('project4.description')}
                logo="/logos/ETE_LOGO.jpg"
                githubUrl="https://github.com/Frombull"
                demoUrl=""
              />
            </CyberSectionCard>
          </div>

          {/* --- Sidebar --- */}
          <div className="space-y-8">
            {/* --- Skills --- */}
            <CyberSectionCard
              title={t('interestsAndSkills')}
              icon={<Star className="text-cyan-400" size={24} />}
              id="skills"
              className="animate-slide-in-right"
            >
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold cyber-subtitle mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
                    {t('skills.frontend')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <CyberSkillBadge category="frontend">React</CyberSkillBadge>
                    <CyberSkillBadge category="frontend">Next.js</CyberSkillBadge>
                    <CyberSkillBadge category="frontend">Tailwind CSS</CyberSkillBadge>
                    <CyberSkillBadge category="frontend">Blazor</CyberSkillBadge>
                    <CyberSkillBadge category="frontend">JavaScript</CyberSkillBadge>
                    <CyberSkillBadge category="frontend">TypeScript</CyberSkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold cyber-subtitle mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    {t('skills.backend')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <CyberSkillBadge category="backend">C#</CyberSkillBadge>
                    <CyberSkillBadge category="backend">Python</CyberSkillBadge>
                    <CyberSkillBadge category="backend">Node.js</CyberSkillBadge>
                    <CyberSkillBadge category="backend">SQL Server</CyberSkillBadge>
                    <CyberSkillBadge category="backend">ABP Framework</CyberSkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold cyber-subtitle mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
                    {t('skills.qaAndTesting')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <CyberSkillBadge category="qa">Cypress</CyberSkillBadge>
                    <CyberSkillBadge category="qa">Postman</CyberSkillBadge>
                    <CyberSkillBadge category="qa">Selenium</CyberSkillBadge>
                    <CyberSkillBadge category="qa">{t('skills.unitTesting')}</CyberSkillBadge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold cyber-subtitle mb-3 flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    {t('skills.devopsAndCloud')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <CyberSkillBadge category="devops">Docker</CyberSkillBadge>
                    <CyberSkillBadge category="devops">AWS</CyberSkillBadge>
                    <CyberSkillBadge category="devops">Kubernetes</CyberSkillBadge>
                    <CyberSkillBadge category="devops">Jenkins</CyberSkillBadge>
                    <CyberSkillBadge category="devops">Git</CyberSkillBadge>
                  </div>
                </div>
              </div>
            </CyberSectionCard>

            {/* --- Education --- */}
            <CyberSectionCard
              title={t('education')}
              icon={<GraduationCap className="text-cyan-400" size={24} />}
              id="education"
              className="animate-slide-in-right"
            >
              <div className="space-y-4">
                <div className="cyber-card p-4">
                  <h3 className="font-bold text-lg cyber-subtitle">{t('education1.degree')}</h3>
                  <p className="cyber-text">{t('education1.institution')}</p>
                  <p className="text-sm text-cyan-400/70">{t('education1.period')}</p>
                </div>
                <div className="cyber-card p-4">
                  <h3 className="font-bold text-lg cyber-subtitle">{t('education2.degree')}</h3>
                  <p className="cyber-text">{t('education2.institution')}</p>
                  <p className="text-sm text-cyan-400/70">{t('education2.period')}</p>
                </div>
              </div>
            </CyberSectionCard>

            {/* --- LinkedIn QR --- */}
            <CyberSectionCard
              title={t('linkedin')}
              icon={<ExternalLink className="text-cyan-400" size={24} />}
              id="linkedin"
              className="animate-slide-in-right"
            >
              <div className="flex justify-center p-4">
                <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" title={t('linkedinQRCodeTitle')}>
                  <div className="p-4 border border-cyan-500/30 rounded-lg bg-cyan-500/5 hover:bg-cyan-500/10 transition-all">
                    <img
                      src="/qr-code-linkedin.svg"
                      alt={t('linkedinQRCodeAlt')}
                      className="rounded-lg w-36 h-36 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </a>
              </div>
            </CyberSectionCard>

            {/* --- Download CV --- */}
            <div className="cyber-card p-6 animate-slide-in-right">
              <h4 className="font-semibold cyber-subtitle mb-4 flex items-center gap-3">
                <Shield className="text-cyan-400" size={20} />
                {t('contactSection.downloadTitle')}
              </h4>
              <p className="cyber-text text-sm mb-6 leading-relaxed">
                {t('contactSection.downloadDescription')}
              </p>
              <a href="/CV_Marco_Di_Toro.pdf" download="CV_Marco_Di_Toro.pdf" className="w-full">
                <button className="cyber-button w-full flex items-center justify-center gap-3">
                  <Download size={20} />
                  {t('contactSection.downloadButton')}
                </button>
              </a>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
