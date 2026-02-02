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
			name: 'Mail Boxes',
			action: 'List all mailboxes',
			description: 'List all mailboxes',
			value: 'mailboxes',
		},
		{
			name: 'Mail Credentials',
			action: 'Get credentials',
			description: 'Mark read or unread',
			value: 'credentials',
		},
		{
			name: 'Mail Posts',
			action: 'List all mail',
			description: 'List all mailboxes',
			value: 'posts',
		},
		{
			name: 'Mail Posts Update',
			action: 'Posts update',
			description: 'Posts Update',
			value: 'postsUpdate',
		},
		{
			name: 'Mail Seen',
			action: 'Mark read or unread',
			description: 'Mark read or unread',
			value: 'seen',
		},
		{
			name: 'Get Full Post',
			action: 'Get one full post',
			value: 'get',
		},
	],
	default: 'mailboxes',
};
