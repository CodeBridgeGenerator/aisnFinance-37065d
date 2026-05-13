const { Service } = require("feathers-mongoose");
const FindService = require("../../utils/abstracts/FindService");
const MixedService = FindService(Service);

exports.SecurityProperties = class SecurityProperties extends MixedService {
  
};