import * as Joi from 'joi';
import * as objectId from 'joi-objectid';
import * as JoiTimeZone from 'joi-tz';

//@ts-ignore
Joi.objectId = objectId(Joi);

const JoiTZ = Joi.extend(JoiTimeZone);

const eventTimeRegexp = new RegExp(
  /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/,
);

export const createEventSchema = Joi.object({
  pcId: Joi.string().required(),
  eventDate: Joi.date().required(),
  eventTime: Joi.string()
    .required()
    .regex(eventTimeRegexp)
    .label('eventTime')
    .messages({
      'string.min': '"eventTime" Must have at least 4 characters',
      'string.max': '"eventTime" Must have at most 80 characters',
      'string.pattern.base':
        '"eventTime" must be of the pattern "YYYY-MM-DD HH:MM:SS" timestamp.',
    }),
  personId: Joi.alternatives(
    //@ts-ignore
    Joi.objectId().required(),
    Joi.string().required().valid('Not Found'),
  ),
  presence: Joi.number().required().min(0).max(1),
  distraction: Joi.number().required().min(0).max(1),
  emotion: Joi.string().required(),
}).options({ allowUnknown: true });

/**
 * Validation Schemas for Operators Collection
 */
const nameRegexp = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
// const timeRegexp = new RegExp(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/);
const timeRegexp = new RegExp(/^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/);
export const createOperatorSchema = Joi.object({
  machineId: Joi.string().required().min(4).max(250),
  operatorName: Joi.string()
    .min(4)
    .max(80)
    .regex(nameRegexp)
    .label('operatorName')
    .messages({
      'string.min': '"operatorName" Must have at least 4 characters',
      'string.max': '"operatorName" Must have at most 80 characters',
      'string.pattern.base':
        '"operatorName" cannot contain numerics, or special characters.',
    }),
  timeSlotStart: Joi.string()
    .required()
    .regex(timeRegexp)
    .label('timeSlotStart')
    .messages({
      'string.pattern.base':
        '"timeSlotStart" must be provided in 24 hours time format matching the HH:mm time format.',
    }),
  timeSlotEnd: Joi.string()
    .required()
    .regex(timeRegexp)
    .label('timeSlotEnd')
    .messages({
      'string.pattern.base':
        '"timeSlotEnd" must be provided in 24 hours time format matching the HH:mm time format.',
    }),
  timeZone: JoiTZ.timezone().required(),
  department: Joi.string().required(),
  decoded: Joi.allow(),
  apiSecret: Joi.allow(),
});
