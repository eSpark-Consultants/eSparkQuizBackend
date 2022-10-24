// index.js

const { ApolloServer } = require("apollo-server-express")
const { readFileSync } = require("fs");
const path = require("path");
const { prisma } = require("./src/database");
const { application } = require("./src/schema/rootModule");
const admin = require("firebase-admin");
const { createServer } = require('http');
const express = require("express");

const app = express();
const httpServer = createServer(app);
const schema = application.createSchemaForApollo()

const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDXSvPcKIzcW6kp\\nV0KkwFDFt2fM/URCupMVobvh2bxDKS2/lbbY1q0DGdh2krkcwNUdsJ/aAZwyW1qu\\ngTqRsumC2VkIM18PL7KNW5zPz2EIxor8Jwms7KKLLYLiHSWnUlxshZxKqujpiSFw\\nsu5oQ9LinMTwhSozq0kTUVcwVhOZX2vz8E/nree3mWgyfI8bU8D9W/YkZSnP+cSP\\nt2ersVFZ0KqM6uvzyLRIrbnuqO0gwsjCUtopQDNqs4A727RT8D4dNVetfA0gGzqz\\n/oaeVque1p9ihqg5ZujNM6pkygUdPr//snuTqTSwGxIPEmX1uxjZqwQAP15leOcz\\nS02J0UKPAgMBAAECggEAQyRCagIRb/V8C4MFqyi45/hbPGAt5huWnFPsqrJDVrSk\\nak/QDs7gdQud6Ni4N0HiFNjM+WmwIzo/TRXLRL4FugN7kyWmOy+2YQRVoq97hQea\\nN6obB91ikcIXQ9owMH7siQGgLN8hNRfJoIKE/GpOfdLDTnlRIH0GFKq05MOraBR6\\nC7fTCQSWfMf7WxZCCWD7fyAYutyfmjok2KV3h2yTf3QMAJxuhFVoWw55uMj9TjaN\\nWE8TAL06iIm3DIlgOUfpD8W4X6bFDHyMjwltYU2J0z7tU5R51QBKUgVrbaF6szQM\\nYWSQKw/UPsnOFUSqq0CcnccuF9SMI+nHbX+wFAI2zQKBgQD3qhMzGmqh1+ER311/\\nTiboacRGRBKIkDE5iIL2/+JU9J57w5SKfUB53tKqZpObfGHP7UYwOrWDp8tOiVFf\\nVqwYsPAVqmjs/qeHi/A2BuPWvvEkfIY38bedbaqYbM5OTrX1LKFtNR/x92VxpSaw\\n2PlloS37ERPO6LHxiPoZCoARzQKBgQDeifUtRlAS5bHvXX2tSaIl01IMNsGJS9YB\\nxxPFkDHsxP7vizmSG7fCdvJkWAu5LKNP3D1z1+Fj3eIxgaLNpo68nutuJZSRCZo2\\n/cU5V3N+aIhaW3+fVpHTDoZHFPly+SlPbNdoRMWA/W+EdMiLEmg7oTQB3RG4k9GS\\nFCryAP65ywKBgQCG/lMcxcddlBf/7+o8m9KlWBE945jeiwnpvDj2fR9XA0bnWwG6\\nQu9D/mqBqwvF8pQ2C7T4UOfjbTBqDHsoJkwD4V3b0VkD5QJX5bT3HeZOhSFXq/BU\\nyhI1YzNbheMl181iaANNTWmuMBVBTq26M2otNR+k+/f6DegAKZN41rpb+QKBgQDU\\n8j5ibH4DFzkFS/kO8P7wIx7IAT2BG8hVOyJ4Ulrzri4lGpyka1GUDC42Ruow7732\\nlVFYoKNU5OWlad9X2qGLbKbsZ5makA25wWwQStaBh5WyoQumdThlNejX7AInOrWF\\nAym85NH5dIpZvUaJjbugE8moXtquPQS1PAc8PCeDsQKBgQDQd3IsqkG34J/i1RAR\\nH2zgcemAPJOHORM9SsRn8LgYBNFtuJ2mXZxFy4ygVXEQJUYQUXn0pk5AXAKz2bfu\\nW6UGJoRKImSmWP8q3KEZdJluApkPcNht22MAAocAvkplMya0KR9Pfdd8nwLpmJW/\\nzx9RcPtIZcOD9lh1fYaWppdscw==\\n-----END PRIVATE KEY-----\\n"

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "snapoffers-3c3f9",
    privateKey: PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: "firebase-adminsdk-rsqt3@snapoffers-3c3f9.iam.gserviceaccount.com",
  }),
  // databaseURL: process.env.DATABASE_URL
});


const server = new ApolloServer({
  schema,
  context: {
    prisma,
  },
  introspection: true,
  subscriptions: {
    // onConnect: () => console.log('Connected to websocket'),
  },
});


const PORT = process.env.PORT || 4000
server.applyMiddleware({ app })

server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})




//   node-prisma-apollo-backend:
//   working_dir: /Users/mudassirraza/Desktop/Projects/node-prisma-apollo-backend
//   restart: always
//   build:
//     context: .
//   volumes:
//     - .:/app:delegated
//   command: yarn dev
//   ports:
//     - 4000:4000
