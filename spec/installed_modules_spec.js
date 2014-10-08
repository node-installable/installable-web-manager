/** @jsx React.DOM */
/* jshint expr: true */
'use strict';
require('es5-shim');
var TU = require('react/addons').addons.TestUtils;

var InstalledModules = require('../src/installed_modules');
var models = require('../src/models');

describe('InstalledModules', function () {
    beforeEach(function () {
        this.modules = new models.Modules();
        this.subject = <InstalledModules modules={this.modules} />;
        this.rendered = TU.renderIntoDocument(this.subject);
    });

    describe('initial state', function () {
        it('should have an initial state', function () {
            expect(this.rendered.state).to.deep.equal({
                modules: this.modules,
                loaded: false
            });
        });
    });

    describe('rendered css classes', function () {
        it('should have a "installed-modules" class', function () {
            expect(
                TU.findRenderedDOMComponentWithClass(
                    this.rendered,
                    'installed-modules'
                )
            ).to.exist;
        });
    });

    describe('info messages', function () {
        it('should be rendered with a loading... message', function () {
            var p = TU.findRenderedDOMComponentWithTag(this.rendered, 'p');
            expect(p.getDOMNode().textContent).to.equal('Loading...');
        });

        describe('when the modules have been loaded', function () {
            describe('when there are no plugins installed', function () {
                beforeEach(function () {
                    this.modules.trigger('sync');
                });

                it('should mention that no plugins are installed', function () {
                    var p = TU.findRenderedDOMComponentWithTag(this.rendered, 'p');
                    expect(p.getDOMNode().textContent).to.equal('No plugins are installed');
                });
            });
        });
    });

    describe('rendering modules', function () {
        beforeEach(function () {
            this.modules.set([{name:'lola'}, {name:'pola'}]);
        });

        it('should render the modules', function () {
            expect(
                TU.scryRenderedDOMComponentsWithClass(
                    this.rendered,
                    'module'
                ).length
            ).to.equal(2);
        });
    });
});