const rule = {
  create(context) {
    return {
      ExportDefaultDeclaration(node) {
        console.log('JS Plugin rules running')
        context.report({ message: "Custom rules from JS Plugin", node });
      },
    };
  },
};

console.log('JS Plugin loading')

export default {
  meta: {
    name: "js-plugin",
  },
  rules: {
    "no-export-default": rule,
  }
};
