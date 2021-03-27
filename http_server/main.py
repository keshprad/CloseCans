from fastapi import FastAPI, File, Form, UploadFile, Depends
from basemodels import Location, BinEntry
import mysql.connector
import os
import json

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
        CREATE TABLE IF NOT EXISTS bins (
            location POINT NOT NULL,
            bintype VARCHAR(255) NOT NULL,
            img CHAR(38),
            id INTEGER NOT NULL AUTO_INCREMENT,
            PRIMARY KEY (id)
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
def add_bin(usr_loc: str = Form(...), bin_types: str = Form(...), bin_img: UploadFile = File(...)):
    usr_loc = json.loads(usr_loc)
    bin_types = json.loads(bin_types)

    

    # Insert new bin to bins table
    sql_insert_bin = "INSERT INTO bins (location, bintype, img) VALUES (POINT(%s, %s), %s, %s)"
    for bin_type in bin_types.keys():
        if bin_types[bin_type]:
            sql_vals = (usr_loc['longitude'], usr_loc['latitude'], bin_type, 'Test')
            mycursor.execute(sql_insert_bin, params=sql_vals)
    db.commit()
    return 200

# { "trash": true, "recycling": false, "compost": true, }
# { "latitude": 0.11, "longitude": 0.12 }