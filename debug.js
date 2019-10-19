const negativeSum = (...args) => {
  return args.reduce((arg, total) => total - arg, 0);
};

console.log(negativeSum(1, 5, 10));
