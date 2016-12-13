class User {
  constructor(id, data) {
    this.id = id;
    this.data = data;
  }

  hasRole(role) {
    return this.data.roles.includes(role);
  }

  hasOneOfRoles(roles) {
    if (roles.length === 0) {
      return true;
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const role of roles) {
      if (this.hasRole(role)) {
        return true;
      }
    }

    return false;
  }
}

module.exports = User;
