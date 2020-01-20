// Copyright IBM Corp. 2015,2019. All Rights Reserved.
// Node module: generator-loopback
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

module.exports = async function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * https://loopback.io/doc/en/lb3/Working-with-LoopBack-objects.html
   * for more info.
   */

  if (process.env.CREATE_DEFAULT_ADMIN == 'false') {
    return;
  }
  var User = app.models.utilisateur;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  console.log('verify default admin role...')
  var adminRole = await Role.findOne({where: {name: 'admin'}});
  if (adminRole) {
    console.log('admin role aleredy exist');
  } else {
    console.log('creating admin role...');
    try {
     adminRole= await Role.create({
        name: 'admin'
      });
      console.log('admin role created successfully :)');
    } catch (error) {
      console.log(' error:(');
      console.log(error);
    }
  }
  console.log('verify default admin user...')
  let adminUser = await User.findOne({ where: { email: process.env.ADMIN_EMAIL}});
  if (adminUser) {
    console.log('admin user already exist')
  } else {
    console.log('creating default admin user...');
    try {
      adminUser = await User.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD
      });
      console.log('admin user created successfully :)');
    } catch (error) {
      console.log('error :(');
      console.log(error);
    }
  }

  // role maiping the admin user to the admin role
  if(adminRole && adminUser) {
    // verify if the user is already an admin
    var pricipals = await adminRole.principals.findOne({ where: { principalId: adminUser.id}});
    if (pricipals) {
      console.log('admin management done :)');
    } else {
      console.log('linking admin user to admin role...');
      await adminRole.principals.create({
        principalType: RoleMapping.USER,
        principalId: adminUser.id
      });
      console.log('admin management done :)');
    }
  }
  return ;
};
