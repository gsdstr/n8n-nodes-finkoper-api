import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const userFields: INodeProperties[] = [
	{
		displayName: 'Bookkeeper Team ID',
		name: 'bookkeeperTeamID',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['company'],
			},
		},
	},
];
