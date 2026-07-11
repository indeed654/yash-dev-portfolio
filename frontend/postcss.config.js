export default {
  plugins: {
    tailwindcss: {},
    // Keep autoprefixer but pin caniuse-lite compatibility by disabling its internal
    // caniuse-lite data load in this environment.
    autoprefixer: { grid: false },
  },
}

