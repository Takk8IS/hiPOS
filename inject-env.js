import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to read environment variables from .env file
function loadEnvFile() {
    const envFilePath = join(__dirname, ".env");
    if (!existsSync(envFilePath)) {
        console.warn(
            "Arquivo .env não encontrado. Usando variáveis de ambiente do sistema.",
        );
        return process.env;
    }

    const envContent = readFileSync(envFilePath, "utf8");
    const envVars = {};

    envContent.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
            envVars[key.trim()] = value.trim();
        }
    });

    return { ...process.env, ...envVars };
}

// Function to inject environment variables into HTML
function injectEnvVars() {
    const outDirPath = join(__dirname, "out");
    if (!existsSync(outDirPath)) {
        console.error(
            'Diretório "out" não encontrado. Execute "npm run build" primeiro.',
        );
        process.exit(1);
    }

    const envVars = loadEnvFile();

    // Filter only NEXT_PUBLIC_* variables
    const publicEnvVars = Object.keys(envVars)
        .filter((key) => key.startsWith("NEXT_PUBLIC_"))
        .reduce((obj, key) => {
            obj[key] = envVars[key];
            return obj;
        }, {});

    const envScript = `
    <script>
      window.process = window.process || {};
      window.process.env = ${JSON.stringify(publicEnvVars)};
    </script>
  `;

    // Inject into all HTML files
    readdirSync(outDirPath).forEach((file) => {
        if (file.endsWith(".html")) {
            const filePath = join(outDirPath, file);
            let content = readFileSync(filePath, "utf8");

            if (!content.includes("window.process.env")) {
                content = content.replace("</head>", `${envScript}</head>`);
                writeFileSync(filePath, content);
                console.log(`Variáveis de ambiente injetadas em: ${file}`);
            }
        }
    });

    console.log("Processo de injeção de variáveis de ambiente concluído!");
}

try {
    injectEnvVars();
} catch (error) {
    console.error("Erro ao injetar variáveis de ambiente:", error);
    process.exit(1);
}
