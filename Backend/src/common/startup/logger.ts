import * as winston from 'winston';
import { format } from 'winston';

const { combine, colorize, prettyPrint, printf } = format;

export default () => {
  const myFormat = printf(({ level, message }) => {
    return `${level} : ${message}`;
  });
  const myExcFormat = printf(({ level, message }) => {
    return `${level} : ${message}`;
  });
  winston.exceptions.handle(
    new winston.transports.Console({
      format: combine(
        colorize({
          level: true,
          message: true,
          colors: { info: 'cyan', debug: 'magenta', error: 'red' },
        }),
        prettyPrint({ colorize: true }),
        myFormat,
      ),
    }),
    new winston.transports.File({
      filename: 'uncaughtExceptions.log',
      format: combine(
        colorize({
          level: true,
          message: true,
          colors: { info: 'cyan', error: 'red' },
        }),
        prettyPrint({ colorize: true }),
        myExcFormat,
      ),
    }),
  );

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  winston.add(
    new winston.transports.File({ filename: 'logfile.log', level: 'error' }),
  );
  winston.add(
    new winston.transports.Console({
      level: 'debug',
      format: combine(
        colorize({
          level: true,
          message: true,
        }),
        prettyPrint({ colorize: true }),
        myFormat,
      ),
    }),
  );
};
