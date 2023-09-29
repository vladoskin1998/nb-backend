export enum ERROR_MESSAGE {
  ERROR_ACCESS_DIR = 'ERROR ACCESS DIR',
  ERROR_FILE_EXTENSION = 'BAD FILE EXTENSION, ONLY ALLOWED .jpg.png.jpeg.mp4, 30MB',
}

export enum HTTP_MESSAGE {
  FILE_DELETE = 'ALL FILES WAS DELETED SUCCESSFULY',
  EXISTING_USER = 'USER ALREDY EXITING',
}

export enum ROLES {
  ALLUSERS = 'all users',
  ADMIN = "admin",
  COORDINATORS = 'coordinators',
  USER = "user",
  BLOCKED = "blocked",
}

export enum METHOD_REGISTRATION {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  JWT = 'jwt',
}

export enum PRIVACY {
  EVERYONE = "Everyone",
  ONLYME = "Only me",
  NEIBS = "Neibs",
}

export enum ORIENTATION {
  HETERO = "Hetero",
  GAY = "Gay",
  LESBIAN = "Lesbian",
  QUEER = "Queer",
  ASEXUAL = "Asexual",
  PANSEXUAL = "Pansexual",
  DEMISEXUAL = "Demisexual",
  BISEXUAL = "Bisexual",
  DIDNOTDECIDE = "Did not decide",
  OTHER = "Other"
}

export enum SEX {
  MALE = "Male",
  FEMALE = "Female"
}

export enum EDUCATION {
  HIGHSCHOOL = "High School",
  TECHCPLLEGE = "Tech. College",
  PHDOTD = "Ph.D",
  STUDYCOLLEGE = "Study in college",
  PHD = "PhD",
  BACHERLOR = "Bachelor",
  MASTERDEGREE = "Master’s degree"
}

export enum FAMILYSTATUS {
  SINGLE = "Single",
  INRELATIONSHIP = "In a relationship",
  ENGAGED = "Engaged",
  MARRIED = "Married",
  CIVILMARIEGE = "In a civil marriage",
  COMPLICATED = "It’s Complicated",
  SEPARATETHREADING = "Separate threading"
}

export enum QUALITYENUM {
  INTERESTS = "Interests",
  SKILLS = "Skills",
  PROFESSION = "Profession",
  NATIONALITY = "Nationality"
} 