// stop access to route if user does not have a valid access token
exports.protectRoute = () => {
  return async (req, res, next) => {

    // This snippet bypasses the previous auth mechanism.
    // TODO: implement some form of authentication.
    req.payload = { sub: "johndoe" }; // set the payload to the request object
    next(); // call next to continue on to the next middleware or controller
    return;
  };
};
