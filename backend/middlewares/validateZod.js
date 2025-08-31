import { object, success } from "zod";

export const validateZod = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if(!result.success){
        const formated = result.error.format();
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: Object.keys(formated).map(field => ({
                field,
                message: formated[field]?._errors?.[0] || 'Invalid value'
            }))
        })
    }
    next();
}