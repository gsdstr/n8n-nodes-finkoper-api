import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDelete = {
	operation: ['delete'],
	resource: ['task'],
};

export const taskDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: showOnlyForDelete,
		},
		description: 'The ID of the task to delete',
	},
];
