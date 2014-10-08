/** @jsx React.DOM */
'use strict';

var React = require('react');
var Module = require('./module');

var SearchModules = React.createClass({
    getInitialState: function () {
        return {
            modules: this.props.searchResults,
            searched: false,
            searching: false
        };
    },
    componentDidMount: function () {
        this.refs.box.getDOMNode().focus();

        this.props.searchResults.on('sync', function () {
            this.setState({
                searching: false,
                searched: true
            });
        }.bind(this));

        this.props.searchResults.on('add remove', function (model, collection) {
            this.setState({
                modules: collection,
                searched: true,
                searching: false
            });
        }.bind(this));
    },
    onKeyDown: function (event) {
        if (event.which !== 13) {
            return;
        }

        if (event.target.value.length) {
            this.setState({searching: true});
            this.props.searchResults.fetch({
                data: {
                    term: event.target.value
                }
            });
        } else {
            this.props.searchResults.reset();
            this.setState({searched: false});
        }
    },
    render: function () {
        var rows = this.state.modules.map(function (module) {
            return (
                <Module module={module}
                        key={module.get('name')}
                        installedModules={this.props.installedModules}/>
            );
        }.bind(this));

        var content;

        if (this.state.searching) {
            content = <p>Searching... Please wait.</p>;
        } else if (rows.length) {
            content = rows;
        } else if (this.state.searched) {
            content = <p>No plugins found.</p>;
        } else {
            content = <p>Enter a term and press enter to search.</p>;
        }

        return (
            <section className="search">
                <input type="text"
                       placeholder="Search"
                       onKeyDown={this.onKeyDown}
                       ref='box' />
                {content}
            </section>
        );
    }
});

module.exports = SearchModules;
