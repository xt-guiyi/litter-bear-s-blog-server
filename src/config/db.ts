import { ConnectionOptions } from 'mongoose'

export const url = 'mongodb://127.0.0.1:27017'

export const  mongooseOptions: ConnectionOptions ={
  useNewUrlParser:true,
  useUnifiedTopology:true,
  keepAlive:true,
  keepAliveInitialDelay: 300000,
  dbName:'litter_bear_bear',
  user: 'admin',
  pass: '200145',
  useCreateIndex:true,
}