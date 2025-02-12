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
	//posts
	{
		displayName: 'Mail mailboxId',
		name: 'mailboxId',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['posts'],
			},
		},
	},
	{
		displayName: 'Start Mail ID',
		name: 'afterId',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['posts'],
			},
		},
	},
	{
		displayName: 'Only Unread',
		name: 'unread',
		type: 'boolean' as NodePropertyTypes,
		default: false,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['posts'],
			},
		},
	},
	//seen
	{
		displayName: 'BookkeeperTeamID',
		name: 'bookkeeperTeamID',
		type: 'string' as NodePropertyTypes,
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['seen', 'credentials','postsUpdate'],
			},
		},
	},
	{
		displayName: 'Seen',
		name: 'seen',
		type: 'boolean' as NodePropertyTypes,
		default: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['seen'],
			},
		},
	},
	// {
	// 	displayName: 'Items',
	// 	name: 'items',
	// 	type: 'fixedCollection',
	// 	default: {},
	// 	required: true,
	// 	typeOptions: {
	// 		multipleValues: true,
	// 	},
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['mail'],
	// 			operation: ['seen'],
	// 		},
	// 	},
	// 	options: [
	// 		{
	// 			name: 'metadataValues',
	// 			displayName: 'Metadata',
	// 			values: [
	// 				{
	// 					displayName: 'From',
	// 					name: 'from',
	// 					type: 'string',
	// 					default: '',
	// 					required: true,
	// 				},
	// 				{
	// 					displayName: 'Posts',
	// 					name: 'posts',
	// 					type: 'string',
	// 					default: '',
	// 					required: true,
	// 					typeOptions: {
	// 						multipleValues: true,
	// 					},
	// 					description: 'Posts IDs',
	// 				},
	// 			],
	// 		},
	// 	],
	// },
	{
		displayName: 'Items',
		name: 'items',
		type: 'json',
		default: {},
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['seen'],
			},
		},
	},
	{
		displayName: 'Posts',
		name: 'posts',
		type: 'string',
		default: [],
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['postsUpdate'],
			},
		},
	},
	{
		displayName: 'Customers',
		name: 'customers',
		type: 'json',
		default: [],
		required: true,
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['postsUpdate'],
			},
		},
	},
	{
		displayName: 'Mail Post ID',
		name: 'mailPostID',
		type: 'string' as NodePropertyTypes,
		default: '',
		displayOptions: {
			show: {
				resource: ['mail'],
				operation: ['get'],
			},
		},
	},
];
