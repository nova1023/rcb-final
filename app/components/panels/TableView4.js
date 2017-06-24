import React, { Component } from 'react';
import PortraitView from './panelsChildren/PortraitView';

// const styling = {
// 	border: "1px solid black"
// };

class TableView4 extends Component {

	render() {
		return (
			<div>
				<div className="col-xs-4 PortraitView" >
					<PortraitView />
				</div>
				<div className="col-xs-4 PortraitView" >
					<PortraitView />
				</div>
				<div className="col-xs-4 PortraitView" >
					<PortraitView />
				</div>
			</div>
		)
	}
}

export default TableView4;