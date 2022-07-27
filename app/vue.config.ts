import { defineConfig } from "@vue/cli-service";

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {proxy: 'http://localhost:8080'},
})
