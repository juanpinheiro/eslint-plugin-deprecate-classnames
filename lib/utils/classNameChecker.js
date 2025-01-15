class ClassNameChecker {
  constructor(option) {
    this.name = option.name || null;
    this.nameRegExp = this._normalizeRegExp(option.nameRegExp);
    this.use = option.use || null;
    this.names = option.names || null;

    if (this.name && this.nameRegExp) {
      throw new Error('You should provide one of "name" or "nameRegExp" in option');
    }
  }

  _normalizeRegExp(regExp) {
    if (!regExp) return null;
    if (typeof regExp === 'string') {
      const trimmedRegExp = regExp.replace(/^\/|\/$/g, '');
      return new RegExp(trimmedRegExp);
    }
    if (regExp instanceof RegExp) return regExp;
    throw new Error(`Invalid nameRegExp: expected a string or RegExp, got ${typeof regExp}`);
  }

  check(classNames) {
    return classNames.reduce((errors, className) => {
      if (!className.trim()) return errors;

      if (this.name === className) {
        errors.push(this._createError(className));
      }

      if (this.nameRegExp && this.nameRegExp.test(className)) {
        errors.push(this._createError(className));
      }

      if (this.names && this.names.includes(className)) {
        errors.push(this._createError(className));
      }

      return errors;
    }, []);
  }

  _createError(className) {
    return {
      className,
      message: this._getErrMessage(className),
    };
  }

  _getErrMessage(deprecatedName) {
    let errorMsg = `Class name "${deprecatedName}" is deprecated.`;
    if (this.use) errorMsg += ` Use "${this.use}" instead.`;
    return errorMsg;
  }
}

module.exports = ClassNameChecker;
