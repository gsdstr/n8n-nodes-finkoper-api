import type { INodeProperties } from 'n8n-workflow';
import { bookkeeperTeamIdProperty } from '../../shared';

const showOnlyForGetCredentials = {
	operation: ['getCredentials'],
	resource: ['mail'],
};

// getCredentials uses the global bookkeeperTeamId or a specific one
export const mailGetCredentialsDescription: INodeProperties[] = [
	{
		...bookkeeperTeamIdProperty,
		displayOptions: { show: showOnlyForGetCredentials },
	},
];

