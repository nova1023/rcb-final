import React, { Component } from 'react';
import PortraitView from './panelsChildren/PortraitView';

const TableViewWrapper = {
	height: '90%',
	width: '165%',
	backgroundImage: 'url(/images/avatars/bar-bg.jpg)',
	backgroundSize: 'cover',
	overflow: 'hidden',

};

const PortraitViewWrapper = {
	height: '100%',

};

class TableView4 extends Component {

	render() {
		return (
			<div className='row' style={TableViewWrapper}>
				<div className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
					<PortraitView />
				</div>
				<div className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
					<PortraitView />
				</div>
				<div className="col-xs-4 PortraitView" style={PortraitViewWrapper}>
					<PortraitView />
				</div>
			</div>
		)
	}
}

export default TableView4;