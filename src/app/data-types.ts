export interface login {
  email: string;
  password: string;
}

export interface signup {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmpassword: string;
}

export interface userSkills {
  id?: string;
  name: string;
  userId: string;
}

export interface missionCard {
  missionId: number;
  missionName: string;
  missionTitle: string;
  missionDescription: string;
  availableSeats: number;
  startDate: string;
  deadline: string;
  missionPic?: null;
  missionPicUrl: string;
}
