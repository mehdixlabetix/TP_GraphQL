import { CV, Role, Skill, User } from '../interfaces';

const users: User[] = [
	{
		id: 1,
		name: 'omar',
		email: 'omar@gmail.com',
		role: Role.USER,
		cvs: [],
	},
	{
		id: 2,
		name: 'mehdi',
		email: 'mehdi@insat.ucar.tn',
		role: Role.ADMIN,
		cvs: [],
	},
];

const skills: Skill[] = [
	{ id: 1, designation: 'data analysis', cvs: [] },
	{ id: 2, designation: 'time management', cvs: [] },
	{ id: 3, designation: 'AI ', cvs: [] },
	{ id: 4, designation: 'machine learning', cvs: [] },
];

const cvs: CV[] = [
	{
		id: 1,
		name: 'omar besbes',
		age: '30',
		job: 'Front End Developper',
		skills: [1, 2],
		userId: 1,
	},
	{
		id: 2,
		name: 'mehdi cherif',
		age: '25',
		job: 'Data Scientist',
		skills: [3, 4],
		userId: 2,
	},
];

skills[0].cvs.push(cvs[0]);
skills[1].cvs.push(cvs[1]);
users[0].cvs.push(cvs[0]);
users[1].cvs.push(cvs[1]);

export { skills, users, cvs };
