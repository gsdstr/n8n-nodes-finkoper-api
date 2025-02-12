import { INodeProperties } from 'n8n-workflow';
import {mailOperations} from "./mail.operations";
import {mailFields} from "./mail.fields";
import { customerOperations } from './customer.operations';
import { customerFields } from './customer.fields';
import {taskOperations} from "./task.operations";
import {taskFields} from "./task.fields";
import {roleOperations} from "./role.operations";
import {roleFields} from "./role.fields";
import {userFields} from "./user.fields";
import {userOperations} from "./user.operations";

/**
 * In the properties array we have two mandatory options objects required
 *
 * [Resource & Operation]
 *
 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
 *
 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
 * to keep this class easy to read.
 *
 */
export const finkoperApiNodeProperties: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Mail',
				value: 'mail',
			},
			{
				name: 'Customer',
				value: 'customer',
			},
			{
				name: 'Task',
				value: 'task',
			},
			{
				name: 'Role',
				value: 'role',
			},
			{
				name: 'User',
				value: 'user',
			},
		],
		default: 'mail',
	},

	mailOperations,
  customerOperations,
	taskOperations,
	roleOperations,
	userOperations,

	...mailFields,
	...customerFields,
	...taskFields,
	...roleFields,
	...userFields,
];
