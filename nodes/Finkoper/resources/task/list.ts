import type { INodeProperties } from 'n8n-workflow';
import { bookkeeperTeamIdProperty } from '../../shared';

const showOnlyForTaskList = {
	operation: ['list'],
	resource: ['task'],
};

export const taskListDescription: INodeProperties[] = [
	{
		...bookkeeperTeamIdProperty,
		displayOptions: { show: showOnlyForTaskList },
	},
	{
		displayName: 'Filters',

		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: showOnlyForTaskList,
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Open', value: 'open' },
					{ name: 'Closed', value: 'closed' },
				],
				default: 'open',
				description: 'Filter by task status',
			},
			{
				displayName: 'List Mode',
				name: 'listMode',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Assigned to Me', value: 'assigned_to_me' },
					{ name: 'Assigned by Me', value: 'assigned_by_me' },
					{ name: 'Reviewed by Me', value: 'reviewed_by_me' },
				],
				default: 'all',
				description: 'Filter tasks by assignment',
			},
			{
				displayName: 'Task Type',
				name: 'taskType',
				type: 'options',
				options: [
					{ name: 'All', value: 'all' },
					{ name: 'Tax', value: 'tax' },
					{ name: 'User Tasks', value: 'user_tasks' },
					{ name: 'Customer Tasks', value: 'customer_tasks' },
					{ name: 'User Local Tasks', value: 'user_local_tasks' },
				],
				default: 'all',
				description: 'Filter by task type',
			},
			{
				displayName: 'Date From',
				name: 'dateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter tasks from this date',
			},
			{
				displayName: 'Date To',
				name: 'dateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter tasks until this date',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
			},
			{
				displayName: 'Per Page',
				name: 'perPage',
				type: 'number',
				default: 30,
				description: 'Number of results per page',
			},
		],
	},
];
