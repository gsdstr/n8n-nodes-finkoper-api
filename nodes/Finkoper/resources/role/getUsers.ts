import type { INodeProperties } from 'n8n-workflow';
import { bookkeeperTeamIdProperty } from '../../shared';

const showOnlyForRoleGetUsers = {
	operation: ['getUsers'],
	resource: ['role'],
};

// getUsers operation uses bookkeeperTeamId from global param
export const roleGetUsersDescription: INodeProperties[] = [
	{
		...bookkeeperTeamIdProperty,
		displayOptions: { show: showOnlyForRoleGetUsers },
	},
];

