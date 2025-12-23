/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  options: {
    // Keep output stable for CI/reporting
    doNotFollow: {
      path: "node_modules",
    },
    exclude: {
      path: "(^node_modules)|(^dist)|(^reports)|(^releases)|(^public/qrcode\\.js$)",
    },
    tsPreCompilationDeps: false,
    combinedDependencies: false,
    preserveSymlinks: false,
    outputTo: "reports/arch/dependency-cruiser.json",
  },
  forbidden: [
    {
      name: "no-circular",
      severity: "warn",
      from: {},
      to: { circular: true },
    },
    {
      name: "no-orphans",
      severity: "info",
      from: { orphan: true, pathNot: ["^src/main\\.js$"] },
      to: {},
    },
  ],
};
