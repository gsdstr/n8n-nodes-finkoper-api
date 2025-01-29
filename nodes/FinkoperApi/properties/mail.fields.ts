import { INodeProperties, NodePropertyTypes } from 'n8n-workflow';

export const mailFields: INodeProperties[] = [
	{
		displayName: 'Mail accountId',
		name: 'accountId',
		type: 'number' as NodePropertyTypes,
		default: 0,
		required: true,
		description: 'Mail account ID',
		displayOptions: {
			show: {
				resource: ['mail'],
			},
		},
	},

	{
		displayName: 'Mail mailboxId',
		name: 'mailboxId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		description: 'List all mail from box',
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['posts'],
			},
		},
	},

];
