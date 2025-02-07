import type { TypedPocketbase } from '$lib/types/pocketbase'
import { writeFile } from 'node:fs/promises'
import { stringify } from '@std/csv'
import Pocketbase from 'pocketbase'
import { join } from 'node:path'

const pb_admin: TypedPocketbase = new Pocketbase()

// await pb_admin.admins.authWithPassword()

const submissions = await pb_admin.admins.client.collection('submissions').getFullList()

const csv = stringify(submissions, {
	columns: ['id', 'title', 'description', 'category', 'github', 'demo'],
})

await writeFile(join(import.meta.dirname, './submissions.csv'), csv, 'utf-8')
