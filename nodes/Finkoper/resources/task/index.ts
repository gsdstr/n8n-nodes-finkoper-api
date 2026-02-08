import type { INodeProperties } from 'n8n-workflow';
import { taskListDescription } from './list';
import { taskCreateDescription } from './create';
import { taskDeleteDescription } from './delete';

const showOnlyForTask = {
	resource: ['task'],
};

export const taskDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForTask,
		},
		options: [
			{
				name: 'List',
				value: 'list',
				action: 'List tasks',
				description: 'Get a list of tasks',
			},
			{
				name: 'Create',
				value: 'create',
				action: 'Create a task',
				description: 'Create a new task',
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a task',
				description: 'Delete a task permanently',
			},
		],
		default: 'list',
	},
	...taskListDescription,
	...taskCreateDescription,
	...taskDeleteDescription,
];
