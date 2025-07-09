import { Mail, Phone, Linkedin, Briefcase, Code, GraduationCap, Star, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const IconText = ({ icon, children }) => (
  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
    {icon}
    <span className="text-sm">{children}</span>
  </div>
);

const SectionCard = ({ title, icon, children }) => (
  <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <div className="p-6">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  </div>
);

const ProjectCard = ({ title, description, logo }) => (
    <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        {logo && <img src={logo} alt={`${title} logo`} className="w-14 h-14 rounded-md object-contain bg-white p-1 shadow-sm" />}
        <div>
            <h3 className="font-bold text-md text-blue-600 dark:text-blue-400">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        </div>
    </div>
);

const ExperienceCard = ({ role, company, duration, description, logo }) => (
  <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
      {logo && <img src={logo} alt={`${company} logo`} className="w-14 h-14 rounded-md object-contain bg-white p-1 shadow-sm" />}
      <div className="flex-1">
          <h3 className="font-bold text-md text-blue-600 dark:text-blue-400">{role}</h3>
          <p className="font-semibold text-gray-700 dark:text-gray-200">{company}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{duration}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{description}</p>
      </div>
  </div>
);


export default function Home() {
  const t = useTranslations('HomePage');

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans">
      <main className="container mx-auto p-4 md:p-8">
        {/* --- Cabeçalho --- */}
        <header className="text-center mb-12">
            <div className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg bg-gradient-to-tr from-blue-400 to-purple-500">
            <Image 
                src="/IMG_Marco.png" 
                alt="Foto de Perfil" 
                width={256}
                height={256}
                className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800"
            />
            </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white">
            {t('title')}
          </h1>
          <p className="text-lg text-blue-600 dark:text-blue-400 mt-2 font-medium">
          {t('subtitle')}
          </p>
          <div className="mt-6 flex justify-center items-center flex-wrap gap-x-6 gap-y-2">
            <IconText icon={<Phone size={16} />}>
              +55 (35) 99133-2571
            </IconText>
            <IconText icon={<Mail size={16} />}>
              marco.renzo@ges.inatel.br
            </IconText>
            <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
              <IconText icon={<Linkedin size={16} />}>
                linkedin.com/in/marcoditoro
              </IconText>
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- Coluna Esquerda --- */}
          <div className="lg:col-span-2 space-y-8">
            {/* --- Sobre Mim --- */}
            <SectionCard title={t('aboutMe')} icon={<User className="text-blue-500" />}>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('aboutMeP1')}
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('aboutMeP2')}
              </p>
            </SectionCard>

            {/* --- Experiência --- */}
            <SectionCard title={t('professionalExperience')} icon={<Briefcase className="text-blue-500" />}>
              <ExperienceCard
                  role="Estagiário"
                  company="Centro de Pesquisas Avançadas Wernher von Braun"
                  duration="04/2025 - Atual"
                  description="Desenvolvimento full-stack utilizando o framework ABP com C#. Responsável pela criação de componentes de front-end com Blazor e Blazorise, e pelo desenvolvimento de APIs e lógica de back-end. Utilização de SQL Server para gerenciamento de banco de dados e Postman para testes de API."
                  logo="/logos/VBL_LOGO_2.png"
                />
              <ExperienceCard
                role="Estagiário"
                company="WatchGuard Technologies"
                duration="09/2021 - 06/2022 (8 meses)"
                description="Trabalhei com microsserviços da AWS e Python, implementando soluções com Lambda, SNS, SQS, S3, Cloudfront, entre outros. Adquiri conhecimentos sobre metodologias ágeis (Scrum) enquanto participava de um time internacional. Obtive muita experiência prática, me proporcionando uma compreensão sólida do desenvolvimento de software em um ambiente profissional ágil."
                logo="/logos/WG_LOGO.jpg"
              />
            </SectionCard>

            {/* --- Projetos --- */}
            <SectionCard title={t('projects')} icon={<Code className="text-blue-500" />}>
                <ProjectCard 
                        title="FETIN 2025: Pixelforge"
                        description="Um site educacional para alunos de Álgebra Linear e Computação Gráfica visualizarem conceitos vistos em sala de aula de forma prática e interativa."
                        logo="/logos/INATEL_LOGO.png"
                    />
                <ProjectCard 
                    title="PROJETE VRTL 2020: Quality control with machine learning"
                    description="Responsável pelo projeto do 3.º ano técnico. Desenvolvido para linha de produção, com capacidade de identificar, separar e catalogar produtos em tempo real, utilizando uma rede neural treinada."
                    logo="/logos/ETE_LOGO.jpg"
                />
                <ProjectCard 
                    title="PROJETE 2019: Baropodômetro"
                    description="Projeto do 2.º ano técnico. Foi confeccionado um tapete capaz de identificar qual o tipo de pisada do usuário e de sugerir uma possível correção para a mesma."
                    logo="/logos/ETE_LOGO.jpg"
                />
                <ProjectCard 
                    title="PROJETE 2018: Portão automático com wi-fi"
                    description="Projeto do 1.º ano técnico. Portão de garagem, capaz de abrir e fechar automaticamente ao detectar a presença do usuário em sua rede wi-fi local."
                    logo="/logos/ETE_LOGO.jpg"
                />
            </SectionCard>
          </div>

          {/* --- Coluna Direita --- */}
          <div className="space-y-8">
            {/* --- Interesses / Skills --- */}
            <SectionCard title={t('interestsAndSkills')} icon={<Star className="text-blue-500" />}>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Frontend</span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">React</span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Next.js</span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Tailwind CSS</span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Blazor</span> {/* Você mencionou na sua experiência */}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Backend</span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">C#</span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Python</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">QA</span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Cypress</span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Postman</span>
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Selenium</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">DevOps</span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Docker</span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">AWS</span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Kubernetes</span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Jenkins</span>
                </div>
            </SectionCard>

            {/* --- Educação --- */}
            <SectionCard title={t('education')} icon={<GraduationCap className="text-blue-500" />}>
              <div>
                <h3 className="font-bold text-md text-gray-800 dark:text-white">Engenharia de Software</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Instituto Nacional de Telecomunicações - Inatel</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">01/2021 – Atual</p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
              <div>
                <h3 className="font-bold text-md text-gray-800 dark:text-white">Técnico em Telecomunicações</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Escola Técnica de Eletrônica Francisco Moreira da Costa</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">01/2018 - 12/2020</p>
              </div>
            </SectionCard>

            {/* --- QR Code --- */}
                <SectionCard title="LinkedIn" icon={<Linkedin className="text-blue-500" />}>
                <div className="flex justify-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <a href="https://linkedin.com/in/marcoditoro" target="_blank" rel="noopener noreferrer" title="Visitar LinkedIn de Marco Di Toro">
                        <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://linkedin.com/in/marcoditoro" 
                            alt="QR Code para o LinkedIn de Marco Di Toro"
                            className="rounded-lg shadow-md w-36 h-36"
                        />
                    </a>
                </div>
            </SectionCard>
          </div>
        </div>
        
        <footer className="text-center mt-12 py-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                {t('footer')}
            </p>
        </footer>
      </main>
    </div>
  );
}
