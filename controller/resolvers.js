const jwt = require("jsonwebtoken");
const User_ = require("../models/userSchema.js");
const { ApolloError } = require("apollo-server-express");

// signing token
const signToken = (email) => {
  return jwt.sign({ email }, process.env.key);
};

// checking cookie
const checkCookie = (token) => {
  try {
    var result = jwt.verify(token, process.env.key);
    return result;
  } catch (error) {
    return error;
  }
};

const resolvers = {
  Query: {
    getAllPost: async () => {
      return await User_.find();
    },
    getProfileData: async (_parent, { token }, _context, _info) => {
      var cookie_result = checkCookie(token);
      if (!cookie_result.email)
        return new ApolloError("unauthorized token.", "204");

      const userResult = await User_.findOne({ email: cookie_result.email });
      if (userResult.userType === "admin") {
        return await User_.find();
      } else if (userResult.userType === "user") {
        return [userResult];
      }
    },
  },
  Mutation: {
    createUser: async (parent, args, context, info) => {
      const { email, password } = args.user;
      const userfind = await User_.findOne({ email: email });
      if (!userfind) {
        const user = new User_({ email, password });
        await user.save();
        return "user created successfully!";
      } else {
        return new ApolloError("User already exist! Try another mail", "204");
      }
    },

    loginUser: async (parent, args, context, info) => {
      const { email, password } = args.user;
      const userfind = await User_.findOne({ email: email });
      if (userfind && userfind.password === password) {
        const token_ = signToken(email);
        return token_;
      } else {
        return new ApolloError("Wrong credientails!", "204");
      }
    },
  },
};

module.exports = resolvers;
