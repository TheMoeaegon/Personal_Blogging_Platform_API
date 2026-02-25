// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        environment: "node", // important for backend projects
        globals: true, // allows using describe(), it(), expect() without import
    },
});
