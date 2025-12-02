module.exports = function(allowedRoles: string | any[]) {
  return (req: { user: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }, next: () => any) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const roles = user.roles || (user.role ? [user.role] : []);

    if (roles.some((r: string) => allowedRoles.includes(r))) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  };
};
