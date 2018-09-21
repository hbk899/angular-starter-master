import { User } from 'firebase';
export default class PlantifyUser {
    id: string;
    displayName: string;
    isAnonymous: boolean;
    dob: string;
    email: string;
    phone: string;
    firebaseAuthId: string;
    dpSrc: string;
   
    accountType: string; // starter,techy,futuristic
    




    


    createdAt: Date;
    updatedAt: Date;

static getUserPublic(user: PlantifyUser) {
        const userPublic = <UserPublic>{};
        userPublic.id = user.id;
        userPublic.displayName = user.displayName;
        userPublic.dpSrc = user.dpSrc;
        userPublic.dob = user.dob;

        return userPublic;
    }

}


export interface UserPublic {
    id: string;
    displayName: string;
    dpSrc: string;
    dob: string;

}