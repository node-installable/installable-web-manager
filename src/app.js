/** @jsx React.DOM */
'use strict';
var React = require('react');

require('./app.css');

var InstalledModules = require('./installed_modules');
var SearchModules = require('./search_modules');

var App = React.createClass({
    render: function () {
        return (
            <div className='plugin-manager'>
                <header className='plugin-manager__header'>
                    <h3 className='plugin-manager__header-title'>
                        Installable Plugin Manager
                    </h3>
                </header>
                <InstalledModules modules={this.props.installedModules} />
                <SearchModules
                    searchResults={this.props.searchResults}
                    installedModules={this.props.installedModules} />
            </div>
        );
    }
});

module.exports = App;
