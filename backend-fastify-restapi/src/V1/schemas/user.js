const userSchemaDefinition = {
  userId: {
    type: String,
    unique: true,
    immutable: true,
    default: function () {
      return Math.floor(Math.random() * Math.pow(10, 15))
        .toString()
        .padStart(15, "0");
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9]+$/,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  contact: {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
      select: false,
    },
    phone: {
      type: String,
      required: false,
      unique: true,
      match: /^\d{10,15}$/,
      select: false,
    },
  },
  details: {
    firstName: {
      type: String,
      required: true,
      select: false,
    },
    lastName: {
      type: String,
      required: true,
      select: false,
    },
    birthdate: {
      type: Date,
      required: true,
      select: false,
    },
    country: {
      type: String,
      required: true,
      select: false,
    },
    language: {
      type: String,
      required: true,
      select: false,
    },
    translationLanguage: {
      type: String,
      required: true,
      select: false,
    },
  },
  status: {
    accountStatus: {
      type: String,
      enum: ["active", "passive"],
      default: "active", // * The user account is deactivated
    },
    systemStatus: {
      type: String,
      enum: ["active", "suspended", "banned", "deleted"],
      default: "active", // * Account status controlled by admin
    },
  },
  verify: {
    verificationType: {
      emailVerified: {
        type: Boolean,
        default: false,
      },
      phoneVerified: {
        type: Boolean,
        default: false,
      },
    },
    verifyCode: {
      emailCode: {
        type: Array,
        default: [
          [String, Number],
          [String, Number],
        ],
        select: false,
      },
      phoneCode: {
        type: Array,
        default: [
          [String, Number],
          [String, Number],
        ],
        select: false,
      },
    },
  },
  tokens: {
    type: Array,
    required: false,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  lastModifiedAt: [
    {
      type: Date,
    },
  ],
};
export default userSchemaDefinition;
