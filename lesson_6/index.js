// Functional

function User(name) {
  this.name = name;
  this.isAdmin = false;

  this.getName = function() {
    return this.name;
  };

  this.getIsAdmin = function() {
    return this.isAdmin;
  };

  this.nameContains = function(str) {
    return this.getName().includes(str);
  };
}

function Admin(name) {
  User.apply(this, arguments);
  this.isAdmin = true;

  this.getIsAdmin = function() {
    return 'Is Admin';
  };
}

function DefaultUser(name) {
  User.apply(this, arguments);
  this.posts = [];

  const parentGetName = this.getName;

  this.getName = function() {
    const name = parentGetName.call(this);
    return name || 'UnknownUser';
  };

  this.addPost = function(title, text) {
    this.posts.push({ title, text });
  };
}

// Prototype

function UserPr(name) {
  this.name = name;
  this.isAdmin = false;
}

UserPr.prototype.getName = function() {
  return this.name;
};

UserPr.prototype.getIsAdmin = function() {
  return this.isAdmin;
};

UserPr.prototype.nameContains = function(str) {
  return this.getName().includes(str);
};

function AdminPr(name) {
  UserPr.call(this, name);
  this.isAdmin = true;
}

AdminPr.prototype = Object.create(UserPr.prototype);
AdminPr.prototype.constructor = AdminPr;

AdminPr.prototype.getIsAdmin = function() {
  return 'Is Admin';
};

function DefaultUserPr(name) {
  UserPr.call(this, name);
  this.posts = [];
}

DefaultUserPr.prototype = Object.create(UserPr.prototype);
DefaultUserPr.prototype.constructor = DefaultUserPr;

DefaultUserPr.prototype.getName = function() {
  const name = UserPr.prototype.getName.call(this);
  return name || 'UnknownUser';
};


DefaultUserPr.prototype.addPost = function(title, text) {
  this.posts.push({ title, text });
};

// Classes

class UserCl {
  constructor(name) {
    this.name = name;
    this.isAdmin = false;
  }

  getName() {
    return this.name;
  }

  getIsAdmin() {
    return this.isAdmin;
  }

  nameContains(str) {
    return this.getName().includes(str);
  }
}

class AdminCl extends UserCl {
  constructor(name) {
    super(name);
    this.isAdmin = true;
  }

  getIsAdmin() {
    return 'IS ADMIN';
  }
}

class DefaultUserCl extends UserCl {
  constructor(name) {
    super(name);
    this.posts = [];
  }

  getName() {
    const name = super.getName();
    return name || 'UnknownUser';
  }

  addPost(title, text) {
    this.posts.push({ title, text });
  }
}
