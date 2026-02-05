import type { INodeProperties } from 'n8n-workflow';
import { companyListDescription } from './list';

const showOnlyForCompany = {
	resource: ['company'],
};

export const companyDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCompany,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List companies',
				description: 'Get a list of all companies/teams',
			},
		],
		default: 'list',
	},
	...companyListDescription,
];
