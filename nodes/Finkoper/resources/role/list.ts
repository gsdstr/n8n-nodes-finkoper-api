import type { INodeProperties } from 'n8n-workflow';
import { bookkeeperTeamIdProperty } from '../../shared';

const showOnlyForRoleList = {
	operation: ['list'],
	resource: ['role'],
};

// list operation uses bookkeeperTeamId from global param
export const roleListDescription: INodeProperties[] = [
	{
		...bookkeeperTeamIdProperty,
		displayOptions: { show: showOnlyForRoleList },
	},
];

