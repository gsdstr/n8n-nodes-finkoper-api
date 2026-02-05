import type { INodeProperties } from 'n8n-workflow';

export const taskCreateDescription: INodeProperties[] = [
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Task description/text',
	},
	{
		displayName: 'Assignees',
		name: 'assignees',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		default: [],
		description: 'Array of user IDs to assign to the task',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Low', value: 'low' },
					{ name: 'Medium', value: 'mid' },
					{ name: 'High', value: 'high' },
				],
				default: 'mid',
				description: 'Task priority level',
			},
			{
				displayName: 'Start Date',
				name: 'dateBegin',
				type: 'dateTime',
				default: '',
				description: 'Task start date (YYYY-MM-DD)',
			},
			{
				displayName: 'End Date',
				name: 'dateEnd',
				type: 'dateTime',
				default: '',
				description: 'Task end date (YYYY-MM-DD)',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: 'open',
				description: 'Task status',
			},
		],
	},
];
