const stage = process.env.stage;

const stageConfigs = {
  dev: {
    stripeKeyName: "stripeSecretKey-dev",
  },
  prod: {
    stripeKeyName: "stripeSecretKey-prod",
  },
};

const config = stageConfigs[stage] || stageConfigs.dev;

export default { stage, ...config };
