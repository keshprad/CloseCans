import os
from basemodels import Location
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
    database="close_cans"
)
mycursor = db.cursor()


def sql_setup():
    create_bins_table = '''
        CREATE TABLE IF NOT EXISTS `bins` (
            `longitude` FLOAT NOT NULL,
            `latitude` FLOAT NOT NULL,
            `recycle` BIT NOT NULL,
            `trash` BIT NOT NULL,
            `compost` BIT NOT NULL,
            `img` LONGBLOB,
            PRIMARY KEY (longitude, latitude)
        ) DEFAULT CHARSET = utf8;
    '''
    mycursor.execute(create_bins_table)
    print("Tables are ready!")
sql_setup()


@app.post("/bins")
def find_bin(usr_loc: Location):
    usr_loc = usr_loc.dict()

    possible_locs = mycursor.execute("SELECT * FROM bins")

    # for(possible :possible_locs)
    #     command = "SELECT geography::Point(user['latitude'], user['latitude'], 4326).STDistance(geography::Point(LATITUDE_2, LONGITUDE_2, 4326)")
    #     if(mycursor.execute(command)){
    #         #addtolist
    #     }


# Not sure how to handle picture. Will figure out later
@app.post("/add-bin")
def add_bin(usr_loc: Location, bin_types: list, picture: str):
    return