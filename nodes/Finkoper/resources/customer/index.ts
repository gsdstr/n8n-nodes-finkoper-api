import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCustomer = {
	resource: ['customer'],
};

export const customerDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCustomer,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List customers',
				description: 'Get a list of customers',
			},
			{
				name: 'Get Details',
				value: 'getDetails',
				action: 'Get customer details',
				description: 'Get detailed information about a customer',
			},
		],
		default: 'list',
	},
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getDetails'],
			},
		},
		default: '',
		description: 'The ID of the customer',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Search',
				name: 'search',
				type: 'string',
				default: '',
				description: 'Search query to filter customers',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				description: 'Max number of results to return',
			},
		],
	},
];
