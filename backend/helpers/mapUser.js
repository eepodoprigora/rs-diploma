module.exports = function (user) {
  return {
    id: user.id,
    email: user.email,
    login: user.login,
    roleId: user.role,
    registeredAt: user.createdAt,
  };
};
