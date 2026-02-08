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
				displayName: 'Mail Post ID',
				name: 'mailPostId',
				type: 'string',
				default: '',
				description: 'Mail post ID',
			},
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
			{
				displayName: 'Bulk for Teams',
				name: 'bulkForTeams',
				type: 'boolean',
				default: false,
				description: 'Whether to create separate tasks for each specified team',
			},
			{
				displayName: 'Teams',
				name: 'teams',
				type: 'string',
				default: '',
				description: 'Comma-separated list of team IDs to create tasks for (works with Bulk for Teams)',
			},
			{
				displayName: 'Checklists (JSON)',
				name: 'checklistsJson',
				type: 'json',
				default: '[]',
				description: 'Checklists in JSON format',
			},
		],
	},
];
