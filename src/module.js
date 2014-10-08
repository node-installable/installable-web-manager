/** @jsx React.DOM */
'use strict';

var React = require('react');
var LaddaButton = require('react-ladda');
require('laddacss');

var Module = React.createClass({
    getInitialState: function () {
        return {
            active: false
        };
    },
    onClickUninstall: function () {
        var self = this;
        this.setState({active: true});
        this.props.module.destroy({
            wait: true,
            success: function () {
                self.props.module.set({installed: false});
                self.props.installedModules.remove(self.props.module);
            }
        });
    },
    onClickInstall: function () {
        var self = this;
        this.setState({active: true});
        this.props.module.save(
            {
                installed: true
            },
            {
                wait: true,
                success: function () {
                    self.setState({active: false});
                    self.props.installedModules.add(self.props.module);
                }
            }
        );
    },
    render: function () {
        var self = this;
        var isInstalled = this.props.module.get('installed') ||
            this.props.installedModules.find(function (m) {
                return m.get('name') === self.props.module.get('name');
            });

        var button = (
            <LaddaButton active={this.state.active}
                         size='s'
                         color={isInstalled ? 'red' : 'mint'}
                         onClick={isInstalled ? this.onClickUninstall : this.onClickInstall}
                         style='zoom-in'>
                <button>
                    <span className='ladda-label'>
                        {isInstalled ? 'Uninstall' : 'Install'}
                    </span>
                </button>
            </LaddaButton>
        );

        return (
            <div className='module'>
                <span className='module__name'>{this.props.module.get('name')}</span>
                {button}
            </div>
        );
    }
});

module.exports = Module;
