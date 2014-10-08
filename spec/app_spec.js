/** @jsx React.DOM */
/* jshint expr: true */
'use strict';
require('es5-shim');
var expect = require('chai').expect;

var TU = require('react/addons').addons.TestUtils;

var App = require('../src/app');
var InstalledModules = require('../src/installed_modules');
var SearchModules = require('../src/search_modules');
var models = require('../src/models');

describe('App', function () {
    beforeEach(function () {
        this.searchResults = new models.SearchModules();
        this.installedModules = new models.Modules();
        this.subject = <App installedModules={this.installedModules} 
                            searchResults={this.searchResults} />;
        this.rendered = TU.renderIntoDocument(this.subject);
    });

    describe('rendered css classes', function () {
        it('should have a "plugin-manager" class', function () {
            expect(TU.findRenderedDOMComponentWithClass(this.rendered, 'plugin-manager')).to.exist;
        });

        it('should have a "plugin-manager__header" class', function () {
            expect(
                TU.findRenderedDOMComponentWithClass(
                    this.rendered,
                    'plugin-manager__header'
                )
            ).to.exist;
        });

        it('should have a "plugin-manager__header-title" class', function () {
            expect(
                TU.findRenderedDOMComponentWithClass(
                    this.rendered,
                    'plugin-manager__header-title'
                )
            ).to.exist;
        });
    });

    describe('InstalledModules component', function () {
        beforeEach(function () {
            this.installedModulesComp = 
                TU.findRenderedComponentWithType(this.rendered, InstalledModules);
        });

        it('should render an InstalledModules component', function () {
            expect(this.installedModulesComp).to.exist;
        });

        it('should pass a Modules collection as props', function () {
            expect(this.installedModulesComp.props.modules).to.equal(this.installedModules);
        });
    });

    describe('SearchModules component', function () {
        beforeEach(function () {
            this.searchModulesComp = 
                TU.findRenderedComponentWithType(this.rendered, SearchModules);
        });

        it('should render an SearchModules component', function () {
            expect(this.searchModulesComp).to.exist;
        });

        it('should pass a SearchModules collection as props', function () {
            expect(this.searchModulesComp.props.searchResults).to.equal(this.searchResults);
        });

        it('should pass a Modules collection as props', function () {
            expect(this.searchModulesComp.props.installedModules).to.equal(this.installedModules);
        });
    });
});