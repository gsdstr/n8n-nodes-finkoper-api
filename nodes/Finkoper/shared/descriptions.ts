import type { INodeProperties } from 'n8n-workflow';

/**
 * Common property for Account ID (used in mail operations)
 */
export const accountIdProperty: INodeProperties = {
	displayName: 'Account ID',
	name: 'accountId',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the mail account',
};

/**
 * Common property for Mailbox ID
 */
export const mailboxIdProperty: INodeProperties = {
	displayName: 'Mailbox ID',
	name: 'mailboxId',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the mailbox',
};

/**
 * Common property for Customer ID
 */
export const customerIdProperty: INodeProperties = {
	displayName: 'Customer ID',
	name: 'customerId',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the customer',
};

/**
 * Common property for Bookkeeper Team ID
 */
export const bookkeeperTeamIdProperty: INodeProperties = {
	displayName: 'Bookkeeper Team ID',
	name: 'bookkeeperTeamId',
	type: 'string',
	default: '',
	description: 'The ID of the bookkeeper team. If not provided, it will be automatically fetched.',
};

/**
 * Common property for Mail Post ID
 */
export const postIdProperty: INodeProperties = {
	displayName: 'Post ID',
	name: 'postId',
	type: 'string',
	required: true,
	default: '',
	description: 'The ID of the email post',
};
