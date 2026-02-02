import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const customerFields: INodeProperties[] = [
	{
		displayName: 'BookkeeperTeamID',
		name: 'bookkeeperTeamID',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
			},
		},
	}
];
