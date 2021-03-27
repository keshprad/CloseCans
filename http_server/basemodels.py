from pydantic import BaseModel


class Location(BaseModel):
    longitude: float
    latitude: float


class BinTypes(BaseModel):
    trash: bool = False
    recycling: bool = False
    compost: bool = False


class BinEntry(BaseModel):
    usr_loc: Location
    bin_types: BinTypes
