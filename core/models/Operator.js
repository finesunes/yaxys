const config = require("config")

module.exports = {
  schema: {
    properties: {
      id: {
        type: "integer",
      },
      email: {
        title: "E-mail",
        type: "string",
        format: "email",
      },
      passwordHash: {
        title: "Password",
        type: "string",
        password: true,
      },
    },
    required: ["email", "passwordHash"],
  },

  api: {
    "operator/:id": [
      PolicyService.removePasswordsFromResponse("operator"),
      RestService.findOne("operator"),
    ],
    "operator": [
      PolicyService.removePasswordsFromResponse("operator"),
      RestService.find("operator"),
    ],
    "put operator/:id": [
      PolicyService.encodePasswords("operator"),
      PolicyService.removePasswordsFromResponse("operator"),
      RestService.update("operator"),
    ],
    "post operator": [
      config.get("debug.pauseAndRandomError")
        ? PolicyService.pauseAndRandomError
        : true,
      PolicyService.encodePasswords("operator"),
      PolicyService.removePasswordsFromResponse("operator"),
      RestService.create("operator"),
    ],
  },
}
