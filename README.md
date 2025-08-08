
# Site Feliz :)

Meu portfólio pessoal desenvolvido com Next.js 15, com autenticação (não pergunte porquê), internacionalização e temas escuro/claro.

## Características foda ⬇️⬇️⬇️‼️

- 🌐 Internacionalização
- 🔐 Autenticação com NextAuth.js e OAuth 2.0
- 🎨 Design responsivo com Tailwind CSS
- 🌙 Modo escuro/claro
- 🔒 Sistema de perfil de usuário com recuperação de senha por email
- 🐳 Containerização com Docker 
- 🗄️ DB PostgreSQL com Prisma ORM

## Instalação

### Pré-requisitos

- Node.js 18+ instalado
- Docker e Docker Compose
- Git

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/site-feliz.git
cd site-feliz
```

### 2. Configure o banco de dados (com docker 🐋)

```bash
# Crie o arquivo .env para o Docker
cp docker/.env.template docker/.env

# Edite o arquivo docker/.env com suas configurações
# Em seguida, suba o banco de dados
docker compose -f docker/docker-compose.yml up -d
```

### 3. Configuração da aplicação

```bash
# Crie o arquivo .env principal
cp .env.template .env

# Edite o .env com base no .env.template
```

### 4. Instale as dependências

```bash
npm install
```

### 5. Configuração do banco de dados

```bash
# Execute as migrações do Prisma
npx prisma migrate dev --name init

# Gere o cliente Prisma
npx prisma generate
```

### 6. Execute o projeto

```bash
# DEV
npm run dev

# PROD
npm run build
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 🗂️ Estrutura do Projeto

```
site-feliz/
├── docker/
├── messages/
├── prisma/
├── public/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   └── api/
│   ├── components/
│   ├── i18n/
│   └── lib/
└── types/
```

## 👨‍💻 Autor (euuuu o/)

**Marco Di Toro**
- LinkedIn: [linkedin.com/in/marcoditoro](https://linkedin.com/in/marcoditoro/)

Se meu projeto te ajudou, considere dar uma estrela! ⭐
