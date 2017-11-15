// we need to stub out jquery, as react-bootstrap-slider has it as an optional
// dependency, which will throw an error when it isn't found.
// see: https://github.com/seiyria/bootstrap-slider#how-do-i-exclude-the-optional-jquery-dependency-from-my-build
module.exports = null