
import Joi from "joi"


const UserSchema = Joi.object({
    name:Joi.string().min(2).trim().required().messages({
        "string.base":"Name must be in string formate",
        "string.empty":"name is required",
        "string.min":"name must be atleast 2 character long",
    }),
    email:Joi.string().email().required().messages({
        "string.empty":"email is required",
        "string.base":"email must be in string formate"
    }),
    password:Joi.string().min(6).max(30).messages({
        "string.base":"password must be string",
        "string.min":"password must be in 6 character long",
        "string.max":"password must be 30 in maximum"
    }),
    address:Joi.string().trim().min(7).max(30).messages({
        "string.base":"address must be string",
        "string.min":"address must be minimum in 7 latter ",
        "string.max":"address must be maximum in 30 latter"
    }),
    PhoneNumber:Joi.string().trim().required().pattern(/^[6-9]\d{9}$/).messages({
        "string.base":"phone number must be string",
        "string.pattern.base":"please enter a indian 10 digit number",
        "any.required":"phone number is required"
    }),
    role:Joi.string().valid("customer","admin","provider").default("customer").messages({
        "string.empty":"role is required for from any these customer.provider,admin,customer"
    })
})

export default UserSchema;