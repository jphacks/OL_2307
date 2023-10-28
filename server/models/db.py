
from sqlalchemy import create_engine

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
"""
engine = create_engine(
    f"mysql://user:password@db:3306/jphacks?charset=utf8"
)
Base = declarative_base()
session = scoped_session(sessionmaker(bind=engine))

def get_db():
    db = session()
    try:
        yield db
    finally:
        db.close()

"""
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base

ASYNC_DB_URL = "mysql+aiomysql://user:password@db:3306/jphacks?charset=utf8"

async_engine = create_async_engine(ASYNC_DB_URL, echo=True)
async_session = sessionmaker(
    autocommit=False, autoflush=False, bind=async_engine, class_=AsyncSession
)

Base = declarative_base()


async def get_db():
    async with async_session() as session:
        yield session