import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject } from 'n8n-workflow/dist/Interfaces';
import { mailboxes } from './mail/mailboxes';
import {posts} from "./mail/posts";
import {seen} from "./mail/seen";

type ResourceOperationFunctions = {
	[resource: string]: {
		[operation: string]: (
			ef: IExecuteFunctions,
			itemIndex: number,
		) => Promise<IDataObject | IDataObject[]>;
	};
};

export const resourceOperationsFunctions: ResourceOperationFunctions = {
	mail: {
		mailboxes,
		posts,
		seen
	},
};
