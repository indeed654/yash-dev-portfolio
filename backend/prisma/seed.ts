import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const prisma = new PrismaClient()

const main = async () => {
  const adminEmail = process.env.ADMIN_EMAIL || 'yash@example.com'
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'change_this_immediately'
  const passwordHash = await bcrypt.hash(adminPassword, 12)

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
    },
  })

  await prisma.project.createMany({
    data: [
      {
        title: 'Autonomous Multi-Agent Cyber Defense System',
        description:
          'A multi-agent cyber defense platform for real-time threat detection, CVE intelligence, anomaly detection, and automated response workflows.',
        techStack: ['Python', 'TensorFlow', 'LangChain', 'FAISS'],
        category: 'Cybersecurity',
        featured: true,
        order: 1,
      },
      {
        title: 'Smart Home Automation System',
        description:
          'An IoT automation system using connected devices, cloud sync, voice commands, and mobile controls for energy-aware home operations.',
        techStack: ['ESP32', 'Firebase', 'React Native', 'MQTT'],
        category: 'IoT',
        featured: true,
        order: 2,
      },
      {
        title: 'Decentralized Intellectual Property Registry',
        description:
          'A blockchain-backed ownership registry using smart contracts, decentralized storage, and immutable records for intellectual property assets.',
        techStack: ['Solidity', 'React', 'Web3', 'IPFS'],
        category: 'Web',
        featured: true,
        order: 3,
      },
      {
        title: 'RAG Knowledge Assistant',
        description:
          'A retrieval augmented generation assistant for structured search, document reasoning, and grounded responses across technical knowledge bases.',
        techStack: ['Python', 'LangChain', 'FAISS', 'Transformers'],
        category: 'AI',
        featured: false,
        order: 4,
      },
    ],
    skipDuplicates: true,
  })

  await prisma.skill.createMany({
    data: [
      { name: 'Python', category: 'Languages', level: 92, order: 1 },
      { name: 'Java', category: 'Languages', level: 84, order: 2 },
      { name: 'TensorFlow', category: 'AI/ML', level: 86, order: 1 },
      { name: 'PyTorch', category: 'AI/ML', level: 82, order: 2 },
      { name: 'LangChain', category: 'AI/ML', level: 88, order: 3 },
      { name: 'Kali Linux', category: 'Cybersecurity', level: 80, order: 1 },
      { name: 'OWASP', category: 'Cybersecurity', level: 78, order: 2 },
      { name: 'Arduino', category: 'IoT', level: 85, order: 1 },
      { name: 'ESP32', category: 'IoT', level: 83, order: 2 },
      { name: 'Docker', category: 'Tools', level: 82, order: 1 },
      { name: 'Kubernetes', category: 'Tools', level: 74, order: 2 },
    ],
    skipDuplicates: true,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
