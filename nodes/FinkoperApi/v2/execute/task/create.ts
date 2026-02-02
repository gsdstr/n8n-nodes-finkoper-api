import {
	IExecuteFunctions,
	IHttpRequestMethods,
	IDataObject,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { finkoperApiRequest } from '../finkoperRequest';

type BodyParams = {
	"mail_post_id": string | null, //"on7obwdi9prhfga6sn3b3r8rah"
	"bookkeeper_team_id": string, //"ko8oe5nsxpnhufa6h61ec8xddw"
	"date_begin": string, //"2025-02-11",
	"date_end": string,
	"date_calendar": string,
	"text": string,
	"priority": string, //"mid",
	"kpi": string | null, //null,
	"status": string, //"open",
	"assignees": string[], //["3ftzuga5op8tb8q35d7gcn3oho","8m5i7p5p8pfwbpckiuzdg5rpkw","cbuxa4b4dfggzy676o39wqwwfw","oyw87paxtbf3zfhsqty"],
	"team_id": string | null, //"r8ecerucq3d4pffeujnq5cn85w", customer id
	"files": string[],
	"tags": string[],
	"is_readonly": boolean, //false,
	"repeatable": boolean, //false,
	"finance": {
		"add_to_date": boolean, //true,
		"date": string, //"2025-02-11",
		"services": string[]
	},
	"type_icon_custom": string | null, //"null",
	"reviewers": string[],
	"need_reviewers_notice": boolean, //true
};

export async function tasksCreate(ef: IExecuteFunctions, itemIndex: number): Promise<IDataObject> {
	const mailPostID = ef.getNodeParameter('mailPostID', itemIndex) as string;
	const bookkeeperTeamID = ef.getNodeParameter('bookkeeperTeamID', itemIndex) as string;
	const text = ef.getNodeParameter('text', itemIndex) as string;
	const assignees = ef.getNodeParameter('assignees', itemIndex) as string[];
	const teamID = ef.getNodeParameter('teamID', itemIndex) as string;

	const date = new Date().toISOString().split('T')[0];

	const body: BodyParams = {
		mail_post_id: mailPostID ? mailPostID : null,
		bookkeeper_team_id: bookkeeperTeamID,
		date_begin: date,
		date_end: date,
		date_calendar: date,
		text: text,
		priority: 'mid',
		kpi: null,
		status: 'open',
		assignees: assignees,
		team_id: teamID,
		files: [],
		tags: [],
		is_readonly: false,
		repeatable: false,
		finance: {
			add_to_date: true,
			date: date,
			services: [],
		},
		type_icon_custom: null,
		reviewers: [],
		need_reviewers_notice: true,
	};
	ef.logger.info('tasksCreate \n' +  JSON.stringify(body));

	const options: IHttpRequestOptions = {
		method: 'POST' as IHttpRequestMethods,
		url: `/api2/tasks`,
		body,
	};

	return await finkoperApiRequest<IDataObject>(ef, options);
}
