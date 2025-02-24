//Import Statement
import bcrypt from 'bcryptjs'

//Hashing User Password
export const hashPassword = async(password)=>{
       try{
            const saltRound = 10;
            const hashedPassword = bcrypt.hash(password,saltRound)
            return hashedPassword
       }
       catch(error){
        console.error(`Error While Hashing Password ${error}`)
       }
}

//Comparing User Password
export const comparePassword = async(password,hashedPassword)=>{
        return await bcrypt.compare(password,hashedPassword)
}
