/** @jsx React.DOM */
/* jshint expr: true */
'use strict';
require('es5-shim');
var TU = require('react/addons').addons.TestUtils;
var Simulate = TU.Simulate;

var Module = require('../src/module');
var models = require('../src/models');

describe('Module', function () {
    beforeEach(function () {
        this.module = new models.Module({name: 'lola'});
        this.installedModules = new models.Modules();
        this.subject = <Module module={this.module} 
                               installedModules={this.installedModules}/>;
        this.rendered = TU.renderIntoDocument(this.subject);
    });

    describe('initial state', function () {
        it('should have an initial state', function () {
            expect(this.rendered.state).to.deep.equal({
                active: false
            });
        });
    });

    describe('rendered css classes', function () {
        it('should have a "module" class', function () {
            expect(
                TU.findRenderedDOMComponentWithClass(
                    this.rendered,
                    'module'
                )
            ).to.exist;
        });

        it('should have a "module__name" class', function () {
            expect(
                TU.findRenderedDOMComponentWithClass(
                    this.rendered,
                    'module__name'
                )
            ).to.exist;
        });

        it('should have a "ladda-button" class', function () {
            expect(
                TU.findRenderedDOMComponentWithClass(
                    this.rendered,
                    'ladda-button'
                )
            ).to.exist;
        });

        it('should have a "ladda-label" class', function () {
            expect(
                TU.findRenderedDOMComponentWithClass(
                    this.rendered,
                    'ladda-label'
                )
            ).to.exist;
        });
    });

    describe('button text', function () {
        describe('when a module is installed', function () {
            it('should have a button with text: "Uninstall"', function () {
                expect(
                    TU.findRenderedDOMComponentWithClass(
                        this.rendered,
                        'ladda-label'
                    ).getDOMNode().textContent
                ).to.equal('Uninstall');
            });
        });

        describe('when a module is installed from search results', function () {
            beforeEach(function () {
                this.module.set('installed', false);
                this.installedModules.set([{name: 'lola'}]);
                this.rendered.forceUpdate();
            });

            it('should have a button with text: "Uninstall"', function () {
                expect(
                    TU.findRenderedDOMComponentWithClass(
                        this.rendered,
                        'ladda-label'
                    ).getDOMNode().textContent
                ).to.equal('Uninstall');
            });
        });

        describe('when a module is not installed', function () {
            beforeEach(function () {
                this.module.set('installed', false);
                this.rendered.forceUpdate();
            });

            it('should have a button with text: "Install"', function () {
                expect(
                    TU.findRenderedDOMComponentWithClass(
                        this.rendered,
                        'ladda-label'
                    ).getDOMNode().textContent
                ).to.equal('Install');
            });
        });
    });
    
    describe('server interaction', function () {
        beforeEach(function () {
            this.server = sinon.fakeServer.create();
        });

        afterEach(function () {
            this.server.restore();
        });

        describe('#onClickInstall', function () {
            beforeEach(function () {
                this.module.set('installed', false);
                this.rendered.forceUpdate();
                this.server.respondWith(
                    'PUT',
                    this.module.url(),
                    [200, { "Content-Type": "application/json" }, '{ "ok": "true" }']
                );

                var button = TU.findRenderedDOMComponentWithTag(
                    this.rendered,
                    'button'
                );

                Simulate.click(button);
                this.server.respond();
            });

            it('should change button text to uninstall', function () {
                expect(
                    TU.findRenderedDOMComponentWithClass(
                        this.rendered,
                        'ladda-label'
                    ).getDOMNode().textContent
                ).to.equal('Uninstall');
            });

            it('should add it to installedModules', function () {
                expect(this.installedModules.length).to.equal(1);
            });
        });
        
        describe('#onClickUninstall', function () {
            beforeEach(function () {
                this.module.set('installed', true);
                this.installedModules.add(this.module);
                this.rendered.forceUpdate();
                this.server.respondWith(
                    'DELETE',
                    this.module.url(),
                    [200, { "Content-Type": "application/json" }, '{ "ok": "true" }']
                );

                var button = TU.findRenderedDOMComponentWithTag(
                    this.rendered,
                    'button'
                );

                Simulate.click(button);
                this.server.respond();
            });

            it('should change button text to install', function () {
                expect(
                    TU.findRenderedDOMComponentWithClass(
                        this.rendered,
                        'ladda-label'
                    ).getDOMNode().textContent
                ).to.equal('Install');
            });

            it('should remove it from installedModules', function () {
                expect(this.installedModules.length).to.equal(0);
            });
        });
    });
});