import fs from "fs";
import { marked } from "marked";

// * import Routes
import authRoutes from "./auth.js";
import accountRoutes from "./account.js";

// * lacales dependence
import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import Backend from "i18next-fs-backend";
import path from "path";
import { fileURLToPath } from "url";
// * Creating __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// * lacales path
const localesPath = path.join(__dirname, "..", "locales");

const documentation = path.join(
  __dirname + "/../../routes/documentation/v1-Documentation.md"
);

// * i18next config
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      fallbackLng: "en",
      preload: ["en", "tr"],
      ns: ["translation"],
      defaultNS: "translation",
      backend: {
        loadPath: path.join(localesPath, "/{{lng}}/{{ns}}.json"),
      },
    },
    (err, t) => {
      if (err) console.error("i18next init error:", err);
    }
  );

const registerRoutesV1 = async (fastify, options) => {
  // * add config
  fastify.register(i18nextMiddleware.plugin, { i18next });
  // * add Routes
  fastify.register(authRoutes, { prefix: "/auth" });
  fastify.register(accountRoutes, { prefix: "/account" });
  fastify.get("/documentation", (request, reply) => {
    fs.readFile(documentation, "utf-8", (err, data) => {
      if (err) return reply.code(500).send({ error: ["Server error."] });
      reply.type("text/html").send(`
        <title>Rest-API v1 Documentation</title>
        <style>
        body{margin:2rem;color: #c5c5c5;background: #2e2d2d;}
        h1,h2,h3,h4,h5{color: #ffffff;}
        pre{color:#858585;background:#000000;padding:0.5rem;}
        </style>
        <body>${marked(data)}</body>
      `);
    });
  });
};

export default registerRoutesV1;
