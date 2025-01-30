import { INodeProperties } from 'n8n-workflow';

export const mailOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['mail'],
		},
	},
	options: [
		{
			name: 'Mailboxes',
			action: 'List all mailboxes',
			description: 'List all mailboxes',
			value: 'mailboxes',
		},
		{
			name: 'Posts',
			action: 'List all mail',
			description: 'List all mailboxes',
			value: 'posts',
		},
		{
			name: 'Seen',
			action: 'Mark read or unread',
			description: 'Mark read or unread',
			value: 'seen',
		},
	],
	default: 'mailboxes',
};
