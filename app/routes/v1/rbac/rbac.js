/**
 * Created on 1/7/16.
 * @author rankun203
 */
'use strict';

const RBAC           = require('rbac-a');
const log            = require('log4js').getLogger('rbac');
const CustomProvider = require('./provider');

var rbac = new RBAC({
  provider: new CustomProvider()
});

rbac.on('error', function (err) {
  log.error('Error while checking $s/%s', err.role, err.user);
  log.error(err.stack);
});

rbac
  .check(user, 'create')
  .then(function allow(allowed) {
    if (allowed) log.log('User can create!', allowed);
    else log.log('User cannot create.');
  })
  .catch(function err(err) {
    log.error(err && err.stack || err || 'ERROR');
  });

rbac
  .check(user, 'edit', {time: Date.now()})
  .then(function allowed(allowed) {
    if (allowed) log.log('User can edit', allowed);
    else log.log('User cannot edit');
  })
  .catch(function err(err) {
    log.error(err && err.stack || err || 'ERROR')
  });
