import os
from pydantic import BaseModel
from typing import Optional
import mysql.connector
from fastapi import FastAPI

app = FastAPI()

USER = os.environ.get('SQL_USER')
PASSWORD = os.environ.get('SQL_PASS')
# Connect to db
db = mysql.connector.connect(
    host="localhost",
    user=USER,
    password=PASSWORD,
    database = "close_cans"
)
mycursor = db.cursor()
def sql_setup():

    setup = '''
        CREATE TABLE IF NOT EXISTS `close_cans` (
            `longitude` FLOAT NOT NULL,
            `latitude` FLOAT NOT NULL,
            `recycle` BIT NOT NULL,
            `trash` BIT NOT NULL,
            `compost` BIT NOT NULL,
            'img' LONGBLOB 
            PRIMARY KEY (longitude, latitude)
        ) DEFAULT CHARSET = utf8;
    '''

class Location(BaseModel):
    longitude: float
    latitude: float


@app.post("/bins")
def find_bin(user: Location):
    user_loc = user_loc.dict()

    possible_locs = mycursor.execute("SELECT * FROM close_cans")

   
    for(possible :possible_locs)
        command = "SELECT geography::Point(user['latitude'], user['latitude'], 4326).STDistance(geography::Point(LATITUDE_2, LONGITUDE_2, 4326)")
        if(mycursor.execute(command)){
            #addtolist
        }

