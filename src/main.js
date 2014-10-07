/** @jsx React.DOM */
'use strict';

var React = require('react');

var App = require('./app');
var models = require('./models');

var installedModules = new models.Modules();
var searchResults = new models.SearchModules();

React.renderComponent(
    <App installedModules={installedModules} searchResults={searchResults} />,
    document.getElementById('app')
);

installedModules.fetch();
