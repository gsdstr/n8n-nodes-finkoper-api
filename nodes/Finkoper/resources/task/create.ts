import type { INodeProperties } from 'n8n-workflow';
import { bookkeeperTeamIdProperty } from '../../shared';

const showOnlyForTaskCreate = {
	operation: ['create'],
	resource: ['task'],
};

export const taskCreateDescription: INodeProperties[] = [
	{
		...bookkeeperTeamIdProperty,
		displayOptions: { show: showOnlyForTaskCreate },
	},
	{
		displayName: 'Text',

		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: showOnlyForTaskCreate,
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
			show: showOnlyForTaskCreate,
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
			show: showOnlyForTaskCreate,
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
