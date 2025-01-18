<p align="center">
  <a href="" rel="noopener">
 <img width=150px height=150px src="./public/logo.jpg" alt="Project logo"/>
 </a>
</p>

<h3 style="text-align: center;">
  <a href="https://whisper-wall-virid.vercel.app/">Whisper Wall</a>
</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## 📝 Table of Contents

- [About](#about)
- [Deployment](#deployment)
- [Getting Started & Installation](#getting_started)
- [Built Using](#built_using)

## 🧐 About <a name = "about"></a>

Whisper Wall is an anonymous messaging platform where users can send and receive messages without revealing their identity. It provides a safe and secure space for open communication, offering full anonymity to its users.

Built using modern web technologies such as Next.js, NextAuth, Mongoose, Zod, and ShadCN, Whisper Wall ensures a seamless user experience and robust security features. The platform is hosted on Vercel, providing fast and reliable access to users worldwide.

Whether you're looking to share thoughts, seek advice, or simply connect with others, Whisper Wall is designed to foster genuine conversations without the need for personal identifiers.

## 🚀 Deployment <a name = "deployment"></a>

The project is hosted on Vercel at <a href="https://whisper-wall-virid.vercel.app/">whisper-wall-virid.vercel.app</a>. You can deploy your own version by following these steps:

1. Push your code to a GitHub repository.
2. Go to Vercel and create a new project.
3. Import your GitHub repository.
4. Setup the environment variables in the 2. Vercel dashboard.
5. Deploy the project.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or higher)
- npm or yarn

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/whisper-wall.git
   ```

2. Install the dependencies

   ```bash
   npm install
   ```

   **or**

   ```bash
   yarn install
   ```

3. Create a .env file in the root directory and add the following environment variables

   ```bash
   # Connection string for your MongoDB database.
   # Replace 'your-mongodb-uri' with the URI of your MongoDB instance.
   MONGODB_URI='your-mongodb-uri'

   # A random secret string used by NextAuth.js for encrypting JWTs and securing cookies.
   # Ensure this is a strong, unique value for security.
   NEXTAUTH_SECRET='randompassword'

   # The time (in minutes) after which a verification code will expire.
   # Adjust this value based on your application's requirements.
   VERIFYCODE_EXPIRY_TIME_IN_MIN='10'

   # API key for Google Generative AI.
   # Replace 'your-api-key' with your actual Google Generative AI API key.
   # Ensure you do not expose this key publicly.
   GOOGLE_GENERATIVE_AI_API_KEY='your-api-key'

   # The base URL of your deployed application.
   # Update this to match your actual deployed domain.
   NEXT_PUBLIC_BASE_URL='https://whisper-wall-np0cftr09-vrajs-projects-ce0359d4.vercel.app'

   # Service used for sending emails (e.g., Gmail, Outlook, etc.).
   # This is typically the email provider's name.
   NEXT_PUBLIC_NODEMAILER_SERVICE='gmail'

   # Host address of the email service provider's SMTP server.
   # For Gmail, use 'smtp.gmail.com'.
   NEXT_PUBLIC_NODEMAILER_HOST='smtp.gmail.com'

   # Email address used for sending emails via Nodemailer.
   # Replace 'your-email@gmail.com' with the sender's email address.
   NEXT_PUBLIC_NODEMAILER_USER='your-email@gmail.com'

   # Password or app-specific password for the sender's email address.
   # Replace 'your-email-password' with the actual password.
   # Avoid hardcoding sensitive data in the .env file for production; consider using a secret manager.
   NEXT_PUBLIC_NODEMAILER_PASSWORD='your-email-password'
   ```

### Running the Development Server

To run the development server, use the following command:

```bash
npm run dev
```

**or**

```bash
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

### Building for Production

To build the project for production, use the following command:

```bash
npm run build
```

**or**

```bash
yarn build
```

### Running in Production Mode

After building the project, you can start the production server with:

```bash
npm start
```

**or**

```bash
yarn start
```

## ⛏️ Built Using <a name = "built_using"></a>

- [Next.js](https://nextjs.org/) - **Fullstack React Framework**
- [TypeScript](https://www.typescriptlang.org/) - **Programming Language**
- [Tailwind CSS](https://tailwindcss.com/) - **CSS Framework**
- [MongoDB](https://www.mongodb.com/) - **Database**
- [NextAuth.js](https://next-auth.js.org/) - **Authentication**
- [Google Generative AI](https://ai.google/tools/) - **AI Tool**
- [Nodemailer](https://nodemailer.com/) - **Email Sending**
