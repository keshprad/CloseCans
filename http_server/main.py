from fastapi import FastAPI, File, Form, UploadFile, Depends
from basemodels import Location, BinEntry
import mysql.connector
import os
import json
import calendar

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
            latitude DECIMAL(15,11) NOT NULL,
            longitude DECIMAL(25,11) NOT NULL,
            bin_type VARCHAR(255) NOT NULL,
            date DATETIME NOT NULL DEFAULT NOW(),
            id INTEGER NOT NULL AUTO_INCREMENT,
            PRIMARY KEY (id)
        ) DEFAULT CHARSET = utf8;
    '''
    mycursor.execute(create_bins_table)
    print("Tables are ready!")
sql_setup()


@app.post("/bins")
def find_bin(usr_loc: Location):
    radius = 1  # radius in miles

    # SQL query for closest bin markers within radius
    # Use 3959 for miles or 6371 for kilometers
    sql_select_bins = '''
      SELECT
        latitude, longitude, bin_type, DATE(date), (
          3959 * acos (
            cos ( radians(%s) )
            * cos( radians( latitude ) )
            * cos( radians( longitude ) - radians(%s) )
            + sin ( radians(%s) )
            * sin( radians( latitude ) )
          )
      ) AS distance
      FROM bins
      HAVING distance < %s
      ORDER BY distance
    '''
    sql_vals = (usr_loc.latitude, usr_loc.longitude, usr_loc.latitude, radius)
    mycursor.execute(sql_select_bins, params=sql_vals)
    close_bins = mycursor.fetchall()

    response = {}

    for (latitude, longitude, bin_type, date, dist) in close_bins:
        key = hash((latitude, longitude))
        if key not in response:
            response[key] = {
                "latitude": latitude,
                "longitude": longitude,
                "bin_type": [bin_type],
                "upload_time": f"{calendar.month_name[date.month]} {date.day}, {date.year}"
            }
        else:
            response[key]['bin_type'].append(bin_type)

    return list(response.values())


@app.post("/add-bin")
def add_bin(bin_entry: BinEntry):
    usr_loc, bin_types = bin_entry.usr_loc, bin_entry.bin_types.dict()

    # Insert new bin to bins table
    sql_insert_bin = "INSERT INTO bins (latitude, longitude, bin_type) VALUES (%s, %s, %s)"
    for bin_type in bin_types.keys():
        if bin_types[bin_type]:
            sql_vals = (usr_loc.latitude, usr_loc.longitude, bin_type)
            mycursor.execute(sql_insert_bin, params=sql_vals)
    db.commit()
    return 200
