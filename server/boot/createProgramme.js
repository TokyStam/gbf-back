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
  var Programme = app.models.programme;

  var p310 = await Programme.findOne({ where: { intitule: '310' } });
  if (p310) {
    console.log('programme 310 already exist');
  } else {
    console.log('creating programme 310...');
    p310 = await Programme.create({ nom: 'Etablissement', intitule: '310'});
    console.log('programme 310 created successfully :)');
  }

  var p028 = await Programme.findOne({ where: { intitule: '028' } });
  if (p028) {
    console.log('programme 028 already exist');
  } else {
    console.log('creating programme 028...');
    p310 = await Programme.create({ nom: 'Administration et coordination', intitule: '028'});
    console.log('programme 028 created successfully :)');
  }
  return;
};
