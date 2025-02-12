import { INodeProperties } from 'n8n-workflow';

export const taskOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['task'],
		},
	},
	options: [
		{
			name: 'New Task',
			action: 'Create a new task',
			description: 'Create a new task',
			value: 'create',
		}
	],
	default: 'create',
};
