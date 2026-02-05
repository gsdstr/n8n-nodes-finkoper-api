import type { INodeProperties } from 'n8n-workflow';
import { taskListDescription } from './list.description';
import { taskCreateDescription } from './create.description';

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
		],
		default: 'list',
	},
	...taskListDescription,
	...taskCreateDescription,
];
