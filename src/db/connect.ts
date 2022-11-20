import * as dotenv from 'dotenv';
dotenv.config();

const connect = () => {
  const { DB_USER, DB_PASS, DB_HOST, DB_NAME } = process.env;
  const connStr = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
  return connStr;
};

export { connect };
