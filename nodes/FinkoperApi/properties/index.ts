import { INodeProperties } from 'n8n-workflow';
import {mailOperations} from "./mail.operations";
import {mailFields} from "./mail.fields";

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
		],
		default: 'mail',
	},

	mailOperations,

	...mailFields,
];
