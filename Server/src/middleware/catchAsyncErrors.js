// Catch Async Errors Here Comment every line with his uses
export const asyncErrorWrapper = (passedFunction) => (req, res, next) => {
  Promise.resolve(passedFunction(req, res, next)).catch(next);
};
