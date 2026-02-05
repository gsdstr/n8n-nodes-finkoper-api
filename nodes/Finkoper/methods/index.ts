import { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { FinkoperClient } from 'finkoper-api';

import * as company from './company';
import * as customer from './customer';
import * as mail from './mail';
import * as role from './role';
import * as task from './task';
import * as user from './user';

/**
 * Shared type for resource operation handlers.
 * Extracting this makes it easier to type individual methods in their respective files.
 */
export type FinkoperOperation = (
	ef: IExecuteFunctions,
	itemIndex: number,
	client: FinkoperClient,
	bookkeeperTeamId: string,
) => Promise<IDataObject | IDataObject[]>;

/**
 * Registry mapping resources to their respective operation modules.
 * Since operation names in the UI match function names in the modules,
 * we can use direct module assignment for maximum simplicity.
 */
export const resourceOperationsFunctions: Record<string, Record<string, FinkoperOperation>> = {
	company,
	customer,
	mail,
	role,
	task,
	user,
};
