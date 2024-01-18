import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      bundler: "webpack",
      framework: "next",
    },
    video: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
