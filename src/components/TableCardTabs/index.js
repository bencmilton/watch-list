import classNames from 'classnames';
import React from 'react';
import './style.css';

export default function TableCardTabs({ currentTab, setCurrentTab }) {
	return (
		<div className="table-card--tabs">
			<span onClick={setCurrentTab.bind(null, 'grid')} className={classNames('table-card--tab', {
				'table-card--current-tab': currentTab === 'grid'
			})}>
				Grid
			</span>
			<span onClick={setCurrentTab.bind(null, 'list')} className={classNames('table-card--tab', {
				'table-card--current-tab': currentTab === 'list'
			})}>
				List
			</span>
			<span onClick={setCurrentTab.bind(null, 'favorites')} className={classNames('table-card--tab', {
				'table-card--current-tab': currentTab === 'favorites'
			})}>
				Favorites
			</span>
		</div>
	);
}
