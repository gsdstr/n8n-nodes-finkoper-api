import type { INodeProperties } from 'n8n-workflow';
import { postIdProperty } from '../../shared';

const showOnlyForGetMail = {
	operation: ['getMail'],
	resource: ['mail'],
};

export const mailGetMailDescription: INodeProperties[] = [
	{
		...postIdProperty,
		displayOptions: {
			show: showOnlyForGetMail,
		},
		description: 'The ID of the email post to retrieve',
	},
];
