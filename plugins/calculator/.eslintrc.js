module.exports = {
  extends: [require.resolve('@backstage/cli/config/eslint')],
  "overrides": [
    {
      "files": ["*.test.tsx", "*.spec.ts"],
      "rules": {
        "new-cap": "off",
        "jest/expect-expect": "off",
      }
    }
  ]
};
