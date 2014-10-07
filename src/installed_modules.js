/** @jsx React.DOM */
'use strict';

var React = require('react');
var Module = require('./module');

var InstalledModules = React.createClass({
    getInitialState: function () {
        return {
            modules: this.props.modules,
            loaded: false
        };
    },
    componentDidMount: function () {
        this.props.modules.on('sync', function (collection) {
            this.setState({
                loaded: true
            });
        }.bind(this));

        this.props.modules.on('add remove', function (model, collection) {
            this.setState({
                modules: collection,
                loaded: true
            });
        }.bind(this));
    },
    render: function () {
        var rows = this.state.modules.map(function (module) {
            return (
                <Module module={module}
                        key={module.get('name')}
                        installedModules={this.state.modules} />
            );
        }.bind(this));

        var message;

        if (this.state.loaded) {
            message = <p>No plugins are installed</p>;
        } else {
            message = <p>Loading...</p>;
        }

        if (rows.length) {
            return (
                <section className="installed-modules">{rows}</section>
            );
        } else {
            return (
                <section className="installed-modules">
                    {message}
                </section>
            );
        }
    }
});

module.exports = InstalledModules;
