module.exports = {
  display: {
    notifications: true,
    offendingContent: true,
    rulesSummary: false,
    shortStats: true,
    verbose: false,
  },
  rules: [
    {
      message: 'You’ve got conflict markers laying around',
      regex: /^[<>|=]{4,}/m,
    },
    {
      message: 'Looks like you still have some work to do?',
      nonBlocking: true,
      regex: /(?:FIXME|TODO)/,
    },
    {
      message: '🤔 Hu.  There are "console.log(…)" call in there.',
      regex: /^\s*console\.log/,
    },
  ],
};
