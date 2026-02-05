import type { INodeProperties } from 'n8n-workflow';
import { bookkeeperTeamIdProperty } from '../../shared';

const showOnlyForUserGetCompany = {
	operation: ['getCompany'],
	resource: ['user'],
};

// getCompany operation uses bookkeeperTeamId from global param
export const userGetCompanyDescription: INodeProperties[] = [
	{
		...bookkeeperTeamIdProperty,
		displayOptions: { show: showOnlyForUserGetCompany },
	},
];

