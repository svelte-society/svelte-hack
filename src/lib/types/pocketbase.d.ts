import type { RecordService, BaseModel } from 'pocketbase'
import type { Submission } from '$lib/server/submissions'
import type Pocketbase from 'pocketbase'

export interface TypedPocketbase extends Pocketbase {
	collection(idOrName: string): RecordService
	collection(idOrName: 'users'): RecordService<UsersTable>
	collection(idOrName: 'submissions'): RecordService<SubmissionsTable>
}

export interface UsersTable extends BaseModel {
	email: string
	name: string
	verified: boolean
	listmonkId: number
	newsletter: boolean
	customerId: string
}

export interface SubmissionsTable extends BaseModel {
	account: UsersTable['id']
	title: string
	description: string
	github: string
	demo: string
	authorOne: string | undefined
	authorTwo?: string | undefined
	authorThree?: string | undefined
}
