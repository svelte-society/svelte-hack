import type { RecordService } from 'pocketbase'
import type Pocketbase from 'pocketbase'

export interface TypedPocketbase extends Pocketbase {
	collection(idOrName: string): RecordService
	collection(idOrName: 'users'): RecordService<UsersTable>
	collection(idOrName: 'submissions'): RecordService<SubmissionsTable>
}

interface BaseModel {
	id: string
	created: string
	updated: string
}

export interface UsersTable extends BaseModel {
	email: string
	username: string
	verified: boolean
	preferedEmail?: string
	name?: string
	pronouns?: string
}

export interface SubmissionsTable extends BaseModel {
	submitter: UsersTable['id']
	authorOne: string
	authorTwo?: string
	authorThree?: string
	title: string
	description: string
	github: string
	demo: string
}
