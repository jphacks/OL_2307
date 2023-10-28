from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

engine = create_engine(
    f"mysql://user:password@db:3306/jphacks?charset=utf8"
)
Base = declarative_base()
session = scoped_session(sessionmaker(bind=engine))

async def get_db():
    async with async_session() as session:
        yield session