export interface ReviewReply {
  user: {
    // Define properties of the user object here
    name: string;
    email: string;
    password: string;
    role: string;
    avatar?: Avatar;
    isVerified: boolean;
    purchased: number;
    courses: CourseId[];
    createdAt?: Date;
    updatedAt?: Date;
  };
  reply?: string;
}

export interface Review {
  user: {
    // Define properties of the user object here
    name: string;
    email: string;
    password: string;
    role: string;
    avatar?: Avatar;
    isVerified: boolean;
    purchased: number;
    courses: CourseId[];
    createdAt?: Date;
    updatedAt?: Date;
  };
  reviewRating?: number;
  review?: string;
  reviewReply?: ReviewReply[];
}

export interface Link {
  title?: string;
  url?: string;
}

export interface Comment {
  user: {
    // Define properties of the user object here
    name: string;
    email: string;
    password: string;
    role: string;
    avatar?: Avatar;
    isVerified: boolean;
    purchased: number;
    courses: CourseId[];
    createdAt?: Date;
    updatedAt?: Date;
  };
  question: string;
  questionReply?: any[]; // Define the structure of questionReply if needed
}

export interface CourseData {
  videoUrl: string;
  title: string;
  description: string;
  videoThumbnail: Avatar;
  videoSection: string;
  videolength: number;
  videoplayer: string;
  links: Link[];
  suggestion: string;
  question?: Comment[];
  _id?: string;
}

export interface Course {
  name: string;
  description: string;
  price?: number;
  estimatedprice?: number;
  thumbnail?: {
    public_id?: string;
    url?: string;
  };
  tags?: string;
  level?: string;
  demoUrl: string;
  benefits?: { title: string }[];
  prerequisites?: { title: string }[];
  reviews?: Review[];
  courseData: CourseData[];
  ratings?: number;
  purchased?: number;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: 0;
  _id?: string;
}

// Interface for avatar object in the user schema
export interface Avatar {
  public_id: string;
  url: string;
}

// Interface for course object in the user schema
export interface CourseId {
  courseId: string;
}

// Interface for user document in MongoDB
export interface UserDocument {
  name: string;
  email: string;
  password: string;
  role: string;
  avatar?: Avatar;
  isVerified: boolean;
  purchased: number;
  courses: CourseId[];
  createdAt?: Date;
  updatedAt?: Date;
}
