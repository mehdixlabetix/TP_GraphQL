export interface CV {
	id: number;
	name: string;
	age: string;
	job: string;
	skills: number[];
	userId: number;
}

export interface Skill {
	id: number;
	designation: string;
	cvs: CV[];
}

export interface User {
	id: number;
	name: string;
	email: string;
	role: Role;
	cvs: CV[];
}

export enum Role {
	ADMIN = 'ADMIN',
	USER = 'USER',
}
