from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session

DB_URL = "mysql+aiomysql://user:password@db:3306/jphacks?charset=utf8"
             
engine = create_engine(DB_URL)
Base = declarative_base()
session = scoped_session(sessionmaker(bind=engine))