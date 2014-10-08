/** @jsx React.DOM */
/* jshint expr: true */
'use strict';
require('es5-shim');
var TU = require('react/addons').addons.TestUtils;
var Simulate = TU.Simulate;

var SearchModules = require('../src/search_modules');
var models = require('../src/models');

describe('SearchModules', function () {
    beforeEach(function () {
        this.installedModules = new models.Modules();
        this.searchResults = new models.SearchModules();
        this.subject = <SearchModules installedModules={this.installedModules}
                                      searchResults={this.searchResults} />;
        this.rendered = TU.renderIntoDocument(this.subject);
    });

    describe('initial state', function () {
        it('should have an initial state', function () {
            expect(this.rendered.state).to.deep.equal({
                modules: this.searchResults,
                searched: false,
                searching: false
            });
        });
    });

    describe('rendered css classes', function () {
        it('should have a "search" class', function () {
            expect(
                TU.findRenderedDOMComponentWithClass(
                    this.rendered,
                    'search'
                )
            ).to.exist;
        });
    });

    describe('info messages', function () {
        it('should be rendered with instructions for search', function () {
            var p = TU.findRenderedDOMComponentWithTag(this.rendered, 'p');
            expect(p.getDOMNode().textContent).to.equal(
                'Enter a term and press enter to search.'
            );
        });

        describe('when user performs search', function () {
            beforeEach(function () {
                this.server = sinon.fakeServer.create();
                this.server.respondWith(
                    'GET',
                    '/installable/api/modules/search?term=lola',
                    [200, { "Content-Type": "application/json" }, '[]']
                );
                this.input = TU.findRenderedDOMComponentWithTag(this.rendered, 'input');
                Simulate.change(this.input, { target: { value: 'lola' } });
                Simulate.keyDown(this.input, {which: 13});
            });

            afterEach(function () {
                this.server.restore();
            });

            describe('when searching', function () {
                it('should mention that it is currently searching', function () {
                    var p = TU.findRenderedDOMComponentWithTag(this.rendered, 'p');
                    expect(p.getDOMNode().textContent).to.equal('Searching... Please wait.');
                });
            });

            describe('when no plugins found', function () {
                it('should mention that no plugins were found', function () {
                    this.server.respond();
                    var p = TU.findRenderedDOMComponentWithTag(this.rendered, 'p');
                    expect(p.getDOMNode().textContent).to.equal('No plugins found.');                    
                });
            });

            describe('when some plugins are found', function () {
                beforeEach(function () {
                    this.server.respondWith(
                        'GET',
                        '/installable/api/modules/search?term=lola',
                        [200, { "Content-Type": "application/json" }, '[{"name":"lola"}, {"name":"pola"}]']
                    );
                    this.server.respond();
                });

                it('should render the plugins', function () {
                    var modules = TU.scryRenderedDOMComponentsWithClass(this.rendered, 'module');
                    expect(modules.length).to.equal(2);
                });
            });
        });

        describe('when user removes search term and presses enter', function () {
            beforeEach(function () {
                this.server = sinon.fakeServer.create();
                                this.server.respondWith(
                    'GET',
                    '/installable/api/modules/search?term=lola',
                    [200, { "Content-Type": "application/json" }, '[]']
                );
                this.input = TU.findRenderedDOMComponentWithTag(this.rendered, 'input');
                Simulate.change(this.input, { target: { value: 'lola' } });
                Simulate.keyDown(this.input, {which: 13});
                this.server.respond();
            });

            it('should return on the default state', function () {
                var p = TU.findRenderedDOMComponentWithTag(this.rendered, 'p');
                expect(p.getDOMNode().textContent).to.equal('No plugins found.');

                Simulate.change(this.input, { target: { value: '' } });
                Simulate.keyDown(this.input, {which: 13});

                p = TU.findRenderedDOMComponentWithTag(this.rendered, 'p');
                expect(p.getDOMNode().textContent).to.equal('Enter a term and press enter to search.');
            });
        });
    });

    describe('triggering search on enter keydown', function () {
        beforeEach(function () {
            this.spy = sinon.spy(this.rendered, 'setState');
            this.input = TU.findRenderedDOMComponentWithTag(this.rendered, 'input');
        });

        it('should call setState on enter keydown', function () {
            Simulate.keyDown(this.input, {which: 13});
            expect(this.spy).to.have.been.calledOnce;
        });

        it('should not call setState on other keys keydown', function () {
            Simulate.keyDown(this.input, {which: 23});
            expect(this.spy).to.have.not.been.called;
        });
    });
});