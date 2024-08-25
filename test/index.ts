import fs from "fs";
import path from "path";

async function main() {
    const files = fs.readdirSync(path.join(__dirname, "./"));

    for await (const filename of files) {
        if (filename.endsWith(".js")) {
            const filePath = path.join(__dirname, filename);
            await import(filePath);
        }
    }
}

main().catch(console.error);
