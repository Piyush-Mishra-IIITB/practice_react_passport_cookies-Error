const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { UsersModel } = require("./model/UsersModel");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },   // tell passport to use email
    async (email, password, done) => {
      try {
        const user = await UsersModel.findOne({ email });

        if (!user) {
          return done(null, false);
        }

        if (password !== user.password) {
        throw new ExpressError(400, "Invalid credentials");
}


        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await UsersModel.findById(id);
  done(null, user);
});

module.exports = passport;
