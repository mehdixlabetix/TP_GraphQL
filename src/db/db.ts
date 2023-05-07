interface CV  {
  id: number;
  name: string;
  age: string;
  job: string;
  skills: number[];
  userID: number ;
}

interface Skill  {
  id:number;
  designation: string;
  cvs: CV[];
}

interface User  {
  id:number;
  name: string;
  email: string;
  role: Role;
  cvs: CV[];
}

enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
  }

  const users:User[]= [
    {
        id: 1,
        name: "walid",
        email: "walid@gmail.com",
        role: Role.USER,
        cvs: [],
      },
      {
        id: 2,
        name: "mehdi",
        email: "mehdi@insat.ucar.tn",
        role: Role.ADMIN,
        cvs: [],
      },
]


const skills:Skill[] = [
  { id: 1, designation: "data analysis", cvs: [] },
  { id: 2, designation: "time management", cvs: [] },
  { id: 3, designation: "AI ", cvs: [] },
  { id: 4, designation: "machine learning", cvs: [] },
]



const cvs:CV[]= [
        {
            id: 1,
            name: "walid sboui",
            age: "30",
            job: "Front End Developper",
            skills: [1,2],
            userID:1,
          },
          {
            id: 2,
            name: "mehdi cherif",
            age: "25",
            job: "Data Scientist",
            skills: [3,4],
            userID:2,
          },
    ]






skills[0].cvs.push(cvs[0]);
skills[1].cvs.push(cvs[1]);
users[0].cvs.push(cvs[0]);
users[1].cvs.push(cvs[1]);



export const db = {
  skills,
  users,
  cvs,
};