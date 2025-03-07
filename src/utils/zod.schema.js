import { z } from 'zod'
import { genreList } from './optionList';

const UserSchema = z.object({
  first_name: z.string().min(3, { message: "First name must be 3 characters" }),
  last_name: z.string().min(1, { message: "Last name must be required" }),
  email: z.string().email(),
  dob: z.date(),
  gender: z.enum(['m', 'f', 'o']),
  phone: z.string().refine((value) => {
    if(!value || value === '') return true;
    return value.length === 10 && !isNaN(value)
  }, { message: "Please use 10 digit phone number" }),
  address: z.string(),
  role: z.enum(['artist_manager', 'artist', 'super_admin']),
  // password: z.string().min(1, { message: "Password is required" }),
  cpassword: z.string()
})

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid Emaill" }),
  password: z.string().min(1, { message: "Password is Required" }),
  stay: z.boolean()
})

export const SignupSchema = UserSchema.merge(z.object({
  password: z.string().min(1, { message: "Password is required" }),
})).refine((dd) => {
  return dd.password === dd.cpassword
}, { path: ['cpassword'], message: "Confirm password doesn't match"})

export const EditProfile = UserSchema.merge(z.object({
  password: z.string(),
})).refine((dd) => {
  if(dd.password && dd.password !== '') return dd.password === dd.cpassword
  return true;
}, { path: ['cpassword'], message: "Confirm password doesn't match" })


// aritst
export const ArtistSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  dob: z.date(),
  // no_of_albums_released: z.number().nullable(),
  gender: z.enum(['m', 'f', 'o']),
  address: z.string()
})

// music
export const MusicSchema = z.object({
  genre: z.enum(genreList.map(i => i.value)),
  title: z.string().min(1, { message: "Title is required" }),
  album_name: z.string().min(1, { message: "Album name is required" })
})