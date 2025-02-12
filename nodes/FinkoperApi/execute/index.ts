import { IExecuteFunctions, IDataObject } from "n8n-workflow";
import { mailboxes } from './mail/mailboxes';
import { posts } from './mail/posts';
import { seen } from './mail/seen';
import { list } from "./customer/list";
import { credentials } from "./mail/credentials";
import { postsUpdate } from "./mail/postsUpdate";
import {tasksCreate} from "./task/create";
import {roleList} from "./role/list";
import {roleUser} from "./role/users";
import {userCompany} from "./user/company";
import {mailGet} from "./mail/get";

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
		seen,
		credentials,
		postsUpdate,
		get: mailGet,
	},
	customer: {
		list
	},
	task: {
		create: tasksCreate
	},
	role: {
		list: roleList,
		user:roleUser
	},
	user: {
		company: userCompany
	}
};
