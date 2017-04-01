import React, { Component } from 'react';

import PageContainer from '../PageContainer';
import AddTitleModal from '../AddTitleModal';

export default class AddTitleInput extends Component {

	render() {
		return (
			<PageContainer>
				<AddTitleModal />
			</PageContainer>
		);
	}
}
