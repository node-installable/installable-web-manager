'use strict';
var Backbone = require('backbone');
var models = require('../src/models');
var expect = require('chai').expect;

describe('models', function () {
    describe('Module', function () {
        it('should define a Module Model', function () {
            expect(models).to.have.property('Module');
        });

        describe('an instance', function () {
            beforeEach(function () {
                this.subject = new models.Module({name: 'lola'});
            });

            it('should be a Backbone.Model', function () {
                expect(this.subject).to.be.instanceOf(Backbone.Model);
            });

            it('should use name as ID', function () {
                expect(this.subject.id).to.equal('lola');
            });

            it('should have default value for installed', function () {
                expect(this.subject.get('installed')).to.equal(true);
            });

            it('should have an URL', function () {
                expect(this.subject.url()).to.equal('/installable/api/modules/lola');
            });
        });
    });

    describe('Modules', function () {
        it('should define a Modules Collection', function () {
            expect(models).to.have.property('Modules');
        });

        describe('an instance', function () {
            beforeEach(function () {
                this.subject = new models.Modules();
            });

            it('should be a Backbone.Collection', function () {
                expect(this.subject).to.be.instanceOf(Backbone.Collection);
            });

            it('should have Module for Model', function () {
                expect(this.subject.model).to.equal(models.Module);
            });

            it('should have an URL', function () {
                expect(this.subject.url).to.equal('/installable/api/modules');
            });
        });
    });

    describe('SearchModule', function () {
        it('should define a SearchModule Model', function () {
            expect(models).to.have.property('SearchModule');
        });

        describe('an instance', function () {
            beforeEach(function () {
                this.subject = new models.SearchModule();
            });

            it('should be a Module', function () {
                expect(this.subject).to.be.instanceOf(models.Module);
            });

            it('should have default value for installed', function () {
                expect(this.subject.get('installed')).to.equal(false);
            });
        });
    });

    describe('SearchModules', function () {
        it('should define a SearchModules Collection', function () {
            expect(models).to.have.property('SearchModules');
        });

        describe('an instance', function () {
            beforeEach(function () {
                this.subject = new models.SearchModules();
            });

            it('should be a Backbone.Collection', function () {
                expect(this.subject).to.be.instanceOf(Backbone.Collection);
            });

            it('should have SearchModule for Model', function () {
                expect(this.subject.model).to.equal(models.SearchModule);
            });

            it('should have an URL', function () {
                expect(this.subject.url).to.equal('/installable/api/modules/search');
            });
        });
    });
});