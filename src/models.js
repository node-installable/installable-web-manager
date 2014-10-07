'use strict';
var Backbone = require('backbone');

var Module = exports.Module = Backbone.Model.extend({
    idAttribute: 'name',
    defaults: {
        installed: true
    },
    url: function () {
        return '/installable/api/modules/' + this.id;
    }
});

var Modules = exports.Modules = Backbone.Collection.extend({
    model: Module,
    url: '/installable/api/modules'
});

var SearchModule = exports.SearchModule = Module.extend({
    defaults: {
        installed: false
    }
});

exports.SearchModules = Modules.extend({
    model: SearchModule,
    url: '/installable/api/modules/search'
});
