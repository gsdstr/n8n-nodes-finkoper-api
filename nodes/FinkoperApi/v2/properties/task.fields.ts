import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const taskFields: INodeProperties[] = [
	{
		displayName: 'Bookkeeper Team ID',
		name: 'bookkeeperTeamID',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Mail Post ID',
		name: 'mailPostID',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Team ID',
		name: 'teamID',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Text',
		name: 'text',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Assignees',
		name: 'assignees',
		type: 'json' as NodePropertyTypes,
		default: [],
		required: true,
		displayOptions: {
			show: {
				resource: ['task'],
				operation: ['create'],
			},
		},
	}
];
