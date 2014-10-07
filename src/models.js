'use strict';

var Backbone = require('backbone');

var Module = Backbone.Model.extend({
    idAttribute: 'name',
    defaults: {
        installed: true
    },
    url: function () {
        return '/installable/api/modules/' + this.id;
    }
});

exports.Module = Module;

var Modules = Backbone.Collection.extend({
    model: Module,
    url: '/installable/api/modules'
});


exports.Modules = Modules;

var SearchModule = Module.extend({
    defaults: {
        installed: false
    }
});

exports.SearchModules = Modules.extend({
    model: SearchModule,
    url: '/installable/api/modules/search'
});
