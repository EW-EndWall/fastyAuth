const deepMerge = (target, source) => {
  for (const key of Object.keys(source)) {
    // * If the value in the source is an object and there is an object under the same key in the target
    if (
      typeof source[key] === "object" &&
      source[key] !== "" &&
      !Array.isArray(source[key])
    ) {
      // * Perform deep merge while preserving existing object in target
      if (!target[key]) target[key] = {};

      deepMerge(target[key], source[key]);
    } else if (source[key] !== undefined) {
      // * For other cases that are not undefined, assign the value directly.
      target[key] = source[key];
    }
  }
};

// * create verify code
const verificationCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export { deepMerge, verificationCode };
