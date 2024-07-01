function required({ requiredMsg = "" } = {}) {
  return {
    required: { value: true, message: requiredMsg },
  };
}

function requiredWithLength({ requiredMsg = "", minLength = 2, minMsg = "" } = {}) {
  return {
    ...required({ requiredMsg }),
    min: {
      value: minLength,
      message: minMsg,
    },
  };
}

function phoneNumber({ requiredMsg = "", emptyMsg = "", minMsg = "", maxMsg = "" } = {}) {
  return {
    ...required({ requiredMsg }),
    validate: (contact: string) => {
      let valid = false;

      if (contact.length >= 15 && contact.length <= 19) {
        valid = true;
      }

      if (!valid && contact.length < 6) {
        valid = false;
        return emptyMsg;
      }
      if (!valid && contact.length > 6 && contact.length < 15) {
        valid = false;
        return minMsg;
      }

      if (!valid && contact.length > 19) {
        valid = false;
        return maxMsg;
      }

      return valid;
    },
  };
}

function email({ required = false, requiredMsg = "", invalidMsg = "" } = {}) {
  return {
    required: { value: required, message: requiredMsg },
    validate: (email: string) => {
      const syntax = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

      if (email === "") return true;

      if (email?.match(syntax)) return true;
      else return invalidMsg;
    },
  };
}

function name({ required = false, requiredMsg = "", invalidMsg = "" } = {}) {
  return {
    required: { value: required, message: requiredMsg },
    validate: (name: string) => {
      const syntax = /^[A-Za-z'-]+(?:\s+[A-Za-z'-]+)+$/i;
      if (name === "") return true;

      if (name?.match(syntax)) return true;
      else return invalidMsg;
    },
  };
}

function password({ requiredMsg = "", minMsg = "" }) {
  return { ...required({ requiredMsg }), minLength: { value: 6, message: minMsg } };
}

const validators = {
  required,
  requiredWithLength,
  phoneNumber,
  email,
  password,
  name,
};
export default validators;
